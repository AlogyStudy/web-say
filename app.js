
const express = require('express');
const	session = require('express-session');

const app = express();

// 路由控制器
const router = require('./controller/router');

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
// 静态化头像文件夹
app.use('/avatar',express.static('./avatar'));

// 路由表
app.get('/', router.showIndex);

// 注册
app.get('/regist', router.showRegist);
app.post('/doregist', router.doRegist);

// 登陆
app.get('/login', router.showLogin);
app.post('/dologin', router.doLogin);

// 上传头像
app.get('/setavatar', router.showsetAvartar); 
app.post('/dosetavatar', router.dosetavatar); 
app.get('/cutpic', router.showcutpic);
app.get('/docutpic', router.docutpic);

app.listen(8088);

console.log('8088端口启动成功');