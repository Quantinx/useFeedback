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

async function getUserByUUID(userID) {
  const user = await db("useFeedback_users")
    .select("email", "user_ID", "password")
    .where("user_ID", userID)
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

async function getUserDataForProfile(userID) {
  const response = {};
  try {
    const userData = await db("useFeedback_users")
      .select(
        "email",
        "username",
        "full_name",
        "profile_content",
        "profile_picture"
      )
      .where("user_ID", userID);
    response.data = userData[0];
    response.status = 200;
  } catch (error) {
    response.data = "an error has occured";
    response.status = 500;
  }
  return response;
}

async function getProfileByUsername(username) {
  const response = {};
  try {
    const userData = await db("useFeedback_users")
      .select("username", "full_name", "profile_content", "profile_picture")
      .where("username", username);

    if (!userData.length) {
      response.status = 404;
      response.data = "User not found";
      return response;
    }
    response.data = userData[0];
    response.status = 200;
  } catch (error) {
    response.data = "an error has occured";
    response.status = 500;
  }
  return response;
}

async function updateUser(userID, payload) {
  const response = {};

  try {
    const updateData = await db("useFeedback_users")
      .where("user_ID", userID)
      .update(payload);
    if (updateData === 1) {
      response.data = "Profile updated successfully";
      response.status = 200;
    } else {
      response.data = "Unable to find user profile";
      response.status = 404;
    }
  } catch (error) {
    console.log(error);
    response.data = "an error has occured";
    response.status = 500;
  }
  return response;
}

module.exports = {
  getUserByEmail,
  getUserByUUID,
  getUserByUsername,
  createUser,
  getUserDataForProfile,
  updateUser,
  getProfileByUsername,
};
