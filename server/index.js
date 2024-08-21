const express = require("express");
const server = express();
server.use(express.json());
require("dotenv").config();
const PORT = process.env.SERVER_PORT;

const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");

server.use(cookieParser());

server.use(passport.initialize());

const {
  getUserByEmail,
  getUserByUsername,
  getUserByUUID,
  createUser,
} = require("./db/userHelpers");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies.token,
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (jwtPayload, done) => {
      try {
        console.log(jwtPayload);
        const user = await getUserByUUID(jwtPayload.uuid);
        if (!user) {
          return done(null, false, { message: "No user found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      req.isAuthenticated = false;
    } else {
      req.isAuthenticated = true;
      req.user = user;
    }
    next();
  })(req, res, next);
}

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

server.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "No user exists" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ uuid: user.user_ID }, process.env.SECRET, {
      expiresIn: "4h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//
const { getStacks } = require("./db/stackHelpers");
server.get("/api/stacks", async (req, res) => {
  const stacks = await getStacks();
  res.status(stacks.status).json(stacks.data);
});

//

const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const userRouter = require("./routes/users");

server.use("/api/posts", authenticateJWT, postRouter);
server.use("/api/comments", authenticateJWT, commentRouter);
server.use("/api/users", authenticateJWT, userRouter);

server.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
