const express = require("express");
const {
  newsRouter,
  geminiRouter,
  authRouter,
  userRouter,
} = require("./src/routes");
const cookieParser = require("cookie-parser");
const authentication = require("./src/middlewares/authentication");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/news", authentication, newsRouter);
app.use("/users", authentication, userRouter);
app.use("/gemini", authentication, geminiRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
