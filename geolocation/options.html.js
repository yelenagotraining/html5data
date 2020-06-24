const demo = {

    $message: null,

    getPosition: () => {

        const options = {
            enableHighAccuracy: true,   // boolean, default: false
            timeout: 10000,             // in milliseconds, default: no limit
            maximumAge: 2000            // in milliseconds, default: 0
        };

        navigator.geolocation.getCurrentPosition(
            position => {

                // The way the position object is implemented 
                // prevents it from being serialized with a simple
                // JSON.stringify command. This is a poor-man's clone ;)
                const pos = clonePosition(position);

                pos.coords.latitude = 40.765363; // protect the author's privacy
                pos.coords.longitude = -73.979973;

                demo.$message.innerHTML = JSON.stringify(pos, null, 4)
                                                .replace(/ /g, '&nbsp;')
                                                .replace(/\n/g, '<br>')
                                                .replace(/"/g,'');
            },
            error => {
                console.log(error);
            },
            options
        );
    },

    load: () => {
        demo.$message = document.querySelector('#message');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);