var express = require('express');
var app = express();

var router = require('./controller/router.js');

app.set('view engine','ejs');
app.use('/static',express.static('./public'));
app.use('/xc',express.static('./uploads'));

app.get('/',router.showIndex);
app.get('/xc/:wjj',router.getInfo);
app.get('/up',router.getUp);
app.post('/up', router.postUp.upload, router.postUp.post);

// 404
app.use(function(req,res) {
    res.render('err');
});

app.listen(8000);