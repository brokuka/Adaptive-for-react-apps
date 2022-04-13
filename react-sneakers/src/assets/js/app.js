'use strict';

const	navItems = document.querySelectorAll('.nav__item'),
		cart = document.querySelector('.cart'),
		cartItemsGroup = document.querySelector('.cart__items-group'),
		body = document.body,
		btnClose = document.querySelector('.btn--close'),
		windowEvents = ['click', 'keydown', 'resize'],
		scrollWidth = window.innerWidth - document.documentElement.clientWidth;


navItems[0].addEventListener('click', (e) => {
	e.preventDefault();

	cart.classList.add('show');
	body.classList.add('no-scroll');
	body.style.paddingRight = `${scrollWidth}px`;
	windowEvents.forEach(event => window.addEventListener(event, handleEscapeAndClick));
});

btnClose.addEventListener('click', () => {
	closeModal();
});

function onCartItemsScroll() {
	if (!cartItemsGroup) return;

	if ((cartItemsGroup.scrollHeight > cartItemsGroup.clientHeight) && document.documentElement.clientWidth > 1199.98) {
		cartItemsGroup.classList.add('fixed')
	} else cartItemsGroup.classList.remove('fixed')
}

function handleEscapeAndClick(e) {
	e.stopPropagation();

	onCartItemsScroll();

	if (e.key === 'Escape' || e.target === cart) {
		closeModal();
		window.removeEventListener('keydown', handleEscapeAndClick)
	}
}

function closeModal() {
	const attrToRemove = ['class', 'style'];

	cart.classList.remove('show');

	body.classList.remove('no-scroll');
	attrToRemove.forEach(event => body.removeAttribute(event));
}