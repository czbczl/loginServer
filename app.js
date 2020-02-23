const express = require('express')
const app = express()
app.get('/', function (ref, res) {
    res.send('hello node')
})
const server = app.listen(5000, function () {
    const { address, port } = server.address()
    console.log('Http启动成功：http://%s:%s', address, port)
})