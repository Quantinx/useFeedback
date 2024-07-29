const express = require("express");
const server = express();
const PORT = 8080;

require("dotenv").config();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

const postRouter = require("./routes/posts");

server.use("/api/posts", postRouter);

server.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
