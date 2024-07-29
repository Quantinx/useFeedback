const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

async function getPosts() {
  const posts = await db("useFeedback_posts").then((post) => {
    return post;
  });
  return posts;
}

module.exports = { getPosts };
