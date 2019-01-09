const { graphql, buildSchema } = require('graphql');
const db = require('../database.js').db;
//const data = require(database);

/*const db = {
    users: [
        { id:'1', email:'jkasd1@gmail.com0', name:'JokerASD'},
        { id:'2', email:'Lli2@gmail.com0', name:'Smalli'},
        { id:'3', email:'hassdas3@gmail.com0', name:'Hodas'}
    ]
}*/

const schema = buildSchema (`
    type Query {
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        name: String
    }
`);

const rootValue = {
    users: () => db.users
}

graphql(
    schema,
    `
    {
        users {
            email
        }
    }
    `,
    rootValue
).then(
    res => console.dir(res, { depth: null})
).catch(
    console.error
)
