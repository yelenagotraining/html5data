const demo = {

    load: async () => {
        try {
            const response = await fetch('/big-file.txt');
            const data = await response.text();
            localStorage.setItem('big-file', data);
        } catch(e) {
            console.log(e);
            const el = document.querySelector('#result');
            let error = JSON.stringify(e, null, 2);
            error = error.replace(/\\n\s* at/g, ' Location:');
            el.innerText = error;
            hljs.highlightBlock(el);
        }
    }
};

window.addEventListener('DOMContentLoaded', demo.load);