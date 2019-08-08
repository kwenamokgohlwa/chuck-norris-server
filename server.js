import express from 'express';
import bodyParser from 'body-parser';
import schema from './schema';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const app = express();

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.listen(4000, () => console.log(`Express server running on port 4000`));