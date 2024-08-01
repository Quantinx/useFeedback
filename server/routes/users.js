const express = require("express");
const userRouter = express.Router();

const { getUserDataForProfile } = require("../db/userHelpers");
userRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(200).json({ loggedIn: false });
    return;
  }

  const user = req.user.user_ID;
  const userData = await getUserDataForProfile(user);
  res.status(userData.status).json({ loggedIn: true, data: userData.data });
});

module.exports = userRouter;
