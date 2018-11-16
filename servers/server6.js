const express = require('express');
const fs = require('fs');
var formidable = require("formidable");
const multer = require('multer'); //解析Post文件

const app = express();

var objMulter = multer({dest:'./public/upload', filename: 'aaa'}); //用户上传文件存入dest目录下
app.use(objMulter.any());

app.get(['/', '/hello'], (req, res, next) => {
    var form = fs.readFileSync('./template/hello.html', {encoding: 'utf8'});
    res.send(form);
});

app.post('/form', objMulter.single('file'), (req, res, next) => {
    console.log(req.files[0])
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {  
        // console.log('***fields***',fields);//表单传递的input数据  
        // console.log('***files***',files);//上传文件数据   
        fs.writeFile('./message.json', files, function(err){
            if(err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });
    });  
})

app.listen(3109, () => {
    console.log('正在监听端口3109,http://localhost:3109'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
})

