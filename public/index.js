window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.user').forEach((elm) => {
        elm.addEventListener('click', (event) => {
            console.log(event.target.innerHTML);
        });
    });
});
