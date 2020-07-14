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
    const min_version = req.query.min_version || 1
    const max_version = req.query.max_version || 1000
    const incoming_links = req.query.incoming_links ? JSON.parse(req.query.incoming_links) : {min: 0, max: 100000}
    const outgoing_links = req.query.outgoing_links ? JSON.parse(req.query.outgoing_links) : {min: 0, max: 100000}
    let query = `SELECT cl.* FROM "class" as cl
        left join vocabulary_metrics as vm
        on vm.name = cl.vocabulary_name and vm.version = cl.vocabulary_version_number
        inner join vocabulary_external_metrics as vem
        on vm.name = vem.vocabulary_name
        where vm.name in (
            SELECT name FROM vocabulary_metrics
            GROUP BY name
            HAVING count(*)>=${min_version} and count(*)<=${max_version}
        )
        and vem.incoming_links>=${incoming_links.min} and vem.incoming_links<=${incoming_links.max}
        and vem.incoming_links>=${outgoing_links.min} and vem.incoming_links<=${outgoing_links.max}
        order by vm.name, vm.version_name`;
    client.query(query, (err, res1) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({ classes: res1.rows })
    });
})


app.get('/vocabularies', async (req, res) => {
    const min_version = req.query.min_version || 1
    const max_version = req.query.max_version || 10000
    const incoming_links = req.query.incoming_links ? JSON.parse(req.query.incoming_links) : {min: 0, max: 100000}
    const outgoing_links = req.query.outgoing_links ? JSON.parse(req.query.outgoing_links) : {min: 0, max: 100000}
    let query = `select * from vocabulary_metrics as vm
        inner join vocabulary_external_metrics as vem
        on vm.name = vem.vocabulary_name
        where vm.name in (
            SELECT name FROM vocabulary_metrics
            GROUP BY name
            HAVING count(*)>=${min_version} and count(*)<=${max_version}
        ) 
        and vem.incoming_links>=${incoming_links.min} and vem.incoming_links<=${incoming_links.max}
        and vem.incoming_links>=${outgoing_links.min} and vem.incoming_links<=${outgoing_links.max}
        order by vm.name, vm.version_name`;
    client.query(query, (err, res1) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({ vocabularies: res1.rows })
    });
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))