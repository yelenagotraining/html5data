const demo = {

    $ticker: null,
    socket: null,

    start: () => demo.socket.send('start'),
    stop: () => demo.socket.send('stop'),
    close: () => demo.socket.close(),

    messageHandler: message => {
        const stock = JSON.parse(message.data);
        const className = stock.direction === '+' ? 'is-up' : 'is-down';
        demo.$ticker.innerHTML += `<tr>
            <td>${stock.symbol}</td> 
            <td>${stock.price}</td>
            <td class="${className}">${stock.direction}${stock.change}</td>
        </tr>`;
    },

    load: () => {
        demo.$ticker = document.querySelector('#ticker');
        
        demo.socket = new WebSocket('ws://127.0.0.1:8181');

        demo.socket.onmessage = demo.messageHandler;
        demo.socket.onopen = () => console.log('Connection opened');
        demo.socket.onclose = () => console.log('Connection closed');
        demo.socket.onerror = error => console.log('Error:', error);
    }
};

window.addEventListener('DOMContentLoaded', demo.load);
