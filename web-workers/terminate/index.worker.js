const worker = {

    message: (e) => {
        try{
            if(e.data.command === 'echo') {

                postMessage({ 
                    state: 'open',
                    message: `From worker: ${e.data.message}`
                });

            } else {

                setTimeout(() => {
                    postMessage({ state: 'done' });
                }, 3000);
                
            }
            
        } catch(ex) {
            postMessage({ type: 'error', message: ex });
        }
    }
};

addEventListener('message', worker.message);
