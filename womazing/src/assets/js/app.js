'use strict';
import Swiper, { Pagination } from 'swiper';

const swiper = new Swiper('.intro_slider', {
	slidesPerView: 1,
	spaceBetween: 15,
	modules: [Pagination],
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>';
			// return `<span class="${className}">${index + 1}</span> `;
		},
	},
});