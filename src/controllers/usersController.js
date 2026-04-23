const { Users, Roles } = require("../models");
const { message } = require("../schemas/usersSchema");

const fetchUsers = async (req, res) => {
  const users = await Users.findAll({
    include: [
      {
        model: Roles,
      },
    ],
    attributes: ["user_id", "username", "role_id"],
  });

  const format_users = users.map((u) => {
    const result = JSON.parse(u.Roles.permissions);
    const permissions = JSON.parse(result);

    return {
      user_id: u.user_id,
      username: u.username,
      role_name: u.Roles.role_name,
      permissions,
    };
  });

  return res.status(200).json({
    status: "success",
    message: "All users fetched successfully!",
    data: format_users,
  });
};

const fetchUserByID = async (req, res) => {
  const { user_id } = req.params;

  const user = await Users.findByPk(Number(user_id), {
    include: [
      {
        model: Roles,
      },
    ],
    attributes: ["user_id", "username", "role_id"],
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan!",
    });
  }

  const result = JSON.parse(user.Roles.permissions);
  const permissions = JSON.parse(result);

  return res.status(200).json({
    status: "success",
    message: `User with id ${user_id} fetched successfully!`,
    data: {
      user_id: user.user_id,
      username: user.username,
      role_name: user.Roles.role_name,
      permissions,
    },
  });
};

const updateRoleUser = async (req, res) => {
  const { user_id } = req.params;
  const { role_id } = req.body;

  const user = await Users.findByPk(Number(user_id));
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan!",
    });
  }

  user.update({
    role_id,
  });

  return res.status(200).json({
    status: "success",
    message: `User ${user.username} berhasil diperbarui!`,
  });
};

const softDeleteUser = async (req, res) => {
  const { user_id } = req.params;

  const user = await Users.findByPk(Number(user_id));
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan!",
    });
  }

  await user.destroy();

  return res.status(200).json({
    status: "success",
    message: `User ${user.username} berhasil dihapus!`,
  });
};

module.exports = {
  fetchUsers,
  fetchUserByID,
  updateRoleUser,
  softDeleteUser,
};
