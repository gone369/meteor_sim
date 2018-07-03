var config = require('./config/config.js');
var express= require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.resolve(__dirname,"build")));

var host = process.env.HOST || "127.0.0.1";
var port = process.env.PORT || 3000;
const url = 'http://'+host+":"+port;

var server = app.listen(port,host,function(){
  console.log("Application started at ===> "+url)
})

module.exports = app;


