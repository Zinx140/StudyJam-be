const { DataTypes } = require("sequelize");
const conn = require("../config/config");
const Users = require("./Users");
const Roles = require("./Roles");
const News = require("./News");

const db = {};

db.Users = Users(conn, DataTypes);
db.Roles = Roles(conn, DataTypes);
db.News = News(conn, DataTypes);

for (const key of Object.keys(db)) {
  db[key].associate(db);
}

module.exports = db;
