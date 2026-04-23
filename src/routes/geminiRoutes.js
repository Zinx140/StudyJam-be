const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/geminiController");
const authorization = require("../middlewares/authorization");

router.post(
  "/",
  authorization("api", "post"),
  geminiController.geminiSummarize,
);

module.exports = router;
