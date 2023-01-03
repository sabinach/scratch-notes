import { Meteor } from 'meteor/meteor';
import { Client } from 'pg';

async function getPgClient() {
    return new Client({
      host: "localhost",
      port: 5432,
      database: "testdb",
      user: "postgres",
      password: "XXX"
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        async 'db.getTable' (table) {
            const client = await getPgClient();
            try {
                await client.connect();
                await client.query(`SELECT * FROM ${table};`)
                    .then(res => { 
                        console.log(res.rows) // res.rows[0]
                    })
                    .catch(err => {
                        console.error('SELECT failed.');
                    });
            }catch(err) {
                console.error(err);
            } finally {
                await client.end();
            }
        }
    });
}
