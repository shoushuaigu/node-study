
var MongoClient = require('mongodb').MongoClient;
// 链接数据库
function _connectDB(dbname,callback) {
    var DB_CONN_STR = 'mongodb://localhost:27017/'+dbname;
    MongoClient.connect(DB_CONN_STR,function(err,db) {
        if(err){ res.send('数据库链接失败');return };
        callback(err,db);
    })
}

// 增
exports.insert = function(dbname,collectionname,data,callback) {
    var data = data;
    var collectionname = collectionname;
    _connectDB(dbname,function(err,db) {
        var collection = db.collection(collectionname);
        collection.insertOne(data,function(err,result) {
            if(err){ res.send('添加数据失败');return};
            callback(err,result);
            db.close();
        })
    })
}


// 删
exports.delete = function (dbname, collectionname, data, callback) {
    var data = data;
    var collectionname = collectionname;
    _connectDB(dbname,function(err,db) {
        var collection = db.collection(collectionname);
        collection.deleteMany(data,function(err,result) {
            if(err){ res.send('添加数据失败');return};
            callback(err,result);
            db.close();
        })
    })
}

// 改
exports.update = function (dbname, collectionname, data1,data2, callback) {
    var data = data;
    var collectionname = collectionname;
    _connectDB(dbname, function (err, db) {
        var collection = db.collection(collectionname);
        collection.updateMany(data1,data2, function (err, result) {
            if (err) {
                res.send('添加数据失败');
                return
            };
            callback(err, result);
            db.close();
        })
    })
}


// 查
exports.find = function (dbname, collectionname, data, callback) {
    var data = data;
    var collectionname = collectionname;
    var resultArr = [];
    _connectDB(dbname, function (err, db) {
        var collection = db.collection(collectionname);
        var cursor = collection.find(data);
        console.log(cursor);
        cursor.each(function (err, doc) {
            if (err) {
                res.send('添加数据失败');
                return
            };
            if(doc != null){
                resultArr.push(doc);
            }else{
                callback(null, resultArr);
                db.close();
            }
            
        })
    })
}
