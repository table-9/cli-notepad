"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("../models/data-collection.js");
const userModel = require("../auth/models/users.js");
const notesModel = require("../models/notes/model.js");

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
const notes = notesModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  notes: new Collection(notes),
  users,
};
