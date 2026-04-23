const Joi = require("joi");

const usersSchema = Joi.object({
  username: Joi.string().required().min(5).alphanum().messages({
    "any.required": "Username wajib diisi!",
    "string.min": "Username minimal 5 karakter!",
    "string.alphanum": "Username harus dalam bentuk alphanumeric saja!",
    "any.exists": "Username sudah dipakai!",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "Email wajib diisi!",
    "string.email": "Format email tidak sesuai!",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password wajib diisi!",
    "string.min": "Password minimal 8 karakter!",
  }),
  confirm_password: Joi.any().required().valid(Joi.ref("password")).messages({
    "any.required": "Konfirmasi password wajib diisi!",
    "any.only": "Konfirmasi password dan password tidak sama!",
  }),
});

module.exports = usersSchema;
