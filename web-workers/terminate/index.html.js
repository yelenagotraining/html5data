const demo = {

    worker: null,

    initWorker: () => {
        if(demo.worker === null) {
            demo.worker = new Worker('index.worker.js');
            demo.worker.onerror = (error) => console.log(error);
        }
    },

    toggleWorkingControls: () => {
        document.querySelectorAll('.working').forEach(el => el.classList.toggle('invisible'));
    },

    start: (e) => {
        console.clear();

        demo.initWorker();
        demo.toggleWorkingControls();

        demo.worker.onmessage = (messageEvent) => {

            if(messageEvent.data.message) {
                console.log(messageEvent.data.message);
            }

            if(messageEvent.data.state === 'done') {
                demo.toggleWorkingControls();
            }
        };

        demo.worker.postMessage({ command: 'start' });
    },

    terminate: () => {
        console.log('Terminating web worker');
        demo.worker.terminate();
        demo.worker = null;
        console.log('Web worker terminated');

        demo.toggleWorkingControls();
    },

    load: () => {}
};

window.addEventListener('DOMContentLoaded', demo.load);
