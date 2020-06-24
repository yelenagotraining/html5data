const demo = {

    $message: null,

    set: (e) => {
        localStorage.message = e.currentTarget.value;
    },

    bind: () => {
        demo.$message.innerText = localStorage.message;
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