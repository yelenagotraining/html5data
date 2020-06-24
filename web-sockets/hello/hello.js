const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', ws => {

    ws.on('message', message => {
        console.log(`Received: ${message}`);
        ws.send(`Server: ${message}`);
    });

    setTimeout(() => {
        ws.send('Hi again! (after 3 seconds)');
    }, 3000);

});
