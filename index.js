const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs')

const resolvers = require('./resolvers')
const typeDefs = readFileSync('./schema.graphql').toString('utf-8')
const users = require("./src/users");
const { getToken } = require("./src/utils");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({ req }) => {
    const authToken = getToken(req.headers.authorization)
    const user = await users.getAuthUser(authToken);
    if (!user) throw new Error('unauthorize operation');
    return {
      user
    };
  }
});

server.listen({ port: 4000 }, () =>
  console.log(`Listening on http://localhost:4000/graphql`)
);
