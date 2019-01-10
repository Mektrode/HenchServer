const db = {
    users: [//add jwt authentication then meals under it here!!
        { id:'1', email:'jolovlok1@gmail.com0', name:'Jo'},
        { id:'2', email:'Lilss1@gmail.com0', name:'Lily'},
        { id:'3', email:'husky3@gmail.com0', name:'Huncho'}
    ],
    consumables: [
        {//clean up by doing weightTotal, calories100, carbs100 ,carbsOWS100, fat100, fatOWS100, protein100, salt100, and maybe extras like fibre & calcium etc...
            id: '1',
            barcode: 21878415,
            name: "Orange Juice",
            weightfull: 1000,
            caloriesfull: 42,
            carbsfull: 9.1,
            proteinfull: 7,
        },
        {
            id: '2',
            barcode: 89743216,
            name: "Egg",
            cookingstyle: "Fried",
            weightfull: 1000,
            caloriesfull: 42,
            carbsfull: 9.1,
            proteinfull: 4,
        },
        {
            id: '3',
            barcode: 56492578,
            name: "Beans",
            weightfull: 519,
            caloriesfull: 42,
            carbsfull: 9.1,
            proteinfull: 8,
        },
    ],
    meals: [
        { id:'1', itemId: '2',}//Grabs different consumbles and adds date of creation etc...
    ]
}

exports.db = db;