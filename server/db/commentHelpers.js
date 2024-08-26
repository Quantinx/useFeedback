const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);
const { attachPaginate } = require("knex-paginate");
attachPaginate();

async function getComments(post, page = 1, perPage) {
  const response = {};
  try {
    const comments = await db("useFeedback_comments")
      .join(
        "useFeedback_users",
        "useFeedback_comments.user_ID",
        "=",
        "useFeedback_users.user_ID"
      )
      .where("useFeedback_comments.post_ID", post)
      .select(
        "useFeedback_comments.comment_ID",
        "useFeedback_comments.comment_content",
        "useFeedback_users.username",
        "useFeedback_users.profile_picture",
        "useFeedback_comments.edited",
        "useFeedback_comments.date_created"
      )
      .paginate({ perPage: perPage, currentPage: page });

    response.status = 200;
    response.data = comments;
  } catch (error) {
    response.status = 500;
    response.data = "an error has occured";
    console.log(error);
  }
  return response;
}

async function addComment(user_ID, post_ID, content) {
  const response = {};
  try {
    await db("useFeedback_comments").insert({
      user_ID: user_ID,
      post_ID: post_ID,
      comment_content: content,
    });
    response.message = "comment added successfully";
    response.status = 200;
  } catch (error) {
    response.message = "an error has occured";
    response.status = 500;
    console.log(error);
  }
  return response;
}

async function editComment(user, comment = 0, content) {
  const response = {};
  try {
    const updateComment = await db("useFeedback_comments")
      .where("user_ID", user)
      .where("comment_ID", comment)
      .update({ comment_content: content });
    if (updateComment === 1) {
      response.status = 200;
      response.message = "Comment updated successfully";
    } else {
      response.status = 404;
      response.message = "Comment not found";
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.message = "Comment failed to update";
  }
  return response;
}

async function deleteComment(user, comment = 0) {
  const response = {};
  try {
    const deleteCount = await db("useFeedback_comments")
      .where("user_ID", user)
      .where("comment_ID", comment)
      .del();
    if (deleteCount === 1) {
      response.status = 200;
      response.message = "Comment deleted sucessfully";
    } else {
      response.status = 404;
      response.message = "Comment not found";
    }
  } catch (error) {
    response.status = 500;
    response.message = "Failed to delete comment";
    console.log(error);
  }
  return response;
}

async function rateComment(user, comment, rating) {
  const response = {};
  if (rating === 0) {
    try {
      await db("useFeedback_ratings")
        .where({
          user_ID: user,
          comment_ID: comment,
        })
        .del();
      response.message = "rating successfully removed";
      response.status = 200;
    } catch (error) {
      console.log(error);
      response.message = "An error has occured";
      response.status = 500;
    }
  }

  try {
    await db("useFeedback_ratings")
      .insert({
        user_ID: user,
        comment_ID: comment,
        rating: rating,
      })
      .onConflict()
      .merge();
    response.message = "rating added successfully";
    response.status = 200;
  } catch (error) {
    console.log(error);
    response.message = "an error has occured";
    response.status = 500;
  }

  return response;
}

module.exports = {
  getComments,
  addComment,
  editComment,
  deleteComment,
  rateComment,
};
