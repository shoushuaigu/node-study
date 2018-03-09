var files = require('../models/files.js');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: './uploads'});

exports.showIndex = function(req,res) {
    files.getwjj(function(lists) {
        res.render('index',{"title":"首页","lists":lists});
    })
    
};
exports.getInfo = function(req,res) {
    var wjjname = req.params.wjj;
    files.getimages(wjjname,function(images) {
        res.render('info',{"title":wjjname,"images":images});
    })
};

exports.getUp = function(req,res) {
    files.getwjj(function(lists) {
        res.render('up',{"title":"上传","wjj":lists});
    })
};
exports.postUp = {
    "upload":upload.single('img'),
    "post":function(req,res,next) {
        if(!req.file){next();return;}
        var where = req.body.where;
        var extname = path.extname(req.file.originalname);
        var oldpath = req.file.path;
        var newpath = './uploads/'+where+'/'+(new Date().getTime())+extname;
        fs.rename(oldpath,newpath,function(err) {
            if(err){throw Error('改名失败');return;}
            res.send('成功');
        })
    }
}