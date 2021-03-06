const pg = require("pg");
const settings = require("./settings"); 
const value = process.argv.slice(2)[0];

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });
  
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1", [value], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(result.rows);
      client.end();
    });
  });