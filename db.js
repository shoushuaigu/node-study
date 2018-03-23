var express = require('express');
var app = express();
var router = require('./controller/router.js')

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use('/static/',express.static('./public'));



app.get('/',function(req,res) {
    if(req.cookies.logined){
        res.render('saysomthing');
        return;
    }
    res.render('login');
    
});

app.get('/login',function(req,res) {
    res.render('login');
});
app.get('/logup',function(req,res) {
    res.render('logup');
});

app.post('/login',router.md5in);
app.post('/logup',router.md5up);

app.post('/insertMsg', router.postMsg);

app.get('/insert',router.insertData);

app.get('/dele',router.delete);

app.get('/change',router.change);

app.get('/find',router.find);



app.use(function(req,res) {
    res.render('err')
})

app.listen(8000);