const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

async function getPosts() {
  const posts = await db("useFeedback_posts").then((post) => {
    return post;
  });
  return posts;
}

async function createPost(user, stack, content) {
  const res = {};

  try {
    //
    await db("useFeedback_posts").insert({
      user_ID: user,
      stack: stack,
      post_content: content,
    });
    res.status = 200;
  } catch (error) {
    res.status = 500;
    res.message = "Failed to create post";
    console.log(error, content); //for internal logging when a post fails to create, this should never trigger but may be useful to see, will upgrade to a log table later
  }
  return res;
}

module.exports = { getPosts, createPost };
