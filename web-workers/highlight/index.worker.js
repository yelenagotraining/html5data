importScripts('/scripts/highlightjs/highlight.pack.js');

const worker = {

    message: async (e) => {
        try {
            
            postMessage({ message: 'starting' });
    
            const response = await fetch('messages.js');
            const data = await response.text();
            
            postMessage({ message: 'data loaded' });
            
            const code = '// From worker\n' + data;
            const result = self.hljs.highlightAuto(code);

            setTimeout(() => {
                postMessage({ 
                    message: 'done', 
                    markup: result.value 
                });
            }, 3000);
            
        } catch(ex) {
            postMessage({ type: 'error', message: ex });
        }
    }
};

addEventListener('message', worker.message);
