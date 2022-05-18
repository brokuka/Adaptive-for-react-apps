import smoothScrollPolyfillsMin from "smooth-scroll";

const smoothScroll = new smoothScrollPolyfillsMin('a[href*="#"]', {
	header: '[data-scroll-header]',
	updateURL: false
});