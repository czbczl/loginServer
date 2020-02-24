const express = require('express')
const app = express()
let AppConfig = require('./appConfig.js')
const { connectPg } = require('./config/db');
var port = AppConfig.serverPort;
var hostname = AppConfig.serverIP;
app.get('/test', function (req, res) {
    connectPg().then(response => {
        res.json(response);
    })
})
const server = app.listen(port, hostname, function () {
    const { address, port } = server.address()
    console.log(`Server running at http://${hostname}:${port}/`);
})
app.use('/upload/', express.static('./upload/'))
app.use('/static/', express.static('./static/'))
app.disable('etag');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});