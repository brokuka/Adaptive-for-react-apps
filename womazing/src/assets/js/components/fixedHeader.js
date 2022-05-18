const events = ['scroll', 'resize'];

events.forEach(event => document.addEventListener(event, () => {
	let windowScroll = window.scrollY;

	const header = document.querySelector("header");
	const intro = document.querySelector(".intro");

	const fixedWidth = windowScroll >= (intro.scrollHeight - header.clientHeight) - 15;

	header.classList.toggle('fixed', fixedWidth);

	console.log(windowScroll, intro.scrollHeight, fixedWidth);
}));

