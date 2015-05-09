/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs') ;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('ejs',ejs.__express) ;
app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('keyboard cat'));//'keyboard cat’是用来加密cookie的密钥
app.use(express.session());//添加session功能
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user/add',user.add);//新增页面
app.post('/user/add',user.doAdd);//新增用户
app.get('/user/login',user.login);//登录页面
app.post('/user/login',user.doLogin);//用户登录
app.get('/user/logout',user.doLogout);//用户注销
app.get('/user/list',user.list);//用户列表
app.get('/user/delete/:_id',user.delete);//删除用户
app.get('/user/update/:_id',user.update);//修改页面
app.post('/user/update',user.doUpdate);//修改用户
app.get('/user/input',user.input);//增加微博页面
app.post('/user/input',user.doInput);//增加微博
app.get('/user/more',user.more);//首页上more按钮

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
