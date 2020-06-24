const demo = {

    $message: null,

    watchID: null,

    watchPosition: () => {
        let count = 0;
        demo.watchID = navigator.geolocation.watchPosition(
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
                switch(error.code) {
                    case 0: // unknown error
                        demo.$message.innerHTML('The application has encountered an unknown error while trying to determine location.');
                        break;
                    case 1: // permission denied
                        demo.$message.innerHTML('You chose not to allow this application access to your location.');
                        break;
                    case 2: // position unavailable
                        demo.$message.innerHTML('The application was unable to determine your location.');
                        break;
                    case 3: // timeout
                        demo.$message.innerHTML('The request to determine your location has timed out.');
                        break;
                }
            }
        );
    },

    stop: () => {
        navigator.geolocation.clearWatch(demo.watchID);
    },

    load: () => {
        demo.$message = document.querySelector('#message');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);