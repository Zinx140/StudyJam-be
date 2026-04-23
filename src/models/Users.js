"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Roles, {
        targetKey: "role_id",
        foreignKey: "role_id",
      });

      Users.hasMany(models.News, {
        foreignKey: "author_id",
        sourceKey: "user_id",
      });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      paranoid: true,
      timestamps: true,
      name: {
        singular: "Users",
        plural: "Users",
      },
    },
  );
  return Users;
};
