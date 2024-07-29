/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("useFeedback_users", function (table) {
      table.uuid("user_ID").defaultTo(knex.raw("(UUID())")).primary();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("full_name");
      table.string("profile_content");
      table.string("profile_picture");
      table.dateTime("date_created").defaultTo(knex.fn.now());
    })
    .createTable("useFeedback_stacks", function (table) {
      table.string("stack_name").notNullable().primary();
      table.string("stack_description");
    })
    .createTable("useFeedback_posts", function (table) {
      table.increments("post_ID").primary();
      table
        .uuid("user_ID")
        .references("user_ID")
        .inTable("useFeedback_users")
        .notNullable()
        .onDelete("CASCADE");
      table
        .string("stack")
        .references("stack_name")
        .inTable("useFeedback_stacks")
        .notNullable()
        .onDelete("CASCADE");
      table.string("post_content").notNullable();
      table.dateTime("date_created").defaultTo(knex.fn.now());
    })
    .createTable("useFeedback_comments", function (table) {
      table.increments("comment_ID").primary();
      table
        .integer("post_ID")
        .unsigned()
        .references("post_ID")
        .inTable("useFeedback_posts")
        .onDelete("CASCADE");
      table
        .uuid("user_ID")
        .references("user_ID")
        .inTable("useFeedback_users")
        .onDelete("CASCADE");
      table.string("comment_content");
      table.dateTime("date_created").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("useFeedback_comments")
    .dropTableIfExists("useFeedback_posts")
    .dropTableIfExists("useFeedback_stacks")
    .dropTableIfExists("useFeedback_users");
};
