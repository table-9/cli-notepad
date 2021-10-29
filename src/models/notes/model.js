"use strict";

const bulletinModel = (sequelize, DataTypes) =>
  sequelize.define("bulletin", {
    text: { type: DataTypes.STRING, required: true },
    course: { type: DataTypes.STRING, required: true },
    creator: { type: DataTypes.STRING, required: true },
  });

module.exports = bulletinModel;
