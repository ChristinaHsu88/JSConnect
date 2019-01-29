const settings = require("./settings"); 
const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const DB = process.argv.slice(2)[2];

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
    .insert({first_name: firstName , last_name: lastName, birthdate: DB})
    .asCallback(function(err, rows) {
        if (err) return console.log(err);
        console.log(rows);
    })
    .finally(function() {
        knex.destroy()
    });

