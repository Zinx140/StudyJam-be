const { Op } = require("sequelize");
const { News, Users } = require("../models");
const { default: axios } = require("axios");
const promptFormatter = require("../helpers/promptFormatter");
const formatDisplay = require("../helpers/formatDisplay");

const geminiSummarize = async (req, res) => {
  const { news_ids } = req.body;

  const news_ids_list = news_ids.split(",");

  for (const value of news_ids_list) {
    if (isNaN(value)) {
      return res.status(400).json({
        status: "error",
        message: "Ada id berita yang bukan angka",
      });
    }
  }

  const selected_news = await News.findAll({
    where: {
      news_id: {
        [Op.in]: news_ids_list,
      },
    },
    attributes: ["news_id", "headline", "content"],
    include: [
      {
        model: Users,
        attributes: ["username", "user_id"],
      },
    ],
  });

  if (selected_news.length <= 0) {
    return res.status(404).json({
      status: "error",
      message: "Tidak ada berita yang ditemukan!",
    });
  }

  const prompt = promptFormatter(selected_news);

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent?key=${GEMINI_API_KEY}`;
  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const summarize_result = formatDisplay(
      response.data.candidates[0].content.parts[0].text,
    );

    return res.status(200).json({
      status: "success",
      news_content: selected_news,
      summarize_result: summarize_result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  geminiSummarize,
};
