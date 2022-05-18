const events = ['scroll', 'resize'];

events.forEach(event => document.addEventListener(event, () => {
    let windowScroll = window.scrollY;

    const header = document.querySelector("header");
    const intro = document.querySelector(".intro");

    header.classList.toggle('fixed', windowScroll >= intro.scrollHeight);
}));

