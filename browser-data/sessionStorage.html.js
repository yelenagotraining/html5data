const demo = {

    $message: null,

    set: (e) => {
        sessionStorage.message = e.currentTarget.value;
    },

    bind: () => {
        demo.$message.innerText = sessionStorage.message;
    },

    setAndBind: (e) => {
        demo.set(e);
        demo.bind();
    },

    load: () => {
        demo.$message = document.querySelector('.message-box');
        demo.bind();
    }

};

window.addEventListener('DOMContentLoaded', demo.load);