module.exports = {
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'matterwiki'
  },
  useNullAsDefault: true
}

/*
The development object is the connection object for the development database.
We need to create more for different environments (production, testing, staging).
This environment is being used in the db.js file in the root directory. Check there.
*/
