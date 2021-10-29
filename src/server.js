"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
const authRoutes = require("./auth/routes");
const logger = require("./auth/middleware/logger.js");
const apiRoutes = require("./routes/apiRoutes.js");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(authRoutes);
app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
