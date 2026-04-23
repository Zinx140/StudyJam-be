const { Users } = require("../models");
const { message } = require("../schemas/usersSchema");

const fetchUsers = async (req, res) => {
  const users = await Users.findAll();
  return res.status(200).json({
    status: "success",
    message: "All users fetched successfully!",
    data: users,
  });
};

const fetchUserByID = async (req, res) => {
  const { user_id } = req.params;

  const user = await Users.findByPk(Number(user_id));
  if (!user) {
    return res.status(200);
  }

  return res.status(200).json({
    status: "success",
    message: `User with id ${user_id} fetched successfully!`,
    data: user,
  });
};

const updateUser = async (req, res) => {};

const softDeleteUser = async (req, res) => {};

module.exports = {
  fetchUsers,
  fetchUserByID,
  createUser,
  updateUser,
  softDeleteUser,
};
