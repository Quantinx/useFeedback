const express = require("express");
const commentRouter = express.Router();

const {
  getComments,
  addComment,
  editComment,
  deleteComment,
} = require("../db/commentHelpers");

commentRouter.get("/", async (req, res) => {
  const post = req.query.post;
  const page = req.query.page || 1;
  if (!post) {
    res.status(500).json({ error: "requires post parameter" });
    return;
  }

  const commentsPerPage = 20;
  const comments = await getComments(post, page, commentsPerPage);
  res.status(comments.status).json(comments.data);
});

commentRouter.post("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const user = req.user.user_ID;
  const post = req.body.post;
  const content = req.body.content;
  if (!post) {
    res.status(400).json({ message: "missing post ID" });
    return;
  }
  if (!content) {
    res.status(400).json({ message: "missing content" });
  }

  const response = await addComment(user, post, content);
  res.status(response.status).json(response.message);
});

commentRouter.patch("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const user = req.user.user_ID;
  const comment = req.body.comment;
  const content = req.body.content;
  const response = await editComment(user, comment, content);
  res.status(response.status).json(response.message);
});

commentRouter.delete("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const user = req.user.user_ID;
  const comment = req.body.comment;
  const reponse = await deleteComment(user, comment);
  res.status(reponse.status).json(reponse.message);
});

module.exports = commentRouter;
