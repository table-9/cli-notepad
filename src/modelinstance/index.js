"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("../models/data-collection.js");
const userModel = require("../auth/models/users.js");
const notesModel = require("../models/notes/model.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite::memory:";

const sequelize = new Sequelize(DATABASE_URL);
const users = userModel(sequelize, DataTypes);
const notes = notesModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  notes: new Collection(notes),
  users,
};
