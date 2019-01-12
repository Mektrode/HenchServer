const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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