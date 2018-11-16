var express = require('express');
var xlsx = require('node-xlsx');
var fs = require('fs');

var app = express();

var obj = xlsx.parse(__dirname+'/content.xlsx');//配置excel文件的路径
var excelObj=obj[0].data

console.log(excelObj)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("test").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});


app.listen(3000, () => {
    console.log('正在监听3000端口，http://localhost:3000');
})