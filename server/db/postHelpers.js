const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

async function getPosts() {
  const posts = await db("useFeedback_posts").then((post) => {
    return post;
  });
  return posts;
}

async function createPost(user, stack, title, content) {
  const res = {};

  try {
    const [postID] = await db("useFeedback_posts")
      .insert({
        user_ID: user,
        stack: stack,
        post_title: title,
        post_content: content,
      })
      .returning("post_ID");
    res.post = postID;
    res.status = 200;
  } catch (error) {
    res.status = 500;
    res.message = "Failed to create post";
    console.log(error, content); //for internal logging when a post fails to create, this should never trigger but may be useful to see, will upgrade to a log table later
  }
  return res;
}

async function editPost(user, post = 0, stack, content) {
  const response = {};
  try {
    const updatePost = await db("useFeedback_posts")
      .where("user_ID", user)
      .where("post_ID", post)
      .update({ stack: stack, post_content: content, edited: true });
    if (updatePost === 1) {
      response.status = 200;
      response.message = "Post updated successfully";
    } else {
      response.status = 404;
      response.message = "Post not found";
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.message = "Post failed to update";
  }
  return response;
}

async function deletePost(user, post = 0) {
  const response = {};
  try {
    const deleteCount = await db("useFeedback_posts")
      .where("user_ID", user)
      .where("post_ID", post)
      .del();
    if (deleteCount === 1) {
      response.status = 200;
      response.message = "Post deleted sucessfully";
    } else {
      response.status = 404;
      response.message = "Post not found";
    }
  } catch (error) {
    response.status = 500;
    response.message = "Failed to delete post";
    console.log(error);
  }
  return response;
}

module.exports = { getPosts, createPost, editPost, deletePost };
