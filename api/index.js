const { ApolloServer, gql } = require('apollo-server-micro')
const fetch = require("node-fetch");

const typeDefs = [`
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
`];

const baseURL = `https://api.chucknorris.io/jokes`

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
})

module.exports = server.createHandler({ path: '/api' })