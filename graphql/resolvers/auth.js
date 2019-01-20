//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//temp database
const db = require('./../../database').db;

//connect to Mongoose using = const User = require('../../models/user');

module.exports = {
  //resolve all the queries to expect
  users: () => db.users,
  
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

  addUser: args => {
      const user = {
          id: Date.now,
          email: args.adduser.email,
          username: args.adduser.username
      }
      console.log(args)
      db.users.push(user);
      return user
  }
};