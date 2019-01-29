const settings = require("./settings"); 
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : settings.hostname,
        user : settings.user,
        password : settings.password,
        database : settings.database
    }
});

knex.select('*').from('famous_people')
    .where('first_name', '=', 'Paul')
    .asCallback(function(err, rows) {
        if (err) return console.log(err);
        console.log(rows);
    })
    .finally(function() {
        knex.destroy()
    });
