var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var upload = multer({ dest: 'upload/' });

// 单图上传
app.post('/uploadImg', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    //获取详细信息
    var file = req.files.logo;//From the name
    console.log('文件类型：%s', file.type);
    console.log('原始文件名：%s', file.name);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
});
  
app.post('/upload', function(req, res, next){
    var file = req.file;
    console.log(file)

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ret_code: '0'});
});

app.get('/post', function(req, res, next){
    var form = fs.readFileSync('./template/post.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);