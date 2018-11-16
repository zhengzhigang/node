const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3110 });

wss.on('connection', function connection(ws) {
    // let timer;
    // if (ws.readyState === 1) {
    //     let i = 0;
    //     console.log('***', '已连接')
    //     timer = setInterval(() => {
    //         i++;
    //         let a = {
    //             type: 'page_view',
    //             data: {
    //                 name: '郑智刚',
    //                 age: `${}`
    //             },
    //             error: `错误${i}`
    //         }
    //         console.log(i)
    //         ws.send(`${JSON.stringify(a)}`);
    //     }, 1000)
    // }
    ws.on('message', function incoming(message) {
        console.log(message)
        ws.send(`${message}`);
        // if (message) {
        // }
    });
    ws.on('close', function (code, reason) {
        console.log('关闭了', code, reason)
        clearTimeout(timer);
    })
});

console.log('正在监听：http://localhost:3110...')