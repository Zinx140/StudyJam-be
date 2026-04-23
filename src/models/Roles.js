"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Users, {
        foreignKey: "role_id",
        sourceKey: "role_id",
      });
    }
  }
  Roles.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      permissions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "roles",
      paranoid: false,
      timestamps: false,
      name: {
        singular: "Roles",
        plural: "Roles",
      },
    },
  );
  return Roles;
};
