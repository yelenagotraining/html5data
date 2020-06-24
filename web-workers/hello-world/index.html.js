const demo = {

    send: (e) => {
        const worker = new Worker('index.worker.js');
        worker.onerror = (error) => console.log(error);
        worker.onmessage = (messageEvent) => {
            console.log(messageEvent.data.message);
        };
        
        const message = document.querySelector('#input-box').value;
        worker.postMessage({ message: message });
    },

    load: () => {}
};

window.addEventListener('DOMContentLoaded', demo.load);
