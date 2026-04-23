"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: "author_id",
        targetKey: "user_id",
      });
    }
  }
  News.init(
    {
      news_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headline: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "News",
      tableName: "news",
      paranoid: true,
      timestamps: true,
      name: {
        singular: "News",
        plural: "News",
      },
    },
  );
  return News;
};
