const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;

const schema = buildSchema (`

    type User {
        id: ID!
        email: String!
        name: String
        uname: String
    }

    type Consumable {
        id: ID
        barcode: Int
        name: String!
        cookingstyle: String
        totalweight: Int
        caloriesfull: Int
        carbsfull: Int
        proteinfull: Int
    }

    input AddCon {
        name: String!
    }

    type RootMutation {
        addUser (email: String!, name: String): User
        addConsumable(addcon: AddCon): Consumable
        #Update consumable
        #create a meal
        #Update a meal
        #create onboarding
        #Update a stat
        #Update a target
    }

    type RootQuery {
        users: [User!]!
        user(id: ID!): User
        username(uname: String): User
        consume(name: String, barcode: Int): Consumable
        allconsumables: [Consumable!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

const rootValue = {
    //resolve all the queries to expect
    users: () => db.users,

    allconsumables: () => db.consumables,
    
    //user: args => db.users.find(user => user.id === args.id),
    // Same as code below!!
    user: function (args) {
        return db.users.find(function(user){//parameter user is from db.users
            return user.id === args.id
        })
    },

    username: function (args) {
        return db.users.find(function(user){
            return user.username === args.uname
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

    addUser: args => {
        const user = {
            id: Date.now,
            email: args.email,
            name: args.name
        }
        console.log(args)
        db.users.push(user);
        return user
    },

    addConsumable: args => {
        const consumableItem ={
            id: Date.now,
            //since mutation added was an Input then called addConsumable(addcon:AddCon)
            //hence addcon is our arg and our name value is nested within addcon 1 layer deeper
            //discovered by running a console.log on args below this object!
            name: args.addcon.name
            //hence name is now properly defined
        }
        //console.log(name) when debugging this caused bug since name is undefined outside of the object without pointing into consumableItem.name instead
        //console.log(args)
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

