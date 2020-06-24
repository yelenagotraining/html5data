const CACHE_NAME = 'SITE_CONTENT_V1';

const urlsToCache = [
    // global
    '/styles/bulma.min.css',
    '/styles/global.css',
    '/favico.png',

    // /root
    '/service-workers/index.html',
    '/service-workers/index.css',
    '/service-workers/index.js',
    '/service-workers/offline.gif',
    '/service-workers/offline.html',
    '/service-workers/404.html',

    // /about
    '/service-workers/about/index.html',
    '/service-workers/about/index.css',
    '/service-workers/about/index.js'
];

self.addEventListener('install', installer  => {
    console.log('Installing');

    const done = async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll(urlsToCache);
    };

    installer.waitUntil(done());
});

self.addEventListener('fetch', fetchEvent => {
    // respond to fetch request with a match from the cache
    // if not in cache, then request from network and cache
    // if there is a server error, show the offline page
    const url = fetchEvent.request.url;

    console.log(`Fetching: ${url}`);

    const getResponse = async (request) => {
        let response;

        response = await caches.match(request);
        if(response && response.status === 200) {
            console.log('File in cache. Returning cached version.');
            return response;
        }

        try {
            response = await fetch(request);
            if(response && response.status === 404) {
                return caches.match('/service-workers/404.html');
            }
        } catch (e) {
            return caches.match('/service-workers/offline.html')
        }

        const clone = response.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(url, clone);
        return response;
    };

    fetchEvent.respondWith(getResponse(fetchEvent.request));
});

self.addEventListener('activate', activator => {
    console.log('Activating');

    const currentCaches = [CACHE_NAME];
    const done = async () => {
        const names = await caches.keys();
        return Promise.all(names.map(name => {
            if(!currentCaches.includes(name)) {
                return caches.delete(name);
            }
        }));
    };

    activator.waitUntil(done());
});
