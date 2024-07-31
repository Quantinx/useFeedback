const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

async function getUserByEmail(email) {
  const user = await db("useFeedback_users")
    .select("email", "user_ID", "password")
    .where("email", email)
    .then((user) => {
      return user;
    });
  return user[0];
}

async function getUserByUsername(username) {
  const user = await db("useFeedback_users")
    .select("email", "user_ID", "password")
    .where("username", username)
    .then((user) => {
      return user;
    });
  return user[0];
}

async function createUser(email, username, password) {
  const res = await db("useFeedback_users")
    .insert({
      email,
      password,
      username,
    })
    .then(() => {
      return { status: 200, message: "user created successfully" };
    });
  return res;
}

module.exports = { getUserByEmail, getUserByUsername, createUser };
