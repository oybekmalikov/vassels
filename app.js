const express = require("express");
const config = require("config");
const sequelize = require("./config/ConnectToDB");
const PORT = config.get("PORT");
const mainRouter = require("./routes/main.routes");
const cookieParser = require("cookie-parser");
const errorHandling = require("./middlewares/errors/error.handling");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", mainRouter);
app.use(errorHandling);
async function start() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Project is running on http://localhost:${PORT}}`);
    }
  });
}
start();
