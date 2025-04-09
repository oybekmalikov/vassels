const { errorHandler } = require("../helpers/ErrorHandler");
const Admins = require("../models/admins.model");
const JwtService = require("../services/jwt.service");
const { adminsValidation } = require("../validations/admins.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const addNewAdmin = async (req, res) => {
  try {
    const check = await Admins.findAll({ where: { email: req.body.email } });
    if (check.length) {
      return res.status(400).send({
        message: `${req.body.email} already exists`,
      });
    }
    const { error, value } = adminsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 5);
    const newAdmin = await Admins.create(
      {
        ...value,
        password: hashedPassword,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Admin Added`,
      admin: newAdmin.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await Admins.findAll({ where: { email: email } });
    if (adminData.length == 0) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const validPassword = bcrypt.compareSync(
      password,
      adminData[0].dataValues.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const payload = {
      id: adminData[0].dataValues.id,
      email: adminData[0].dataValues.email,
      is_creator: adminData[0].dataValues.is_creator,
    };
    const jwtService = new JwtService(
      config.get("ADMIN_ACCESS_KEY"),
      config.get("ADMIN_REFRESH_KEY")
    );
    const tokens = jwtService.genereteTokens(payload);
    await Admins.update(
      { refresh_token: tokens.refreshToken },
      { where: { email: email } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("REFRESH_COOKIE_TIME"),
    });
    res.status(200).send({
      message: `Welcome ${adminData[0].dataValues.full_name}!!!`,
      acceesToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).send({ message: "Refresh token not found in cookie" });
    }
    const adminData = await Admins.findAll({
      where: { refresh_token: refreshToken },
    });
    if (adminData.length == 0) {
      res.status(400).send({ message: "No admin found with such token" });
    }
    await Admins.update(
      { refresh_token: "null", is_active: false },
      { where: { refresh_token: refreshToken } }
    );
    res.clearCookie("refreshToken");
    res.send({
      message: `Admin(${adminData[0].dataValues.email}) logged out`,
      id: adminData[0].dataValues.id,
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
    const adminData = await Admins.findAll({
      where: { refresh_token: refreshToken },
    });
    if (adminData.length == 0) {
      return res
        .status(400)
        .send({ message: "No admin with such token found" });
    }
    const jwtService = new JwtService(
      config.get("ADMIN_ACCESS_KEY"),
      config.get("ADMIN_REFRESH_KEY")
    );
    const decodedData = await jwtService.verifyRefreshToken(refreshToken);
    // console.log(decodedData, req.cookies);
    const payload = {
      id: adminData[0].dataValues.id,
      email: adminData[0].dataValues.email,
      is_creator: adminData[0].dataValues.is_creator,
    };
    const tokens = jwtService.genereteTokens(payload);
    await Admins.update(
      { refresh_token: tokens.refreshToken },
      { where: { id: adminData[0].dataValues.id } }
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
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admins.findAll();
    res.status(200).send({ message: "All Admins Selected", admins: allAdmins });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findAll({ where: { id: id } });
    if (admin.length == 0) {
      return res
        .status(404)
        .send({ message: `Admin not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Admin Selected", admin: admin[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findAll({ where: { id: id } });
    if (admin == []) {
      return res
        .status(404)
        .send({ message: `Admin not found with this id: ${id}` });
    }
    if (req.body.password) {
      return res.status(400).send({
        message: `to change Admins password use http://localahost:3000/admins/change-password`,
      });
    }
    const { error, value } = adminsValidation({
      ...admin[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const check = await Admins.findAll({ where: { email: req.body.email } });
    if (check.length) {
      return res.status(400).send({
        message: `${req.body.email} already exists`,
      });
    }
    const updateAdmin = await Admins.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res
      .status(200)
      .send({ message: "Admin updated", updatedAdmins: updateAdmin[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.destroy({ where: { id: id } });
    if (admin == []) {
      return res
        .status(404)
        .send({ message: `Admin not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Admin Deleted", effected: admin });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
  logoutAdmin,
  updateRefreshToken,
};
