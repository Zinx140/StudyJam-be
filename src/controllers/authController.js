const { Users, Roles } = require("../models");
const bcrypt = require("bcrypt");
const usersSchema = require("../schemas/usersSchema");
const jwt = require("jsonwebtoken");
const joiFormatter = require("../helpers/joiFormatter");
const { Op } = require("sequelize");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../helpers/jwtKeyGenerator");
const {
  refreshCookieOptions,
  accessCookieOptions,
} = require("../constants/cookieOptions");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Semua form wajib diisi!",
    });
  }

  const user_login = await Users.findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: Roles,
      },
    ],
    attributes: ["user_id", "password", "role_id"],
  });

  if (!user_login) {
    return res.status(404).json({
      status: "error",
      message: "User dengan email tersebut tidak ditemukan!",
    });
  }

  const result = JSON.parse(user_login.Roles.permissions);
  const permissions = JSON.parse(result);

  const user = {
    user_id: user_login.user_id,
    role_id: user_login.role_id,
    permissions: permissions,
  };

  const check_pass = await bcrypt.compare(password, user_login.password);
  if (check_pass) {
    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    res.cookie("refreshToken", refresh_token, refreshCookieOptions);
    res.cookie("accessToken", access_token, accessCookieOptions);

    return res.status(200).json({
      status: "success",
      message: "Login sukses !",
      user: user,
    });
  }

  return res.status(401).json({
    status: "error",
    message: "Username atau password salah!",
  });
};

const register = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  try {
    await usersSchema.validateAsync(req.body, { abortEarly: false });

    const isExist = await Users.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (isExist) {
      return res.status(409).json({
        status: "error",
        message: "Username atau email sudah digunakan!",
      });
    }

    const hashed_pass = await bcrypt.hash(password, 10);

    await Users.create({
      username,
      email,
      password: hashed_pass,
    });

    return res.status(201).json({
      status: "success",
      message: "Registrasi berhasil!",
    });
  } catch (error) {
    if (error.details) {
      const err_messages = joiFormatter(error);

      return res
        .status(400)
        .json({ status: "error", errors_messages: err_messages });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error!",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    status: "success",
    message: "Logout berhasil!",
  });
};

const refresh = async (req, res) => {
  try {
    const refresh_token = req.cookies?.refreshToken;

    if (!refresh_token) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      return res.status(401).json({
        status: "Unauthorized",
        message: "Refresh token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const user = await Users.findByPk(decoded.user_id);

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "User tidak ditemukan",
      });
    }

    const new_access_token = generateAccessToken(user);
    res.cookie("accessToken", new_access_token, accessCookieOptions);

    return res.status(200).json({
      status: "success",
      message: "Access token berhasil diperbarui",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Refresh token expired",
      });
    }

    return res.status(401).json({
      status: "Unauthorized",
      message: "Refresh token tidak valid",
    });
  }
};

module.exports = {
  login,
  refresh,
  register,
  logout,
};
