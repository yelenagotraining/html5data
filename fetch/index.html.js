const demo = {

    $message: null,

    fetchHtml: async () => {
        try {
            const response = await fetch('data.html');
            const html = await response.text();

            demo.$message.innerHTML = html;
        } catch (e) {
            console.log(e);
        }
    },

    fetchJson: async () => {
        try {
            const response = await fetch('data.json');
            const json = await response.json();

            const message = JSON.stringify(json, null, 4)
                                    .replace(/\n/g, '<br>')
                                    .replace(/ /g, '&nbsp;');

            demo.$message.innerHTML = message;
        } catch (e) {
            console.log(e);
        }
    },

    fetchError: async () => {
        try {
            const response = await fetch('foo.json');
            const message = `${response.status}: ${response.statusText}`;

            demo.$message.innerHTML = message;
        } catch(e) {
            console.log(e);
        }
    },

    load: () => {
        demo.$message = document.querySelector('#message');
    }

};

window.addEventListener('DOMContentLoaded', demo.load);