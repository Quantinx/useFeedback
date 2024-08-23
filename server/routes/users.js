const express = require("express");
const userRouter = express.Router();

const { getUserDataForProfile } = require("../db/userHelpers");
userRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated) {
    res.status(200).json({ loggedIn: false });
    return;
  }

  userRouter.get("/posts/:username", async (req, res) => {
    const { username } = req.params;
  });

  const user = req.user.user_ID;
  const userData = await getUserDataForProfile(user);
  res.status(userData.status).json({ loggedIn: true, data: userData.data });
});

module.exports = userRouter;
