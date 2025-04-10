const { errorHandler } = require("../helpers/ErrorHandler");
const Contracts = require("../models/contracts.model");
const Owners = require("../models/owners.model");
const Payments = require("../models/payments.model");
const Vassels = require("../models/vassels.model");
const JwtService = require("../services/jwt.service");
const MailService = require("../services/mail.service");
const { createOtp, verifyOtp } = require("../services/otp.service");
const { ownersValidation } = require("../validations/owners.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const addNewOwner = async (req, res) => {
  try {
    const { error, value } = ownersValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 5);
    try {
      var newOwner = await Owners.create(
        {
          ...value,
          password: hashedPassword,
        },
        { returning: true }
      );
    } catch (err) {
      const val = err.message.split('"')[1].split("_");
      val.shift();
      val.pop();
      return res.status(200).send({
        message: `${req.body[val.join("_")]} already exists`,
      });
    }
    const result = await createOtp(req.body.email);
    if (result.success) {
      await MailService.sendActivationToMail(req.body.email, result.otp);
    } else {
      throw Error(result.message);
    }
    res.status(201).send({
      message: `Activation code sent to your email, Enter that code to http://localhost:3000/api/owners/activate `,
      verificationKey: result.verificationKey,
      owner: newOwner.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getOtpCode = async (req, res) => {
  try {
    const result = await createOtp(req.body.email);
    if (result.success) {
      await MailService.sendActivationToMail(req.body.email, result.otp);
    } else {
      throw Error(result.message);
    }
    res.status(200).send({
      message: `Activation code sent to your email`,
      verificationKey: result.verificationKey,
      owner: req.body.email,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const activateOwner = async (req, res) => {
  try {
    const { verificationKey, email, activation_code } = req.body;
    const result = await verifyOtp(
      verificationKey,
      email,
      activation_code,
      "owner"
    );
    if (result.success) {
      res.status(200).send({
        message: `${email} activated`,
        id: result.ownerId,
        isNew: result.isNew,
      });
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    errorHandler(error, res);
  }
};
const changePassword = async (req, res) => {
  try {
    const {
      verificationKey,
      email,
      activation_code,
      oldPassword,
      newPassword,
      coniformPassword,
    } = req.body;
    const result = await verifyOtp(
      verificationKey,
      email,
      activation_code,
      "owner",
      true
    );
    if (result.success) {
      const ownerData = await Owners.findAll({ where: { email: email } });
      const verify = bcrypt.compareSync(
        oldPassword,
        ownerData[0].dataValues.password
      );
      console.log(newPassword, coniformPassword);
      if (!verify) {
        return res.status(400).send({
          message: `New and old passwords not matched`,
        });
      }
      if (newPassword !== coniformPassword) {
        return res.status(400).send({
          message: `New password and coniform password not matched`,
        });
      }
      const hashedNewPassword = bcrypt.hashSync(coniformPassword, 5);
      await Owners.update(
        { password: hashedNewPassword },
        { where: { email: email } }
      );
      res.status(200).send({
        message: `Password changed`,
      });
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    errorHandler(error, res);
  }
};
const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ownerData = await Owners.findAll({ where: { email: email } });
    if (ownerData.length == 0) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const validPassword = bcrypt.compareSync(
      password,
      ownerData[0].dataValues.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const payload = {
      id: ownerData[0].dataValues.id,
      email: ownerData[0].dataValues.email,
      role: "owner",
    };
    const jwtService = new JwtService(
      config.get("OWNER_ACCESS_KEY"),
      config.get("OWNER_REFRESH_KEY")
    );
    const tokens = jwtService.genereteTokens(payload);
    await Owners.update(
      { refresh_token: tokens.refreshToken },
      { where: { email: email } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("REFRESH_COOKIE_TIME"),
    });
    res.status(200).send({
      message: `Welcome ${ownerData[0].dataValues.first_name} ${ownerData[0].dataValues.last_name}!!!`,
      acceesToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const logoutOwner = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).send({ message: "Refresh token not found in cookie" });
    }
    const ownerData = await Owners.findAll({
      where: { refresh_token: refreshToken },
    });
    if (ownerData.length == 0) {
      res.status(400).send({ message: "No owner found with such token" });
    }
    await Owners.update(
      { refresh_token: "null", is_active: false },
      { where: { refresh_token: refreshToken } }
    );
    res.clearCookie("refreshToken");
    res.send({
      message: `Owner(${ownerData[0].dataValues.email}) logged out`,
      id: ownerData[0].dataValues.id,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Refresh Token not found in cookie" });
    }
    const ownerData = await Owners.findAll({
      where: { refresh_token: refreshToken },
    });
    if (ownerData.length == 0) {
      return res
        .status(400)
        .send({ message: "No owner with such token found" });
    }
    const jwtService = new JwtService(
      config.get("OWNER_ACCESS_KEY"),
      config.get("OWNER_REFRESH_KEY")
    );
    const decodedData = await jwtService.verifyRefreshToken(refreshToken);
    // console.log(decodedData, req.cookies);
    const payload = {
      id: ownerData[0].dataValues.id,
      email: ownerData[0].dataValues.email,
      role: "owner",
    };
    const tokens = jwtService.genereteTokens(payload);
    await Owners.update(
      { refresh_token: tokens.refreshToken },
      { where: { id: ownerData[0].dataValues.id } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("REFRESH_COOKIE_TIME"),
    });
    res.send({ accessToken: tokens.accessToken, message: "Token updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllOwners = async (req, res) => {
  try {
    const allOwners = await Owners.findAll({
      include: [{ model: Vassels }, { model: Payments }, { model: Contracts }],
    });
    res.status(200).send({ message: "All Owners Selected", owners: allOwners });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owners.findAll({
      where: { id: id },
      include: [{ model: Vassels }, { model: Payments }, { model: Contracts }],
    });
    if (owner.length == 0) {
      return res
        .status(404)
        .send({ message: `Owner not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Owner Selected", owner: owner[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owners.findAll({ where: { id: id } });
    if (owner.length == 0) {
      return res
        .status(404)
        .send({ message: `Owner not found with this id: ${id}` });
    }
    if (req.body.password) {
      return res.status(400).send({
        message: `to change Owner's password use http://localhost:3000/owners/change-password`,
      });
    }
    if (req.body.is_active) {
      return res.status(400).send({
        message: `to change Owner's activate use http://loclahost:3000/clients/activate`,
      });
    }
    const ownerData = owner[0].dataValues;
    const { error, value } = ownersValidation({
      ...ownerData,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    try {
      var updateOwner = await Owners.update(
        { ...value },
        { where: { id: id }, returning: true }
      );
    } catch (err) {
      const val = err.message.split('"')[1].split("_");
      val.shift();
      val.pop();
      return res.status(200).send({
        message: `${req.body[val.join("_")]} already exists`,
      });
    }
    res
      .status(200)
      .send({ message: "Owner updated", updatedOwner: updateOwner[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owners.destroy({ where: { id: id } });
    if (owner == []) {
      return res
        .status(404)
        .send({ message: `Owner not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Owner Deleted", effected: owner });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  activateOwner,
  changePassword,
  getOtpCode,
  loginOwner,
  logoutOwner,
  updateRefreshToken,
};
