
var formidable = require('formidable');
var db = require('../models/db.js');
var md5 = require('../models/md5.js');

//var Q = require('Q');

// 显示首页
exports.showIndex = function ( req, res, next ) {
	
	res.render('index', {
		"login": req.session.login == '1' ? true : false, 
		"username": req.session.login == '1' ? req.session.username : '' 
	});
	
}

// 注册页面
exports.showRegist = function ( req, res, next ) {
	
	res.render('regist');
	
}


// 注册业务
exports.doRegist = function ( req, res, next ) {
	
	// 得到用于填写信息
	var form = new formidable.IncomingForm();
	
  form.parse(req, function(err, fields, files) {
  	
  	if ( err ) {
  		res.json({'err': '-2', 'info': '信息填写错误'});
  	}
  	
  	// 得到表单
//		var deferred = Q.defer();
		
  	var username = fields.username;
		var emial = fields.emial;
  	var password = md5( md5(fields.password) + 'alogy' ); // 处理加密后的密码
		
		// 查询数据库
		db.find('users', {"username": username}, function ( err, reslut ) {
			
			if ( err ) {
				res.send('-3'); // 服务器错误
				return ;
			}


			// 没有就该信息就写入，返回成功 1，如果有就返回-1
			if ( reslut.length != 0 ) {
				res.send('-1'); // 用户名被占用
				return ;
			}
			
			// 用户名没有被占用
			db.insertOne('users', {
				'username': username, 
				'password': password, 
				'emial': emial,
				'avatar': 'moren.jpg'
			}, function ( err, relsut ) {
				
				if ( err ) {
					res.send('-3'); // 服务器错误
					return ;
				}
				
				// 设置session 值
				req.session.login = '1'; // session
				req.session.username = username;
				
				res.send('1'); // 插入成功   		// 写入session
				
			});
			
		});
  	
  });
	
}

// 显示 登陆
exports.showLogin = function ( req, res, next ) {
	
	res.render('login');
	
}


// 登陆业务
exports.doLogin = function ( req, res, next ) {
	
//		得到用户表单	
		// 得到用于填写信息
	var form = new formidable.IncomingForm();
	
  form.parse(req, function(err, fields, files) {
  	
  	var username = fields.username;
  	var password = fields.password;
  	var jiamihouMiMa = md5( md5(fields.password) + 'alogy' );
		  	
		// 查询数据库，是否有存在当前用户名
		// 有用户名， 再匹配密码
		
		db.find("users",{"username": username}, function ( err, resluts ) {
			
			if ( err ) {
				res.send('-5'); // 服务器错误
				return ;
			}
			
			
			if ( resluts.length == 0 ) {
				
				res.send('-1'); // 用户名不存在
				return ;
				
			}
			
			// 匹配密码
			if ( jiamihouMiMa == resluts[0].password ) {
				
				req.session.login = '1';
				req.session.username = username;
				
				res.send('1'); // 登陆成功
				return ;
				
			} else {
				
				res.send('-2'); // 密码错误
				return ;
				
			}
			
		});
		
  });
	
}

