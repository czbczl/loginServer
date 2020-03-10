var pg = require('pg');
//构造连接数据库的连接字符串："tcp://用户名:密码@ip/相应的数据库名"   
//var conString = "tcp://postgres:123456@localhost/dihuan1206";
var conString = "tcp://postgres:123456@localhost/login";

var pgClient = new pg.Client(conString); //构造一个数据库对象   
var res_send;
//连接数据库，连接成功，执行回调函数   
pgClient.connect(function (error, results) {
    if (error) {
        console.log('ClientConnectionReady Error: ' + error.message);
        pgClient.end();
        return;
    }
    console.log("pgClient.connect OK.\n");
});


    //sql语句（查询）
    // let sql_qur = 'select * from "public"."login_user"';
    //数据库查询query(sql,callback)
    // pgClient.query(sql_qur, function (error, result, fields) {
    //     if (error) {
    //         console.log(error)
    //     }
    //     //将数据库读取的数据转成JSON格式
    //     res_send = JSON.stringify(result.rows);
    //     //将J数据发送到8088端口的服务器
    //     //数据读取完了，就把数据库连接关了，也可以release掉（因为我用的是数据池）。
    //     pgClient.end();
    //     console.log(result.rows)
    //     console.log(result.rows[0].user)
    // })
module.exports = pgClient;

// const pg = require('pg');

// function connectPg() {
//     return new Promise((resolve, reject) => {
//         const pgConfig = {
//             user: 'postgres',           // 数据库用户名
//             database: 'postgres',       // 数据库
//             password: '123456',       // 数据库密码
//             host: 'localhost',      // 数据库所在IP
//             port: '5432'                // 连接端口
//         };
//         const pool = new pg.Pool(pgConfig);
//         // pool.connect(function (error, client, done) {
//         //     if (error) {
//         //         reject(error);
//         //     }
//         //     let sqlStr = 'SELECT * FROM test';
//         //     client.query(sqlStr, [], function (err, response) {
//         //         done();
//         //         if (err) {
//         //             reject(err);
//         //         } else {
//         //             resolve(response.rows);

//         //         }
//         //     })

//         // })
//         poll.connect(function (error, results) {
//             if (error) {
//                 // console.log('ClientConnectionReady Error: ' + error.message);
//                 pgClient.end();
//                 return;
//             }
//             console.log("pgClient.connect OK.\n");
//         });
//     })
// }

// module.exports = {
//     connectPg
// }
