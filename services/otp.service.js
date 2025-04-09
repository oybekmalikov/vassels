const otpGenerator = require("otp-generator");
const uuid = require("uuid");
const Otps = require("../models/otps.model");
const { encode, decode } = require("../helpers/crypt");
const { addMinutesToDate } = require("../helpers/add_minutes");
const config = require("config");
const Clients = require("../models/clients.model");
const Owners = require("../models/owners.model");
const createOtp = async (email) => {
  try {
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expirationTime = addMinutesToDate(
      now,
      config.get("EXPIRATION_MINUTE")
    );
    const newOtp = await Otps.create(
      {
        id: uuid.v4(),
        otp,
        expiration_time: expirationTime,
      },
      { returning: true }
    );
    const details = {
      timstamp: now,
      email,
      otp_id: newOtp.dataValues.id,
    };
    const encodedData = await encode(JSON.stringify(details));
    return {
      success: true,
      verificationKey: encodedData,
      otp,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
const verifyOtp = async (
  verificationKey,
  email,
  otp,
  toWhom,
  forChangePassword = false
) => {
  try {
    const now = new Date();
    const decodedData = await decode(verificationKey);
    const details = JSON.parse(decodedData);
    if (details.email != email) {
      return {
        success: false,
        message: "Otp was not send to this email",
      };
    }
    const otpDatas = await Otps.findAll({ where: { id: details.otp_id } });
    if (otpDatas.length == 0) {
      return {
        success: false,
        message: "Otp not found",
      };
    }
    const otpData = otpDatas[0].dataValues;
    if (otpData.verified == true) {
      return {
        success: false,
        message: "Otp already used",
      };
    }
    if (otpData.expiration_time < now) {
      return {
        success: false,
        message: "Otp time expired",
      };
    }
    if (otpData.otp != otp) {
      return {
        success: false,
        message: "Otp not matched",
      };
    }
    if (forChangePassword) {
      return {
        success: true,
        message: "Code verified for change password",
      };
    }
    await Otps.update({ verified: true }, { where: { id: otpData.id } });
    if (toWhom.toLowerCase() == "client") {
      const clientData = await Clients.findAll({ where: { email: email } });
      let clientId, isNew;
      if (clientData.length == 0) {
        const newUser = await Clients.create(
          { email, is_active: true },
          { returning: id }
        );
        clientId = newUser.dataValues.id;
        isNew = true;
      } else {
        await Clients.update({ is_active: true }, { where: { email } });
        clientId = clientData[0].dataValues.id;
        isNew = false;
      }
      return {
        success: true,
        clientId: clientId,
        isNew,
      };
    } else if (toWhom.toLowerCase() == "owner") {
      const ownerData = await Owners.findAll({ where: { email: email } });
      let ownerId, isNew;
      if (ownerData.length == 0) {
        const newUser = await Owners.create(
          { email, is_active: true },
          { returning: id }
        );
        ownerId = newUser.dataValues.id;
        isNew = true;
      } else {
        await Owners.update({ is_active: true }, { where: { email } });
        ownerId = ownerData[0].dataValues.id;
        isNew = false;
      }
      return {
        success: true,
        ownerId,
        isNew,
      };
    } else {
      return {
        success: false,
        message: `User not found with this role: ${toWhom}`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  createOtp,
  verifyOtp,
};
