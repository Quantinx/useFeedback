exports.up = function (knex) {
  return knex.schema.createTable("useFeedback_ratings", function (table) {
    table.increments("id").primary();
    table
      .uuid("user_ID")
      .notNullable()
      .references("user_ID")
      .inTable("useFeedback_users")
      .onDelete("CASCADE");
    table
      .integer("comment_ID")
      .unsigned()
      .notNullable()
      .references("comment_ID")
      .inTable("useFeedback_comments")
      .onDelete("CASCADE");
    table.integer("rating").notNullable().defaultTo(0);
    table.unique(["user_ID", "comment_ID"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("useFeedback_ratings");
};
