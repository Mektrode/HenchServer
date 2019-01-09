const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;

const schema = buildSchema (`
    type Query {
        users: [User!]!
        user(id: ID!): User
        consume(name: String, barcode: Int): Consumable
        allconsumables: [Consumable!]!
    }

    type Mutation {
        addUser (email: String!, name: String): User
        addConsumable (name: String!, weightfull: Int!): Consumable
        #Update consumable
        
        #create a meal
        #Update a meal

        #create onboarding
        #Update a stat
        #Update a target
    }

    type User {
        id: ID!
        email: String!
        name: String
    }

    type Consumable {
        id: ID!
        barcode: Int!
        name: String!
        cookingstyle: String!
        weightfull: Int!
        caloriesfull: Int!  
        carbsfull: Int!
        proteinfull: Int!
    }
`);

const rootValue = {
    users: () => db.users,

    allconsumables: () => db.consumables,
    
    //user: args => db.users.find(user => user.id === args.id),
    // Same as code below!!
    user: function (args) {
        return db.users.find(function(user){
            return user.id === args.id
        })
    },

    //Find item an using a name or barcode number
    consume: function(args) {
        return db.consumables.find(function(consume){
            if (consume.name === args.name) {
                return args.name
            }
            else if (consume.barcode === args.barcode){
                return args.barcode
            }
        })
    },

    addUser: ({email, name}) => {
        const user = {
            id: Date.now,
            email,
            name
        }
        db.users.push(user);
        return user
    },

    addConsumable: ({name, weightfull}) => {
        const consumableItem ={
            id: Date.now,
            name,
            weightfull
        }
        db.consumables.push(consumableItem);
        return consumableItem
        //return db.consumables
    }
}

const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))



app.listen(3000, () => console.log('listening on port 3000!!'));

