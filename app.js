const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;
const graphQlSchema = require('./graphql/schema');
const rootValue = require('./graphql/resolvers/index.js');
const mongoose = require('mongoose');

const server = express();


server.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue,
    graphiql: true
}))

server.listen(
    process.env.PORT, 
    () => console.log(`listening on port ${process.env.PORT}!!`)
);

/*
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@hnchrv01-zndec.mongodb.net/test?retryWrites=true`
    )
    /*
    .then(() => {
        server.listen(
            process.env.PORT, 
            () => console.log(`listening on port ${process.env.PORT}!!`)
        );
    })
    .catch(err => {
        console.log(err);
    })
*/