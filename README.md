# node-express-study
##入门及小知识点，笔记，代码等
==
*1.node.js特点：单线程，非阻塞I/O,事件驱动 <br/>
*2.搭建服务器，简单路由，ejs模板，文件读取，get/post，基础api <br/>
>fs,path,...express <br/>
>formidable,multer:post提交和文件上传处理中间件
>>formidable:<a href="https://www.npmjs.com/package/formidable">npm<a/>
>>multer:[GitHub](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md#singlefieldname)<br/>
>>>multer教程：[封装](http://cnodejs.org/topic/564f32631986c7df7e92b0db)  [图片上传](http://blog.csdn.net/feng020a/article/details/60876970)

*3.封装数据库增删改查操作(db.js)<br/>
  >var MongoClient = require('mongodb').MongoClient; //"mongodb": "^2.2.33"
  >>先连数据库加回掉函数，callback中操作增删改查（insertOne,deleteMany,updataMany,.each循环数据库不为空的加到一个数组中返回。
  
*4.body-parser就收post请求，页面ajax访问接口，自定义id。
