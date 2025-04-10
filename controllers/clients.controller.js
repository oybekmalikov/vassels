const { errorHandler } = require("../helpers/ErrorHandler");
const Clients = require("../models/clients.model");
const { clientsValidation } = require("../validations/clients.validation");
const { createOtp, verifyOtp } = require("../services/otp.service");
const bcrypt = require("bcrypt");
const MailService = require("../services/mail.service");
const JwtService = require("../services/jwt.service");
const config = require("config");
const Contracts = require("../models/contracts.model");
const Payments = require("../models/payments.model");
const Penalties = require("../models/penalties.model");
const Bookings = require("../models/bookings.model");
const Feedbacks = require("../models/feedbacks.model");
const addNewClient = async (req, res) => {
  try {
    const { error, value } = clientsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 5);
    try {
      var newClient = await Clients.create(
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
      message: `Activation code sent to your email, Enter that code to http://localhost:3000/api/clients/activate `,
      verificationKey: result.verificationKey,
      client: newClient.dataValues,
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
    res.status(201).send({
      message: `Activation code sent to your email`,
      verificationKey: result.verificationKey,
      client: req.body.email,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const activateClient = async (req, res) => {
  try {
    const { verificationKey, email, activation_code } = req.body;
    const result = await verifyOtp(
      verificationKey,
      email,
      activation_code,
      "client"
    );
    if (result.success) {
      res.status(200).send({
        message: `${email} activated`,
        id: result.clientId,
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
      "client",
      true
    );
    if (result.success) {
      const clientData = await Clients.findAll({ where: { email: email } });
      const verify = bcrypt.compareSync(
        oldPassword,
        clientData[0].dataValues.password
      );
      if (!verify) {
        return res.status(400).send({
          message: `New and old passwords not matched`,
        });
      }
      if (newPassword !== coniformPassword) {
        return res.status(400).send({
          message: `New password and coniform or old passwords not matched`,
        });
      }
      const hashedNewPassword = bcrypt.hashSync(coniformPassword, 5);
      await Clients.update(
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
const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientData = await Clients.findAll({ where: { email: email } });
    if (clientData.length == 0) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const validPassword = bcrypt.compareSync(
      password,
      clientData[0].dataValues.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const payload = {
      id: clientData[0].dataValues.id,
      email: clientData[0].dataValues.email,
      role: "client",
    };
    const jwtService = new JwtService(
      config.get("CLIENT_ACCESS_KEY"),
      config.get("CLIENT_REFRESH_KEY")
    );
    const tokens = jwtService.genereteTokens(payload);
    await Clients.update(
      { refresh_token: tokens.refreshToken },
      { where: { email: email } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("REFRESH_COOKIE_TIME"),
    });
    res.status(200).send({
      message: `Welcome ${clientData[0].dataValues.first_name} ${clientData[0].dataValues.last_name}!!!`,
      acceesToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const logoutClient = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).send({ message: "Refresh token not found in cookie" });
    }
    const clientData = await Clients.findAll({
      where: { refresh_token: refreshToken },
    });
    if (clientData.length == 0) {
      res.status(400).send({ message: "No user found with such token" });
    }
    await Clients.update(
      { refresh_token: "null", is_active: false },
      { where: { refresh_token: refreshToken } }
    );
    res.clearCookie("refreshToken");
    res.send({
      message: `Client(${ownerData[0].dataValues.email}) logged out`,
      id: clientData[0].dataValues.id,
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
    const clientData = await Clients.findAll({
      where: { refresh_token: refreshToken },
    });
    if (clientData.length == 0) {
      return res
        .status(400)
        .send({ message: "No client with such token found" });
    }
    const jwtService = new JwtService(
      config.get("CLIENT_ACCESS_KEY"),
      config.get("CLIENT_REFRESH_KEY")
    );
    const decodedData = await jwtService.verifyRefreshToken(refreshToken);
    console.log(decodedData, req.cookies);
    const payload = {
      id: clientData[0].dataValues.id,
      email: clientData[0].dataValues.email,
      role: "client",
    };
    const tokens = jwtService.genereteTokens(payload);
    await Clients.update(
      { refresh_token: tokens.refreshToken },
      { where: { id: clientData[0].dataValues.id } }
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
const getAllClients = async (req, res) => {
  try {
    const allClients = await Clients.findAll({
      include: [
        { model: Contracts },
        { model: Payments },
        { model: Penalties },
        { model: Bookings },
        { model: Feedbacks },
      ],
    });
    res
      .status(200)
      .send({ message: "All Clients Selected", clients: allClients });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findAll({
      where: { id: id },
      include: [
        { model: Contracts },
        { model: Payments },
        { model: Penalties },
        { model: Bookings },
        { model: Feedbacks },
      ],
    });
    if (client.length == 0) {
      return res
        .status(404)
        .send({ message: `Client not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Client Selected", client: client[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findAll({ where: { id: id } });
    if (client.length == 0) {
      return res
        .status(404)
        .send({ message: `Client not found with this id: ${id}` });
    }
    if (req.body.password) {
      return res.status(400).send({
        message: `to change Client's password use http://loclahost:3000/clients/change-password`,
      });
    }
    if (req.body.is_active) {
      return res.status(400).send({
        message: `to change Client's activate use http://loclahost:3000/clients/activate`,
      });
    }
    const clientData = client[0].dataValues;
    const { error, value } = clientsValidation({
      ...clientData,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    try {
      var updateClient = await Clients.update(
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
      .send({ message: "Client updated", updatedClient: updateClient[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.destroy({ where: { id: id } });
    if (client == []) {
      return res
        .status(404)
        .send({ message: `Client not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Client Deleted", effected: client });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  activateClient,
  getOtpCode,
  changePassword,
  loginClient,
  logoutClient,
  updateRefreshToken,
};
