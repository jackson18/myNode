/**
 * Created by Administrator on 2014/10/25.
 */
var util = require('util');
var userModel = require('../model/userinfo') ;
var User = userModel.User ;	// 使用User模型，对应的users表

exports.add = function(name,password,callback) {
    User.count({},function(err,count){
        if(err){
            console.log(err);
        }else{
            var newUser = new User();
            newUser.name = name;
            newUser.password = password;
            newUser.save(function(err){
                if(err){
                    util.log("FATAL"+err);
                    callback(err);
                }else{
                    callback(null);
                }
            });
        }
    });
}

exports.delete = function(id, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err){
            callback(err);
        }else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}

exports.edit = function(id, name, password, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.post_date = new Date();
            doc.name = name;
            doc.password = password;
            doc.save(function(err) {
                if (err) {
                    util.log('FATAL '+ err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

exports.allUsers = function(callback) {
    User.find({}, callback);
}

exports.forAll = function(doEach, done) {
    User.find({}, function(err, docs) {
        if (err) {
            util.log('FATAL '+ err);
            done(err, null);
        }
        docs.forEach(function(doc) {
            doEach(null, doc);
        });
        done(null);
    });
}

var findTodoById = exports.findTodoById = function(id,callback){
    User.findOne({_id:id},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}


