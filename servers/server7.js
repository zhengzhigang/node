var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './public/upload';
createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname);  
    }
});

var upload = multer({ storage: storage });

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./template/form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3110, () => {
    console.log('正在监听端口3110,http://localhost:3110'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
});
