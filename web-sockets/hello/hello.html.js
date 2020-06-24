const demo = {
    send: () => {
        const ws = new WebSocket('ws://127.0.0.1:8181');

        ws.onopen = event => {
            ws.send(`Hello from client! (${event.timeStamp})`);
        };

        ws.onmessage = message => {
            console.log(`Client: ${message.data}`);
        };

    },

    load: () => {
        
    }
};

window.addEventListener('DOMContentLoaded', demo.load)