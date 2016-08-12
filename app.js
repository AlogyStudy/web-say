
var express = require('express');
var	session = require('express-session');


var app = express();

// 路由控制器
var router = require('./controller/router');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// 模板引擎
app.set('view engine', 'ejs');

// 静态文件
app.use(express.static('./public'));


// 路由表
app.get('/', router.showIndex);

// 注册
app.get('/regist', router.showRegist);

app.post('/doregist', router.doRegist);

// 登陆
app.get('/login', router.showLogin);

app.post('/dologin', router.doLogin);

app.listen(3000);

console.log('3000端口启动成功');
