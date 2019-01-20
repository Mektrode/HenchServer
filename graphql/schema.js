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
        username: String
        password: String
        #[Meal!]
        stats: Stats
        prevStatsLog: [PrevStatsLog]
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

#howtogetpreviousinanarray

        latestWeight: Int
        weightLastUpdated: String
        latestHeight: Int
        heightLastUpdated: String 
    }

    type PrevStatsLog {
        allBodyTypes: [NewBodyType]
        allWeights: [NewWeights]
        allHeights: [NewHeight]
    }

    type NewWeights {
        nWeight: Int!
        weightDate: String!
    }

    type NewHeight {
        nHeight: Int!
        heightDate: String!
    }

    type NewBodyType {
        nBodyType: String!
        bodyDate: String!
    }

    input AddWeight{
        nWeight: Int
        weightDate: String
    }

    input AddHeight{
        nHeight: Int
        heightDate: String
    }

    input AddBodyType{
        nBodyType: Int
        bodyDate: String
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
        addWeight (addweight: AddWeight): NewWeights
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
        logs: [PrevStatsLog!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);