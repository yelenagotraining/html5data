const demo = {

    CACHE_NAME: 'SITE_CONTENT_V1',
    url: 'versions.json',

    $message: null,

    add: async () => {

        try {
            const url = demo.url;
            const response = await fetch(url);

            const cache = await window.caches.open(demo.CACHE_NAME);
            await cache.put(url, response.clone());

            demo.$message.innerHTML = `<span class="is-size-5">${url} added to cache</span>`;
        } catch(e) {
            console.log(e);
        }
    },

    list: async () => {
        try {
            const cache = await window.caches.open(demo.CACHE_NAME);
            const keys = await cache.keys();
    
            const urls = [];
            keys.forEach(request => {
                urls.push(request.url);
            });
    
            demo.$message.innerHTML = `<span class="is-size-4">URLs in cache</span><ul><li>${urls.join('<li>')}</ul>`;
        } catch(e) {
            console.log(e);
        }
    },

    get: async () => {
        try {
            const cache = await caches.open(demo.CACHE_NAME);
            const match = await cache.match(demo.url);
            const clone = match.clone();
            const json = await clone.json();
            const text = await match.text();
            
            console.log(json);
            demo.$message.innerHTML = text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
        } catch(e) {
            console.log(e);
        }
    },

    delete: async () => {
        try {
            const url = demo.url;
            const cache = await window.caches.open(demo.CACHE_NAME);
            await cache.delete(url);
    
            demo.$message.innerHTML = `<span class="is-size-5">${url} is deleted from cache</span>`;
        } catch(e) {
            console.log(e);
        }
    },
    

    load: () => {
        
        if(!window.caches) {
            alert('\n\nWARNING\n\nwindow.caches is not defined.\n\nIf you are running this demo locally, make sure to use localhost.');
        }

        demo.$message = document.querySelector('#message');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);