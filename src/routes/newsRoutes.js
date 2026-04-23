const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authorization = require("../middlewares/authorization");

router.get("/", authorization("news", "get"), newsController.fetchAllNews);
router.get(
  "/:news_id",
  authorization("news", "get"),
  newsController.fetchNewsByID,
);
router.post("/", authorization("news", "post"), newsController.createNews);
router.put(
  "/:news_id",
  authorization("news", "put"),
  newsController.updateNews,
);
router.delete(
  "/:news_id",
  authorization("news", "delete"),
  newsController.deleteNews,
);

module.exports = router;
