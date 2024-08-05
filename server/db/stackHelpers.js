const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

async function getStacks() {
  const response = {};
  try {
    const stacks = await db("useFeedback_stacks");
    response.data = stacks;
    response.status = 200;
  } catch (error) {
    console.log(error);
    response.status = 500;
  }
  return response;
}

module.exports = { getStacks };
