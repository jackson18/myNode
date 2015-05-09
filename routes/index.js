/*
 * GET home page.
 */
var mongoose = require('mongoose') ;
var dburl = require("../config").db;//Êý¾Ý¿âµØÖ·
var options = {
    server: {
      auto_reconnect: true,
      poolSize: 10
    }
};

mongoose.connect(dburl, options, function(err, res) {
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + dburl + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + dburl);
  }
});


exports.index = function(req, res){
  res.render('index', { title: 'Express',username: req.session.username });
};

