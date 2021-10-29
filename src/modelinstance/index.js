"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("../models/data-collection.js");
const userModel = require("../auth/models/users.js");
const bulletinModel = require("../models/Bulletin/model.js");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const users = userModel(sequelize, DataTypes);
const bulletin = bulletinModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  bulletin: new Collection(bulletin),
  users,
};
