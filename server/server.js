const { Client } = require('pg');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3001
app.use(express.json());
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('../database.config.json'));

app.use(cors())
const client = new Client({
    user: config.user_name,
    host: config.host,
    database: config.db_name,
    password: config.password,
    port: +config.port,
});

client.connect();


app.get('/classes', async (req, res) => {
    const version_number = req.query.version_number
    let query = ""
    if (version_number){
        query = `SELECT cl.* FROM "class" as cl
        left join vocabulary_metrics as voc
        on voc.name = cl.vocabulary_name and voc.version = cl.vocabulary_version_number
        where voc.name in (
            SELECT name FROM vocabulary_metrics
            GROUP BY name
            HAVING count(*)>=${version_number}
        )`;
    } else {
        query = `SELECT * FROM class`;
    }
    client.query(query, (err, res1) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({ classes: res1.rows })
    });
})


app.get('/vocabularies', async (req, res) => {
    const version_number = req.query.version_number
    let query = ""
    if (version_number){
        query = `select * from vocabulary_metrics as vm
        inner join vocabulary_external_metrics as vem
        on vm.name = vem.vocabulary_name
        where vm.name in (
            SELECT name FROM vocabulary_metrics
            GROUP BY name
            HAVING count(*)>=${version_number}
        )`;
    } else {
        query = `select * from vocabulary_metrics as vm
        inner join vocabulary_external_metrics as vem
        on vm.name = vem.vocabulary_name`;
    }
    client.query(query, (err, res1) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({ vocabularies: res1.rows })
    });
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))