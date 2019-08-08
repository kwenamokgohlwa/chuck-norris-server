import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

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

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;