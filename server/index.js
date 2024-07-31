const express = require("express");
const server = express();
server.use(express.json());
require("dotenv").config();
const PORT = process.env.SERVER_PORT;

const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

server.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await getUserByEmail(email);
      console.log(user);
      if (!user) {
        return done(null, false, { message: "No user exists" });
      }
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return done(null, false, { message: "Wrong password" });
      }
      return done(null, user);
    }
  )
);

const {
  getUserByEmail,
  getUserByUsername,
  createUser,
} = require("./db/userHelpers");

passport.serializeUser((user, done) => {
  console.log("data serialized");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("data deserialized");
  done(null, user);
});
//
server.post("/api/register", async (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  const username = data.username;
  if (!password) {
    res.status(500);
    res.json({ error: "missing password" });
    return;
  }
  if (!email) {
    res.status(500);
    res.json({ error: "missing email" });
    return;
  }
  if (!username) {
    res.status(500);
    res.json({ error: "missing username" });
    return;
  }
  if (await getUserByEmail(email)) {
    res.status(500);
    res.json({ error: "email already exists" });
    return;
  }
  if (await getUserByUsername(username)) {
    res.status(500);
    res.json({ error: "user already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const registerResponse = await createUser(email, username, hashedPassword);
  res.status(registerResponse.status);
  res.json({ message: registerResponse.message });
});

server.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log("login endpoint pinged");
  res.json("Welcome " + req.user.email);
});

//

const postRouter = require("./routes/posts");

server.use("/api/posts", postRouter);

server.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
