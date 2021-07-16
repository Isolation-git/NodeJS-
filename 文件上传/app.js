const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var app = express();
//指定上传文件保存的路径
var objMulter = multer({dest:"."});
app.use(objMulter.any());
app.post('/',function(req,res){
  console.log(req.files);
  var fi = req.files[0];
  var originalname = fi.originalname;
   var newName = fi.path+path.parse(originalname).ext;
   fs.rename(fi.path,newName,function(err){
     if(err){
       res.send("上传失败");
     }else{
        res.send("上传成功");
     }
   });
});
app.listen(3000, function () {
    console.log("服务器已经启动!");
});