const { default: axios, head } = require("axios");
const { News, Users } = require("../models");
const jwt = require("jsonwebtoken");

const fetchAllNews = async (req, res) => {
  const result = await News.findAll({
    attributes: ["news_id", "headline", "content"],
    include: [
      {
        model: Users,
        attributes: ["username", "user_id"],
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    data: result,
  });
};

const fetchNewsByID = async (req, res) => {
  const { news_id } = req.params;
  const news = await News.findByPk(Number(news_id), {
    attributes: ["news_id", "headline", "content"],
    include: [
      {
        model: Users,
        attributes: ["username", "user_id"],
      },
    ],
  });

  if (!news) {
    return res.status(404).json({
      status: "error",
      message: "Berita tidak ditemukan!",
    });
  }

  return res.status(200).json({
    status: "success",
    data: news,
  });
};

const createNews = async (req, res) => {
  const { headline, content } = req.body;

  if (!headline || !content) {
    return res.status(400).json({
      status: "error",
      message: "headline dan konten berita wajib diisi!",
    });
  }

  const access_token = req.cookies?.accessToken;
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

  const user = await Users.findByPk(Number(decoded.user_id));
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan!",
    });
  }

  await News.create({
    headline,
    content,
    author_id: decoded.user_id,
  });

  return res.status(201).json({
    status: "success",
    message: "Berita berhasil dibuat!",
  });
};

const updateNews = async (req, res) => {
  const { news_id } = req.params;
  const { headline, content } = req.body;

  const news = await News.findByPk(Number(news_id));

  if (!news) {
    return res.status(404).json({
      status: "error",
      message: "Berita tidak ditemukan!",
    });
  }

  const curr_headline = news.headline;
  await news.update({
    headline,
    content,
  });

  return res.status(200).json({
    status: "success",
    message: `Berita ${curr_headline} berhasil diperbarui!`,
  });
};

const deleteNews = async (req, res) => {
  const { news_id } = req.params;

  const news = await News.findByPk(Number(news_id));
  if (!news) {
    return res.status(404).json({
      status: "error",
      message: "Berita tidak ditemukan!",
    });
  }

  await news.destroy();

  return res.status(200).json({
    status: "success",
    message: `Berita ${news.headline} berhasil dihapus!`,
  });
};

module.exports = {
  fetchAllNews,
  fetchNewsByID,
  createNews,
  updateNews,
  deleteNews,
};
