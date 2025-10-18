const fs = require('fs');
const express = require("express");
const app = express();

const LOG_FILEPATH = __dirname + '/public/log.txt';

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.post('/log', (req, res) => {
    let date = new Date();
    let datetime = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    let logString = `\n${datetime} : ${req.body.data}`;

    fs.appendFile(LOG_FILEPATH, logString, null, (err) => {
        res.send('done');
    });
    
});

app.listen(3000);
console.log('server is running');
