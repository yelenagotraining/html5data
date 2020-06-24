const stocks = require('./stocks');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', ws => {

    let id;

    ws.on('message', message => {       
        if (message === 'start') {
            id = setInterval(() => {
                const stock = stocks.getStock();
                ws.send(JSON.stringify(stock));
            }, 1500);
        } else {
            clearInterval(id);
        }
    });
});
