"use strict";

const bulletinModel = (sequelize, DataTypes) =>
  sequelize.define("Bulletin", {
    subject: { type: DataTypes.STRING, required: true },
    body: { type: DataTypes.STRING, required: true },
    dueDate: { type: DataTypes.STRING, required: true },
  });

module.exports = bulletinModel;
