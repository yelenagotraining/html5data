const demo = {

    $message: null,
    $result: null,

    set: (e) => {
        localStorage.setItem('event-message', e.currentTarget.value);
    },

    bind: () => {
        demo.$message.innerText = localStorage['event-message'];
    },

    setAndBind: (e) => {
        demo.set(e);
        demo.bind();
    },

    load: () => {
        demo.$message = document.querySelector('.message-box');
        demo.$result = document.querySelector('#result');
        demo.bind();
    }

};

window.addEventListener('storage', (event) => {

    const details = {
        key: event.key,
        oldValue: event.oldValue,
        newValue: event.newValue,
        storageArea: event.storageArea // ref to storage instance
    };

    demo.bind();

    const el = demo.$result;
    el.innerText = JSON.stringify(details, null, 2);
    hljs.highlightBlock(el);

});

window.addEventListener('DOMContentLoaded', demo.load);