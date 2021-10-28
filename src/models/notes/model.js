"use strict";

const notesModel = (sequelize, DataTypes) =>
  sequelize.define("Notes", {
    text: { type: DataTypes.STRING, required: true },
    // course: { string: }
    creator: { type: DataTypes.STRING, required: true },
  });

module.exports = notesModel;
