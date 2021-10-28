"use strict";

const notesModel = (sequelize, DataTypes) =>
  sequelize.define("Notes", {
    text: { type: DataTypes.STRING, required: true },
    date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    creator: { type: DataTypes.STRING, required: true },
  });

module.exports = notesModel;
