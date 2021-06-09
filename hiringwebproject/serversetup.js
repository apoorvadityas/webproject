const http = require('http') 
const fs= require('fs')









const server = http.createServer((req, res) => {
 console.log(req.url , req.method);
 res.setHeader('Content-Type', 'text/HTML');
 let path ='C:/Users/apoor/hiringwebproject/'
 switch (req.url) {
     case '/' : 
     path += 'index.html';
     res.statusCode=200;
     break;
     case '/Aboutus' : 
     path += 'Aboutus.html';
     res.statusCode=200;
     break;
     case '/loginpage' : 
     path += 'loginpage.html';
     res.statusCode=200;
     break;

 }
 
 fs.readFile(path,(err, data) => {    
    if (err) {
        console.log(err);
        res.end();
    }
    else {
        res.write(data);
        res.end();

    }
});

 });

 server.listen(3000,'localhost', () => {
     console.log('listening on port 3000');
 });