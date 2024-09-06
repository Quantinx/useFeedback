const express = require("express");
const Joi = require("joi");
const userRouter = express.Router();

const {
  getUserDataForProfile,
  updateUser,
  getProfileByUsername,
} = require("../db/userHelpers");
userRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(200).json({ loggedIn: false });
    return;
  }

  const user = req.user.user_ID;
  const userData = await getUserDataForProfile(user);
  res.status(userData.status).json({ loggedIn: true, data: userData.data });
});

userRouter.get("/profile/:username", async (req, res) => {
  const username = req.params.username;
  const userProfle = await getProfileByUsername(username);
  res.status(userProfle.status).json(userProfle.data);
});

userRouter.patch("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ message: "Unauthorized ", status: 401 });
    return;
  }

  const schema = Joi.object({
    username: Joi.string()
      .min(5)
      .max(20)
      .pattern(
        /^[a-zA-Z0-9_-]*$/,
        "alphanumeric with hyphens and underscores, no spaces"
      )
      .message(
        "Username must be betweeen 5-20 characters and can only contain letters, numbers, underscores and dashes"
      ),
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
