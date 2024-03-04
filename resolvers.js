const { incrementFav, listProperties } = require("./src/controller.js");

const resolvers = {
  Query: {
    properties: listProperties
  },
  Mutation: {
    incrementFav
  }
};

module.exports = resolvers