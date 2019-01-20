const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;
const graphQlSchema = require('./graphql/schema');
const rootValue = require('./graphql/resolvers/index.js');

const server = express();


server.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue,
    graphiql: true
}))



server.listen(3000, () => console.log('listening on port 3000!!'));

//Connect to mongoosedb.then(app.listen).catch(anyerrors)