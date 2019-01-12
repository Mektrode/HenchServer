const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;

const graphQlSchema = require('./graphql/schema');


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
        //Date is object that must be called on its own before manipulated
        let da = new Date()
        //GraphQL cannot handle Integers larger then 32Bit (natively)
        //JS cannot slice an Integer
        //therefore use .getTime().toString().slice(0, 8);
        const consumableItem ={
            id: Math.random().toString(),//Database will takecare of this later

            //since mutation added was an Input then called addConsumable(addcon:AddCon)
            //hence addcon is our arg and our name value is nested within addcon 1 layer deeper
            //discovered by running a console.log on args below this object!
            name: args.addcon.name,
            //hence name is now properly defined

            barcode: da.getTime().toString().slice(0, 8),
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
    schema: graphQlSchema,
    rootValue,
    graphiql: true
}))



app.listen(3000, () => console.log('listening on port 3000!!'));

//Connect to mongoosedb.then(app.listen).catch(anyerrors)