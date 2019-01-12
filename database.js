const db = {

users: [//add jwt authentication then meals under it here!!
    { 
        id:'1', 
        email:'mlaffin@gmail.com',
        username: 'JMo',
        name:'Jamaal M',
        stats : {
            bodyType: "Ectomorph",
            bodyTypeLastUpdated: "like11022012",//String
            latestWeight: 65,
            weightLastUpdated: "maybe1202012",//String
            latestHeight: 172,
            heightLastUpdated: "prolly11067012",//String
        },
        prevStatsLog: [
            {
                prevBodyTypes: [
                    {
                        bodyType: "ENDO",
                        Date: "12/12/2018"
                    },
                    {
                        bodyType: "MESO",
                        Date: "01/08/2018"
                    },
                    {
                        bodyType: "GODKNOWS",
                        Date: "29/02/2018"
                    },
                ],
                prevWeights: [
                    {
                        nWeight: 62,
                        Date: "12/12/2018"
                    },
                    {
                        nWeight: 59,
                        Date: "01/08/2018"
                    },
                    {
                        nWeight: 57,
                        Date: "29/02/2018"
                    },
                ],
                prevHeights: [
                    {
                        nHeight: 170,
                        Date: "12/12/2018"
                    },
                    {
                        nHeight: 193,
                        Date: "01/08/2018"
                    },
                    {
                        nHeight: 187,
                        Date: "29/02/2018"
                    },
                ],
            }
        ],
        /*target : {
            tweight: 75,
            deadline: 11022020
        },*/
        meals : [
            {
                id: '45345',
                dateCreated: '',
                name: 'Breakfast',
                userCreated: '',
                items: [
                    {
                        //point to id of consumable after adding
                        id: 89743216,
                        amountConsumed: '2',
                        amount: 'whole',
                        cookingStyle: 'Fried'
                    },
                    {
                        id: 56492578,
                        amountConsumed: '20',
                        amount: 'g',
                        cookingStyle: 'Uncooked'
                    },
                    {
                        id: 21878415,
                        amountConsumed: '400',
                        amount: 'ml',
                        cookingStyle: 'Uncooked'//what to do for cookingStyle of drinks?
                    },
                ],
            }
        ]
    },
],
consumables: [
    {//clean up by doing weightTotal, calories100, carbs100 ,carbsOWS100, fat100, fatOWS100, protein100, salt100, and maybe extras like fibre & calcium etc...
        id: '1',
        barcode: 21878415,
        name: "Orange Juice",
        totalweight: 1000,
        caloriesfull: 42,
        carbsfull: 9.1,
        proteinfull: 7,
    },
    {
        id: '2',
        barcode: 89743216,
        name: "Egg",
        cookingstyle: "Fried",
        totalweight: 1000,
        caloriesfull: 42,
        carbsfull: 9.1,
        proteinfull: 4,
    },
    {
        id: '3',
        barcode: 56492578,
        name: "Beans",
        totalweight: 519,
        caloriesfull: 42,
        carbsfull: 9.1,
        proteinfull: 8,
    },
]

}

exports.db = db;