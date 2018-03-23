var files = require('../models/files.js');
var MongoFN = require('../models/db.js');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var crypto = require('crypto');

function md5(data) {
    var md5 = crypto.createHash('md5');
    var pwd = md5.update(data).digest('base64');
    return pwd;
}


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
    var timer = req.body.timer;
    MongoFN.find('test','leaveWord',{},function(err,resultArr,obj) {
        if(err) return;
        var resultArr = resultArr;
        var id =0;
        console.log('====================================');
        console.log(resultArr.length);
        console.log('====================================');
        if(resultArr.length){
            id = resultArr[0].id+1
        }
        
        MongoFN.insert('test','leaveWord',{'id':id,'text':msg,"timer":timer},function(err,result) {
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
    var page = req.query.page;
    var shownum = 4;
    // if(req.cookies.name){
        // console.log('====================================');
        // console.log(req.cookies.name);
        // console.log('====================================');
    // }
    // res.cookie('name', 'gss', { expires: new Date(Date.now() + 900000), httpOnly: true });
    MongoFN.find('test','leaveWord',{},{"page":page,"shownum":shownum},function(err,resultArr,allnum) {
        if(err) return;
        // console.log(resultArr);
        res.json({"resultArr":resultArr,"allnum":allnum});
    })
}

// md5注册登陆
exports.md5in = function(req,res) {
    var data = req.body;
    MongoFN.find('test','userList',{'name':data.name},function(err,result) {
        if(err) return;
        console.log(result);
        if(result.length>0){
            res.send({'code':2});
            return;
        }
        var pwd = md5(md5(data.pwd).substr(10,20)+md5(data.pwd));
        data.pwd = pwd;
        MongoFN.insert('test','userList',data,function(err,result) {
            if(err) return;
            // console.log(result);
            res.cookie('logined', pwd, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.json({'code':1});
        })
    })
    
}
exports.md5up = function(req,res) {
    var data = req.body;
    
    var pwd = md5(md5(data.pwd).substr(10,20)+md5(data.pwd));
    data.pwd = pwd;
    console.log('====================================');
    console.log(data,'up');
    console.log('====================================');
    MongoFN.find('test','userList',data,function(err,result) {
        if(err) return;
        console.log(result);
        if(result.length == 1){
            res.cookie('logined', pwd, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send({'code':1});
            return;
        }
        res.send({'code':2});
    })
}
