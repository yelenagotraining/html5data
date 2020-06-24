const demo = {

    $result: null,

    worker: null,

    initWorker: () => {
        if(demo.worker === null) {
            demo.worker = new Worker('index.worker.js');
            demo.worker.onerror = (error) => console.log(error);
        }
    },

    highlight: async (e) => {
        try {
            const el = e.currentTarget;
            const spinner = el.querySelector('.spinner');
            const response = await fetch('messages.js');
            const data = await response.text();
            const code = '// From page\n' + data;

            demo.$result.innerHTML = '';
            spinner.classList.toggle('none');
            demo.$result.innerHTML = code;
            hljs.highlightBlock(demo.$result);
            spinner.classList.toggle('none');
            
        } catch(e) {
            console.log(e);
        }
    },

    highlightWithWorker: async (e) => {
        try {
            console.clear();
            demo.initWorker();

            const el = e.currentTarget;
            const spinner = el.querySelector('.spinner');
            const buttons = document.querySelectorAll('.worker-button');

            demo.$result.innerHTML = '';
            spinner.classList.toggle('none');

            buttons.forEach(btn => btn.classList.remove('invisible'));

            demo.worker.onmessage = (workerEvent) => {

                const result = workerEvent.data;

                if(result.markup) {
                    console.log('setting innerHTML: start');
                    demo.$result.innerHTML = result.markup;
                    console.log('setting innerHTML: end');
                    spinner.classList.toggle('none');
                }

                if(result.message) {
                    console.log(result.message);

                    if(/done/i.test(result.message)) {
                        buttons.forEach(btn => btn.classList.add('invisible'));
                    }
                }
            };

            demo.worker.postMessage({ command: 'highlight' });

        } catch(error) {
            console.log('Error', error);
        }
    },

    terminate: () => {
        console.log('Terminating web worker');
        demo.worker.terminate();
        demo.worker = null;
        console.log('Web worker terminated');

        document.querySelector('#worker-spinner').classList.add('none');
        document.querySelectorAll('.worker-button').forEach(btn => btn.classList.add('invisible'));
    },

    load: () => {
        demo.$result = document.querySelector('#result');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);
