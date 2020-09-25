var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var messages=require('./errorMessage');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//handle invalid JSON body
app.use((err,req,res,next)=>{
    if (err instanceof SyntaxError && err.status === 400 && 'body'){
        res.status(400);
        res.json(messages.invalidJsonData)
        
        return
        
    }
    next()
})
app.use('/', indexRouter);


module.exports = app;
