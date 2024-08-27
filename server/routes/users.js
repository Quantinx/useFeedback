const express = require("express");
const Joi = require("joi");
const userRouter = express.Router();

const { getUserDataForProfile, updateUser } = require("../db/userHelpers");
userRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(200).json({ loggedIn: false });
    return;
  }

  const user = req.user.user_ID;
  const userData = await getUserDataForProfile(user);
  res.status(userData.status).json({ loggedIn: true, data: userData.data });
});

userRouter.patch("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized ", status: 401 });
    return;
  }

  const schema = Joi.object({
    username: Joi.string().min(5).max(20),
    full_name: Joi.string().min(5).max(20),
    profile_picture: Joi.string().uri(),
    profile_content: Joi.string().min(5).max(255),
  }).unknown(false);

  const userID = req.user.user_ID;
  const payload = req.body;
  const { error, value } = schema.validate(payload);

  if (error) {
    res.status(400).json({ message: "Invalid data", details: error.details });
    return;
  }

  const response = await updateUser(userID, value);
  res.status(response.status).json(response.data);
});

module.exports = userRouter;
