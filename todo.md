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
  }
}

//nested views of stats from users

query {
  user(id: "1"){
    stats {
      bodyType
      bodyTypeLastUpdated
      latestWeight
      latestHeight
    }
  }
}


//search username
query {
  username(uname: "JMo") {
    email
  }
}