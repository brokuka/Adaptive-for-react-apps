import Swiper, { Pagination, Navigation, Controller } from 'swiper';

Swiper.use([Controller]);

let introSliderText = new Swiper('.intro_slider_text', {
	slidesPerView: 1,
	spaceBetween: 15,
	modules: [Pagination, Controller],
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>';
		},
	},
});

let introSliderImage = new Swiper('.intro_slider_image', {});

introSliderText.controller.control = introSliderImage;
introSliderImage.controller.control = introSliderText;

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