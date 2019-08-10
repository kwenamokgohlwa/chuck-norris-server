const { ApolloServer, gql } = require('apollo-server');
const fetch = require("node-fetch");

const baseURL = `https://api.chucknorris.io/jokes`

const typeDefs = gql`
  type Query {
    categories: [String!]!
    joke(category: String!): Joke!
  }
  type Joke {
    id: String!
    url: String!
    created_at: String!
    updated_at: String!
    icon_url: String!
    categories: [String!]
    value: String!
  }
`;

const resolvers = {
  Query: {
    categories: () => {
      return fetch(`${baseURL}/categories`).then(res => res.json())
    },
    joke: (parent, args) => {
      const { category } = args
      return fetch(`${baseURL}/random?category=${category}`).then(res => res.json())
    }
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
