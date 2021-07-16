const ws = require('nodejs-websocket')
const PORT = 3000
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MES = 2

// 记录当前用户数量
let count = 0;
var sever = ws.createServer(connect => {
    console.log('有用户连接成功！');
    count++;
    connect.userName = `用户${count}`;
    broadcast({
        type: TYPE_ENTER,
        mes: `${connect.userName}进入了聊天室`,
        time:new Date().toLocaleTimeString()
    });
    // 每当接受到用户传递的数据，text事件就会触发
    connect.on('text', data => {
        broadcast({
            type: TYPE_MES,
            mes: data,
            uName:connect.userName,
            time: new Date().toLocaleTimeString(),
        });
    })
    // 只要websocket连接断开，close事件触发
    connect.on('close', () => {
        console.log('连接已断开');
        broadcast({
            type: TYPE_LEAVE,
            mes: `${connect.userName}离开了聊天室`,
            time: new Date().toLocaleTimeString(),
        });
        count--;
    })
    connect.on('error', err => {
        // console.log(err);
        console.log('发生异常');
    })
})

function broadcast(message) {
    // sever.connections表示所有用户
    sever.connections.forEach(item => {
        item.send(JSON.stringify(message));
    })
}  

sever.listen(PORT, () => {
    console.log('WebSocket服务启动成功，'+PORT+'端口监听中...');
})