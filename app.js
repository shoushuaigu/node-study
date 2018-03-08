var express = require('express');
var app = express();

var router = require('./controller/router.js');

app.set('view engine','ejs');
app.use('/static',express.static('./public'));

app.get('/',router.showIndex);


// 404
app.use(function(req,res) {
    res.render()
})

app.listen(8000);