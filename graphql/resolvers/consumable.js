const db = require('./../../database').db;

module.exports = {
    //Query
    allconsumables: () => db.consumables,

    //Resolvers

    //Find item an using a name || barcode number
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