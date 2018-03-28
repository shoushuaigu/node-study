
var fs = require('fs');
var gm = require('gm');

// gm('./1.png').resize(240, 240, '!') // 叹号表示强行转换240*240的正方形比例
// .write('./11.png',function(err) {
//     if(err) console.log(err); return;
//     console.log('====================================');
//     console.log('tupian');
//     console.log('====================================');
// })
gm('./1.png').crop(100,100,100,100) // 裁剪100*100 坐标起点（100，100）
.write('./12.png',function(err) {
    if(err) console.log(err); return;
    console.log('====================================');
    console.log('tupian');
    console.log('====================================');
})