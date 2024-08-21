const express = require("express");
const postRouter = express.Router();

const {
  getPosts,
  createPost,
  editPost,
  deletePost,
} = require("../db/postHelpers");

postRouter.get("/", async (req, res) => {
  const category = req.query.category;
  const post = req.query.post;
  const posts = await getPosts(category, post);
  res.json({
    data: posts,
  });
});

postRouter.post("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  console.log("logged in");
  const user = req.user.user_ID;
  const stack = req.body.stack;
  const title = req.body.title;
  const content = req.body.content;
  console.log(user);
  const addPost = await createPost(user, stack, title, content);
  res.status(addPost.status);
  res.json(addPost);
});

postRouter.patch("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const user = req.user.user_ID;
  const post = req.body.post;
  const stack = req.body.stack;
  const content = req.body.content;
  const editResponse = await editPost(user, post, stack, content);
  res.status(editResponse.status).json(editResponse.message);
});

postRouter.delete("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const user = req.user.user_ID;
  const post = req.body.post;
  const deleteResponse = await deletePost(user, post);
  res.status(deleteResponse.status).json(deleteResponse.message);
});
module.exports = postRouter;
