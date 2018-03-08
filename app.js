var express = require('express');
var app = express();

var router = require('./controller/router.js');

app.set('view engine','ejs');
app.use('/static',express.static('./public'));

app.get('/',router.showIndex);

app.listen(8000);