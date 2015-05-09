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
app.use(express.cookieParser('keyboard cat'));//'keyboard cat������������cookie����Կ
app.use(express.session());//���session����
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user/add',user.add);//����ҳ��
app.post('/user/add',user.doAdd);//�����û�
app.get('/user/login',user.login);//��¼ҳ��
app.post('/user/login',user.doLogin);//�û���¼
app.get('/user/logout',user.doLogout);//�û�ע��
app.get('/user/list',user.list);//�û��б�
app.get('/user/delete/:_id',user.delete);//ɾ���û�
app.get('/user/update/:_id',user.update);//�޸�ҳ��
app.post('/user/update',user.doUpdate);//�޸��û�
app.get('/user/input',user.input);//����΢��ҳ��
app.post('/user/input',user.doInput);//����΢��
app.get('/user/more',user.more);//��ҳ��more��ť

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
