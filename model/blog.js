/**
 * Created by Administrator on 2014/10/25.
 */
var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;	// 创建模式
var BlogSchema = new Schema({
    _id:Schema.Types.ObjectId,
    username:String,
    content : String ,
    post_date:{type:Date,default:Date.now}
}) ;	// 定义了一个新的模式，但是此模式还未和blogs集合有关联
exports.Blog = mongoose.model('Blog',BlogSchema) ;	// 与Blos表关联