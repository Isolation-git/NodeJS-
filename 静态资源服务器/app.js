//运行app.js，通过访问localhost:3000来查看assets目录下的index.html首页文件
//也可通过localhost:3000/img1.png等方式来访问asset目录下的其他文件


const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const PORT=3000

var MIMEtype = {
    '.html': 'text/html',
    '.txt':'text/html',
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.js':'application/x-javascript'
}
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.method === "GET") {  
        handle(req, res);
    }
})
server.listen(PORT, () => { 
    console.log(PORT+'端口监听中');
})

function handle(req, res) {
    const pathObj = url.parse(req.url, true);
    var filePath = path.join(__dirname, '/assets' + pathObj.pathname);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            resolve(false);
        } else if (!stats.isFile()) {
            filePath = path.join(__dirname, '/assets/index.html');
            fs.readFile(filePath, (err, file) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, "not found");
                    res.end("<h1>404 NOT FOUND</h1>");
                } else {
                    res.writeHead(200, { "content-type": MIMEtype[path.extname(pathObj.pathname)]+';charset=utf-8' })
                    res.write(file);
                    res.end();
                }
            })
        } else {
            fs.readFile(filePath, (err, file) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, "not found");
                    res.end("<h1>404 NOT FOUND</h1>");
                } else {
                    res.writeHead(200, { "content-type": MIMEtype[path.extname(pathObj.pathname)]+';charset=utf-8' })
                    res.write(file);
                    res.end();
                }
            })
        }
    })
}