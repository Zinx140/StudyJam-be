const jwt = require("jsonwebtoken");
const { message } = require("../schemas/usersSchema");
const { Users, Roles } = require("../models");

const authorization = (module_name, permission) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "User tidak ditemukan!",
      });
    }

    const user = await Users.findByPk(Number(req.user.user_id), {
      include: [
        {
          model: Roles,
        },
      ],
    });

    const result = JSON.parse(user.Roles.permissions);
    const permissions = JSON.parse(result);

    for (const p of permissions) {
      if (p.moduleName === module_name && p.permissions.includes(permission)) {
        return next();
      }
    }

    return res.status(403).json({
      status: "Forbidden",
      message: "Role tidak diizinkan",
    });
  };
};

module.exports = authorization;
