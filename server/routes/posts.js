const express = require("express");
const postRouter = express.Router();

const {
  getPosts,
  createPost,
  editPost,
  deletePost,
  getPostbyID,
} = require("../db/postHelpers");

postRouter.get("/", async (req, res) => {
  const category = req.query.category;
  const page = req.query.page;
  const username = req.query.username;
  if (!category && !username) {
    return res.status(400).json({ message: "missing parameters" });
  }
  const posts = await getPosts(category, username, page);
  res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "missing ID" });
  }
  const post = await getPostbyID(id);
  res.json({ data: post });
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
