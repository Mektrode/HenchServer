const express = require('express');
const graphqlHTTP = require ('express-graphql');
const {buildSchema } = require('graphql');
const db = require('./database.js').db;

const schema = buildSchema (`

    type Consumable {
        name: String!
        id: ID
        barcode: Int
        cookingstyle: String
        totalweight: Int
        caloriesfull: Int
        carbsfull: Int
        proteinfull: Int
    }

    input AddCon {
        name: String!
        id: ID
        barcode: Int
        cookingstyle: String
        totalweight: Int
        caloriesfull: Int
        carbsfull: Int
        proteinfull: Int
    }

    type User {#get only
        id: ID!
        email: String!
        name: String
        uname: String
        password: String
        #[Meal!]
        #stats: Stats
        #targets: Targets
    }

    input AddUser {
        email: String
        username: String
        password: String
    }

    type Stats {#get info from each individual Types defined below Stats
        bodyType: String
        bodyTypeLastUpdated: String
        latestWeight: Int
        weightLastUpdated: String
        latestHeight: Int
        heightLastUpdated: String 
    }

    type NewWeight {
        nWeight: Int
        Date: String
        Time: String
    }

    type NewHeight {
        nHeight: Int
        Date: String
        Time: String
    }

    type NewBodyType {
        nBodyType: Int
        Date: String
        Time: String
    }

    input AddWeight{
        nWeight: Int
        Date: String
        Time: String
    }
    
    input AddHeight{
        nWeight: Int
        Date: String
        Time: String
    }
    
    input AddBodyType{
        nBodyType: Int
        Date: String
        Time: String
    }

    #input Targets { //add later
    #    weight: Int
    #    deadlineSet: String
    #}

    #When refering to objects passed down from inputs above;
    #Key is:-
    #smallThenCapitals = resolver function name && possibly any child args passed down 2 levels
    #smallalltheway = js object passed through args
    #CapitalOnEveryNewLetter = the Input Object name || the Type name

    type RootMutation {
        addUser (adduser: AddUser): User
        
        addConsumable(addcon: AddCon): Consumable
        
        #Stats
        addWeight (addweight: AddWeight): NewWeight
        addHeight (addheight: AddHeight): NewHeight
        addBodyType (addbodytype: AddBodyType): NewBodyType

        #Todo:-
            #Update consumable
            #Create a meal
            #Update a meal
            #Create target type and input
            #Update a stat (weight/height or bodyType) to delete accidental entry for example
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
    schema,
    rootValue,
    graphiql: true
}))



app.listen(3000, () => console.log('listening on port 3000!!'));

