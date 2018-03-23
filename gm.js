var express = require('express');
var app = express();
var fs = require('fs');
var gm = require('gm').subClass({imageMagick:true});



app.get('/',function(req,res) {
    gm('/uploads/j/1.png').resize(240,240).noProfile().write('/uploads/w/resize.png',function(err) {
        if(err) console.log(err); return;
        console.log('====================================');
        console.log('tupian');
        console.log('====================================');
    })
    res.send('启动');
})


app.listen(8000);