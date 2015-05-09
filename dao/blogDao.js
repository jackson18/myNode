/**
 * Created by Administrator on 2014/10/25.
 */
var util = require('util');
var blogModel = require('../model/blog') ;
var Blog = blogModel.Blog ;	// 使用Blog模型，对应的Blog表


exports.add = function(username,content,callback) {
    Blog.count({},function(err,count){
        if(err){
            console.log(err);
        }else{
            var newBlog = new Blog();
            newBlog.username = username;
            newBlog.content = content;
            newBlog.save(function(err){
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

exports.allBlogs = function(callback) {
    Blog.find({}, callback);
}



