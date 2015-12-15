# rems
rems web application

##config mongodb
1. install mongodb-win32-x86_64-2008plus-ssl-3.0.7-signed.msi
2. mkdir c:\Users\Roy\Documents\long\mongo\
3. cd c:\Program Files\MongoDB\Server\3.0\bin\ then run mongod.exe --dbpath c:\Users\Roy\Documents\long\mongo\
4. config mongodb path in envir path
5. cmd then mongo
and mongo command
```
3.创建数据库：use nodedb
3.创建用户：use admin
db.createUser(
 {
   user: "rems",
   pwd: "123456",
   roles: [
      { role: "readWrite", db: "nodedb" }
   ]
 }
)
```
[mongodb ref link](https://docs.mongodb.org/manual/reference/configuration-options/)
6. rerun node app.js


##报表配置：
安装 npm install highcharts-exporter
php环境；


