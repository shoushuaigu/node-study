var files = require('../models/files.js');
var MongoFN = require('../models/db.js');
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
exports.postMsg = function(req,res) {
    var msg = req.body.message;
    MongoFN.find('test','leaveWord',{},function(err,resultArr) {
        if(err) return;
        var resultArr = resultArr;
        var id =0;
        console.log('====================================');
        console.log(resultArr.length);
        console.log('====================================');
        if(resultArr.length){
            id = resultArr[resultArr.length-1].id+1
        }
        
        MongoFN.insert('test','leaveWord',{'id':id,'text':msg},function(err,result) {
            if(err) return;
            // console.log(result);
            res.json({"code":1});
        })
    })
    
}

exports.insertData = function(req,res) {
    MongoFN.insert('test','leaveWord',{'id':'1','text':'我是一条测试留言'},function(err,result) {
        if(err) return;
        // console.log(result);
        res.send('添加成功');
    })
}

exports.delete = function(req,res) {
    MongoFN.delete('test','test',{'name':'-----'},function(err,result) {
        if(err) return;
        // console.log(result);
        res.send('删除成功');
    })
}

exports.change = function(req,res) {
    MongoFN.update('test','test',{'user':'gss'},{$set:{'user':'改'}},function(err,result) {
        if(err) return;
        // console.log(result);
        res.send('修改成功');
    })
}

exports.find = function(req,res) {
    MongoFN.find('test','leaveWord',{},function(err,resultArr) {
        if(err) return;
        // console.log(resultArr);
        res.json(resultArr);
    })
}
