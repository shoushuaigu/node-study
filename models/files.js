var fs = require('fs');

exports.getwjj = function(callback) {
    fs.readdir('./uploads',function(err,files) {
        var lists = [];
        (function itertor(i) {
            if(i == files.length){
                callback(lists);
                return;
            }
            fs.stat('./uploads/'+files[i],function(err,stats) {
                if(stats.isDirectory()){
                    lists.push(files[i]);
                }
                itertor(i+1);
            })
        })(0)

    })
};

exports.getimages = function(wjjname,callback) {
    console.log(wjjname);
    fs.readdir('./uploads/'+wjjname,function(err,files) {
        console.log(files);
        var images = [];

        (function itertor(i) {
            if(i == files.length){
                callback(images);
                return;
            }
            fs.stat('./uploads/'+wjjname+'/'+files[i],function(err,stats) {
                if(stats.isFile()){
                    images.push(files[i])
                }
                itertor(i+1)
            })
        })(0);
        
    })
};