/**
 * Created by Administrator on 2014/10/25.
 */
var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;	// 创建模式
var UserSchema = new Schema({
    _id:Schema.Types.ObjectId,
    name : String ,
    password : String,
    post_date:{type:Date,default:Date.now}
}) ;	// 定义了一个新的模式，但是此模式还未和users集合有关联
exports.User = mongoose.model('User',UserSchema) ;	// 与Users表关联