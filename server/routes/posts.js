const express = require("express");
const postRouter = express.Router();

const { getPosts } = require("../db/postHelpers");

postRouter.get("/", async (req, res) => {
  const posts = await getPosts();
  res.json({
    data: posts,
  });
});

module.exports = postRouter;
