import fetch from "node-fetch";

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

export default resolvers;