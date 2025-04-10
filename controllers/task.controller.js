const { errorHandler } = require("../helpers/ErrorHandler");
const Clients = require("../models/clients.model");
const VasselsCategories = require("../models/vassels_categories.model");

const taskA = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const sequelize = require("../config/ConnectToDB");
    const result = await sequelize.query(
      `SELECT v.id AS "vasselId", v.model, c.start_date, c.end_date, cs.name AS contract_status
        FROM contracts c
        JOIN vassels AS v ON c."vasselId" = v.id
        LEFT JOIN contract_status cs ON c."contractStatusId" = cs.id
        WHERE (c.end_date <= :end_date AND c.start_date >= :start_date)`,
      {
        replacements: { start_date, end_date },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};
const taskB = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const sequelize = require("../config/ConnectToDB");
    const result = await sequelize.query(
      `select * from owners where id=(SELECT c."ownerId"
       FROM contracts c
       JOIN vassels AS v ON c."vasselId" = v.id
       LEFT JOIN contract_status cs ON c."contractStatusId" = cs.id
       WHERE (c.end_date <= :end_date AND c.start_date >= :start_date and c."contractStatusId"=4))`,
      {
        replacements: { start_date, end_date },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};
const taskC = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const sequelize = require("../config/ConnectToDB");
    const result = await sequelize.query(
      `select * from owners where id=(SELECT c."ownerId"
       FROM contracts c
       JOIN vassels AS v ON c."vasselId" = v.id
       LEFT JOIN contract_status cs ON c."contractStatusId" = cs.id
       WHERE (c.end_date <= :end_date AND c.start_date >= :start_date and c."contractStatusId"=5))`,
      {
        replacements: { start_date, end_date },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};
const taskD = async (req, res) => {
  try {
    const { category } = req.body;
    const categorys = await VasselsCategories.findAll({
      where: { name: category },
    });
    if (!categorys) {
      return res
        .status(400)
        .send({ message: `Category: ${category} not found` });
    }
    const category_id = categorys[0].dataValues.id;
    const sequelize = require("../config/ConnectToDB");
    const result = await sequelize.query(
      `SELECT 
        o.id AS "ownerId",
        o.first_name,
        o.last_name,
        COUNT(c.id) AS all_contracts
        FROM contracts c
        JOIN vassels v ON c."vasselId" = v.id
        JOIN owners o ON c."ownerId" = o.id
        WHERE v."vasselsCategoryId" = ${category_id}
        GROUP BY o.id, o.first_name, o.last_name
        ORDER BY all_contracts DESC;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};
const taskE = async (req, res) => {
  try {
    const {  email } = req.body;
    const client = await Clients.findAll({
      where: { email: email },
    });
    if (client.length==0) {
      return res
        .status(400)
        .send({ message: `Client: not found wiht this email: ${email}` });
    }
    const email_val = client[0].dataValues.email;
    const sequelize = require("../config/ConnectToDB");
    const result = await sequelize.query(
      `select total_cost,payment_method,status, o.first_name,o.last_name,o.email from payments p
        join clients c on p."clientId"=c."id"
        join owners o on p."ownerId"=o."id"
        where c.email='${email_val}'`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = { taskA, taskB, taskC, taskD, taskE };
