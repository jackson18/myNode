"use strict";

var db = require('../dao/userDao');
var blogDb = require('../dao/blogDao');
var userModel = require('../model/userinfo') ;
var User = userModel.User ;	// 使用User模型，对应的users表
var blogModel = require('../model/blog') ;
var Blog = blogModel.Blog ;	// 使用Blog模型，对应的blogs表


exports.add = function(req, res, next){
    res.render('user/add',{title:'用户注册'});
};

exports.doAdd = function (req, res, next) {
    var user = new User(req.body.user);
    if (!user.name) {
        return res.render('error.ejs', {message: '姓名是必须的'});
    }
    db.add(user.name,user.password, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/user/login');
    });
};

exports.login = function(req, res){
    res.render('login', { title: '用户登录' });
};

exports.doLogin = function(req, res){
    var query_doc = {name:req.body.name , password:req.body.password} ;
    User.count(query_doc,function(err,doc){
        if(doc == 0) {
            res.redirect("/user/login") ;
        } else {
            req.session.username = req.body.name;
            res.redirect("/user/input");
        }
    }) ;
};

exports.doLogout = function(req,res){
    req.session.username = "";
    res.redirect("/");
};

exports.list = function (req, res, next) {
    db.allUsers(function (err, users) {
        if (err) {
            return next(err);
        }
        res.render('user/list', {username: req.session.username,data: users});
    });
};

exports.delete = function(req,res){
    var id = req.params._id;
    db.delete(id, function (err) {
        if(err){
            res.send("delete occur error.");
        }else{
            res.redirect("/user/list");
        }
    });
};

exports.update = function(req, res, next){
    var id = req.params._id;
    db.findTodoById(id, function(err, doc){
        if(err){
            res.redirect("/user/list");
        }else{
            res.render('user/update', { title: '用户修改' , username: req.session.username, user:doc });
        }
    });
};

exports.doUpdate = function (req, res, next) {
    var user = new User(req.body.user);
    if (!user.name) {
        return res.render('error.ejs', {message: '姓名是必须的'});
    }
    db.edit(user._id,user.name,user.password, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect("/user/list");
    });
};

exports.input = function(req,res,next){
    blogDb.allBlogs(function (err, blogs) {
        if (err) {
            return next(err);
        }
        return res.render('user/input', {username: req.session.username,data: blogs});
    });
};

exports.doInput = function (req, res, next) {
    var blog = new Blog(req.body.blog);
    if (!blog.content) {
        return res.render('error.ejs', {message: '内容是必须的'});
    }
    blogDb.add(blog.username,blog.content, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/user/input');
    });
};

exports.more = function(req,res,next){
    var username = req.session.username;
    if(username){
        res.redirect("/user/input");
    }else{
        res.redirect("/user/login") ;
    }
};