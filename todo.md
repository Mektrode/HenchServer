Data {
    TODO:-
    => Properly Structure the users objects
    => Include stats object (weight height etc)
    => Include target object (targetWeight, deadline, )
    => Create meals object (mealCreatedAt, userTarget when created?,)
    => Have dummy object for 3 meals a day consisting of different consumables for last 7 days
    => das


    Qs??
    Store meal relation to target at that time or now or both
}

QL {
    Todo:-
    => 
    => 
}
Notes:-

FrontEnd: 
- Onboarding (part 1) is just calling Creating Stats for the first time
- Onboarding (part 2) is adding targets

- to be able to 


//GraphiQL shortcuts

//addConsumable
mutation {
  addConsumable(addcon:{name: "Tea"}) {
    id
    name
    barcode
    proteinfull
  },
  addUser(email: "filip@live.com", username: "MrFilip",password: "jkUDFa") {
    username
  },
  addWeight(addweight:{nWeight: 123, weightDate: "11062019"}) {
  	nWeight
  }
}

//nested views of stats from users

query {
  user(id:1) {
    id
    email
    username
    name
    stats {
      bodyType
      bodyTypeLastUpdated
      latestWeight
      weightLastUpdated
      latestHeight
      heightLastUpdated
    }
    prevStatsLog {
      prevWeights {
        nWeight
        weightDate
      }
      prevBodyTypes {
        nBodyType
        bodyDate
      }
      prevHeights {
        nHeight
        heightDate
      }
    }
  }
}

//search username
query {
  username(uname: "JMo") {
    email
  }
}


//bug fixes
20/01/2019 {
  when the query is same as schema but different from the database {
    if schema is nullable {
      it will still work in Graphiql but will return null since does not exist in the database
    }
    if query is (!/non-nullable) {
      it will throw an error e.g. (Cannot return null for non-nullable field Stats.bodyiType.)
    }
  }

  when query made is same as database but schema not set up for query {
    Cannot query field \"bodyType\" on type \"Stats\". Did you mean \"bodyiType\"?
  }

  //bug fixed by making schema more specific (added [] to let graphql know to expect an array of data)
  }
}