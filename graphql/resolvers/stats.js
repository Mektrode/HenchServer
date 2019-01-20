const db = require('./../../database').db;

module.exports = {
    //Stats Query's
    /*logs: () => {
        return db.users.find(function(user){
            return user.prevStatsLog
        })
    },*/
    logs: () => db.users[0].prevStatsLog.prevBodyTypes[1],

    /*addWeight: args => {//Ideally take userId as arg and loop through database to find right user, then add newWeight
        const newWeightLog = {
            nWeight : args.addweight.nWeight,
            weightDate : args.addweight.weightDate
        };
        console.log(args);
        return newWeightLog;
    },*/
}