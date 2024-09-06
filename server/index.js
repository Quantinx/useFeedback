const express = require("express");
const server = express();
server.use(express.json());
require("dotenv").config();
const PORT = process.env.SERVER_PORT;

const bcrypt = require("bcrypt");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

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
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  }).unknown(false);

  const { error, value } = schema.validate({ password, username, email });

  if (error) {
    res.status(400).json(error.details);
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

server.post("/api/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
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
