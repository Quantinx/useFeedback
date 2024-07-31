const express = require("express");
const postRouter = express.Router();

const { getPosts, createPost } = require("../db/postHelpers");

postRouter.get("/", async (req, res) => {
  const posts = await getPosts();
  res.json({
    data: posts,
  });
});

postRouter.post("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("not logged");

    return;
  }
  const user = req.user.user_ID;
  const stack = req.body.stack;
  const content = req.body.content;
  console.log(user);
  const addPost = await createPost(user, stack, content);
  res.status(addPost.status);
  res.json(addPost);
});

module.exports = postRouter;
