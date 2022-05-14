'use strict';
import Swiper, { Pagination, Navigation } from 'swiper';
import SmoothScroll from 'smooth-scroll';

const introSlider = new Swiper('.intro_slider', {
	slidesPerView: 1,
	spaceBetween: 15,
	modules: [Pagination],
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>';
		},
	},
});

const dreamTeamSlider = new Swiper('.dream_team_slider', {
	slidesPerView: 1,
	modules: [Pagination, Navigation],
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>';
		},
	},
	navigation: {
		nextEl: ".swiper_button_next",
		prevEl: ".swiper_button_prev",
	},
});

const scroll = new SmoothScroll('a[href*="#"]');