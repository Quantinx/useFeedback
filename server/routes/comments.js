const express = require("express");
const commentRouter = express.Router();
const Joi = require("joi");

const {
  getComments,
  addComment,
  editComment,
  deleteComment,
  rateComment,
} = require("../db/commentHelpers");

commentRouter.get("/", async (req, res) => {
  const post = req.query.post;
  const page = req.query.page || 1;
  const user = req.user?.user_ID;
  if (!post) {
    res.status(500).json({ error: "requires post parameter" });
    return;
  }

  const commentsPerPage = 20;
  const comments = await getComments(post, page, commentsPerPage, user);
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

commentRouter.post("/rating/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized", status: 401 });
    return;
  }
  const schema = Joi.object({
    rating: Joi.number().valid(-1, 0, 1).required().messages({
      "any.only": "Rating must be one of -1, 0, or 1",
      "any.required": "Rating is required",
    }),
    comment: Joi.number().required(),
    user: Joi.string(),
  });

  const data = {
    user: req.user.user_ID,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const { user, rating, comment } = value;

  const response = await rateComment(user, comment, rating);
  res.status(response.status).json(response.message);
});

module.exports = commentRouter;
