var process = require('child_process');
var express = require('express');
var multer  = require('multer');
var request = require('request');
var fs = require('fs');
var upload = multer({ dest: './data/upload/' });
//自己实际路径
//var shellDir = "/Users/lvwei/Develop/github/rems/shell/";
//var uploadDir = "/Users/lvwei/Develop/github/rems/data/upload/";
 var shellDir = 'C:/dev/rems/shell';
 var uploadDir = 'C:/dev/rems/data/upload/';
var router = express.Router();
var nhe = require('node-highcharts-exporter');
var rmdir   = require('rimraf');

// //直接调用命令
//     exports.createDir = function (){
//         process.exec('php -v',
//           function (error, stdout, stderr) {
//             if (error !== null) {
//               console.log('exec error: ' + error);
//             }else{
//                 console.log(stdout);
//             }
//         });
//     }


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/home', function(req, res) {
    authentication(req, res);
    res.render('home', { title: 'Home', user: req.session.user });
});
router.get('/home2', function(req, res) {
    res.render('home2', { title: 'Home' });
});
router.get('/nxjc', function(req, res) {
    res.render('nxjc', { title: 'Home' });
});
router.get('/gyjc', function(req, res) {
    res.render('gyt', { title: 'Home' });
});
router.get('/xmgl', function(req, res) {
    
    req.session.projectid = req.query.projectid ;
    req.session.title = req.query.title;
    res.render('xmgl', { title: 'Home', projectid: req.session.projectid, projectTitle: req.session.title });
});
//戴敏
router.get('/xmgl-dm', function(req, res) {
    
    req.session.projectid = req.query.projectid ;
    req.session.title = req.query.title;
    res.render('xmgl-dm', { title: 'Home', projectid: req.session.projectid, projectTitle: req.session.title });
});
router.get('/sjjc', function(req, res) {
    res.render('sjjc', { title: 'Home' });
});
////黄忠修改
//router.get('/sjjc', function (req, res) {

    //request.post({
        //url: remoteApiHost + '/rems/clzMng/list.json',
        //form: {
            //userKey: req.session.user.token,
        //}
    //}, function (error, response, body) {
        //var list = JSON.parse(body).status.data.classList;
        ////res.send(body);
        //res.render('sjjc', { title: 'Home', classList: list, projectid: req.session.projectid });
        ////res.render('sjjc', { title: 'Home', deviceClasses: body });
        ////res.render('sjjc', { title: 'Home'});
        
    //});

    ////res.render('sjjc', { title: 'Home', projectid: 'helloworld' });                    
//});
router.get('/cbfx', function(req, res) {
    res.render('cbfx', { title: 'Home' });
});
router.get('/nxfx', function(req, res) {
    res.render('nxfx', { title: 'Home' });
});
router.get('/nxfx2', function(req, res) {
    res.render('nxfx2', { title: 'Home' });
});
router.get('/zbfx', function(req, res) {
    res.render('zbfx', { title: 'Home' });
});
router.get('/nxfx3', function(req, res) {
    res.render('nxfx3', { title: 'Home' });
});
router.get('/zdzn', function(req, res) {
    res.render('zdzn', { title: 'Home' });
});
router.get('/yyzd', function(req, res) {
    res.render('yyzd', { title: 'Home' });
});
router.get('/zdbg', function(req, res) {
    res.render('zdbg', { title: 'Home' });
});
router.get('/bgbj', function(req, res) {
    res.render('bgbj', { title: 'Home' });
});

router.get('/tbhb', function(req, res) {
    res.render('tbhb', { title: 'Home' });
});
router.get('/fxjl', function(req, res) {
    res.render('fxjl', { title: 'Home' });
});

router.get('/bb', function(req, res) {
    res.render('bb', { title: 'Home' });
});
router.get('/forgotten', function(req, res) {
    res.render('forgotten', { title: 'Home' });
});
router.get('/lsxgl', function(req, res) {
    res.render('lsxgl', { title: 'Home' });
});
router.get('/bzlgl', function(req, res) {
    res.render('bzlgl', { title: 'Home' });
});
router.get('/qxgl', function(req, res) {
    res.render('qxgl', { title: 'Home' });
});
router.get('/jgfx', function(req, res) {
    res.render('jgfx', { title: 'Home' });
});
router.get('/hnfx', function(req, res) {
    res.render('hnfx', { title: 'Home' });
});
router.get('/gnfx', function(req, res) {
    res.render('gnfx', { title: 'Home' });
});
router.get('/sbssgl', function(req, res) {
    res.render('sbssgl', { title: 'Home' });
});
router.get('/rzgl', function(req, res) {
    res.render('rzgl', { title: 'Home' });
});
router.get('/yhgl', function(req, res) {
    res.render('yhgl', { title: 'Home' });
});
router.get('/sfgl', function(req, res) {
    res.render('sfgl', { title: 'Home' });
});
router.get('/xmxxgl', function(req, res) {
    res.render('xmxxgl', { title: 'Home' });
});
router.get('/mkfx', function(req, res) {
    res.render('mkfx', { title: 'Home' });
});
router.get('/jzfx', function(req, res) {
    res.render('jzfx', { title: 'Home' });
});
router.get('/gysxpz', function(req, res) {
    res.render('gysxpz', { title: 'Home' });
});
router.get('/zdybbpz', function(req, res) {
    res.render('zdybbpz', { title: 'Home' });
});
router.get('/mksjpz', function(req, res) {
    res.render('mksjpz', { title: 'Home' });
});
router.get('/rhpz', function(req, res) {
    res.render('rhpz', { title: 'Home' });
});
router.get('/tygjpz', function(req, res) {
    res.render('tygjpz', { title: 'Home' });
});

router.get('/test', function(req, res) {

   process.exec('C:/dev/rems/shell/excel.php','php',
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
            }else{
                console.log(stdout);
                res.send(stdout);
            }
        });
});


router.post('/export', function(req, res) {
    request.post({
        url: 'http://localhost:8000/excel.php',
        form: {
            uploadDir: uploadDir,
            reportName: req.body.fileName
        }
    }, function(error, response, body) {
        res.send(body);
    })

    // process.exec('php '+shellDir+'\\excel.php ' + uploadDir + " " + req.body.fileName,
    //       function (error, stdout, stderr) {
    //         if (error !== null) {
    //           console.log('exec error: ' + error);
    //         }else{
    //             console.log(stdout);
    //             res.send(stdout);
    //         }
    //     });


     // process.exec('php excel.php',
     //      function (error, stdout, stderr) {
     //        if (error !== null) {
     //          console.log('exec error: ' + error);
     //        }else{
     //            console.log(stdout);
     //            res.send(stdout);
     //        }
     //    });
    
});



router.post('/upload', upload.single('xlsx'), function (req, res, next) {
 
    var tmp_path = req.file.path;
    // 指定文件上传后的目录 - 示例为"images"目录。 
    var target_path = req.file.destination;
    var file_name = req.file.originalname;
    // 移动文件
    console.log(req.file);
    fs.rename(tmp_path, 'data/upload/'+file_name, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
        if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.file.size + ' bytes');
        });
    });  
})


router.post('/exportChartPic', upload.single('png'), function(req, res) {
    // var highchartsExportRequest = req.body;
    // console.log(highchartsExportRequest.type);

    

    // // Set a custom directory to export charts to
    var customExportPath = require('path').dirname(require.main.filename) + '/exported_charts';
    nhe.config.set('processingDir', customExportPath);

    // Assume this is executed inside the POST handler for a server 
    // running on http://localhost:3000/export 
    var highchartsExportRequest = req.body;
    
    nhe.exportChart(highchartsExportRequest, function(error, exportedChartInfo){
        if(error){ // Send an error response
            res.send(error);
        }
        else{ // Send the file back to client
            console.log(exportedChartInfo.filePath);
            res.download(exportedChartInfo.filePath, function(){
                // Optional, remove the directory used for intermediate
                // exporting steps
                //rmdir(exportedChartInfo.parentDir, function(err){});
            });
        }
    });
    
});




function authentication(req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
}

module.exports = router;
