const express = require('express')
const users = express("./routes/api/users.js")
let AppConfig = require('./appConfig.js')
const pgClient = require('./config/db');
var port = AppConfig.serverPort;
var hostname = AppConfig.serverIP;
var bodyParse = require('body-parser')
const app = express();
// app.get('/test', function (req, res) {
//     pgClient().then(response => {
//         res.json(response);
//     })
// })
// app.get("/", (req, res) => {
//     res.send("hello word!")

// })
// 使用routes
app.use("/api/users", users);

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
//使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());


app.get('/', function (req, res) {
    //sql语句（查询）
    let sql_qur = 'select * from "public"."p_user"';
    //数据库查询query(sql,callback)
    pgClient.query(sql_qur, function (error, result, fields) {
        if (error) {
            console.log(error)
        }
        //将数据库读取的数据转成JSON格式
        res_send = JSON.stringify(result.rows);
        //将J数据发送到8088端口的服务器
        res.send(res_send)
        //数据读取完了，就把数据库连接关了，也可以release掉（因为我用的是数据池）。
    })
})


app.post('/login', function (req, res) {
    //获取登录名称和密码
    const { username, password } = req.body;
    // console.log(username)
    // console.log(password)
    // where user ="${username}" and password = "${password}"   where user = '${username}'  and password = ''${password}''
    let sql_qur = `select * from "public"."p_user" where  username = '${username}' and password = '${password}' `
    // let sql_qur = 'select * from "public"."login_user"';
    //数据库查询query(sql,callback)
    pgClient.query(sql_qur, function (error, result, fields) {
        if (error || result.rows == "") {
            res.status(200).send(
                "0"
            );
            console.log(error)
        }
        else {
            // console.log(result.rows)
            res.status(200).send(
                "sts"
            );
        }
        // //将数据库读取的数据转成JSON格式S
        // // res_send = JSON.stringify(result.rows);
        // //将J数据发送到8088端口的服务器
        // res.send()
        // //数据读取完了，就把数据库连接关了，也可以release掉（因为我用的是数据池）。
        // pgClient.end(result);
    })
    //向前台反馈信息
    // if (username == users) {
    //     res.status(200).send(
    //         "sts"
    //     );
    // }
    // else {
    //     res.status(200).send(
    //         "0"
    //     );
    // }
});
