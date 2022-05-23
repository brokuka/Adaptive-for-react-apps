import Swiper, { Pagination, Navigation, Controller, Autoplay } from 'swiper';

Swiper.use([Controller]);

let introSliderText = new Swiper('.intro_slider_text', {
	slidesPerView: 1,
	spaceBetween: 15,
	grabCursor: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
	modules: [Pagination, Controller, Autoplay],
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>';
		},
	},
});

let introSliderImage = new Swiper('.intro_slider_image', {
	grabCursor: true,
	loop: true,
});

introSliderText.controller.control = introSliderImage;
introSliderImage.controller.control = introSliderText;

const dreamTeamSlider = new Swiper('.dream_team_slider', {
	slidesPerView: 1,
	grabCursor: true,
	modules: [Pagination, Navigation, Autoplay],
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
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

const shopItemSlider = new Swiper('.shop_item_slider', {
	spaceBetween: 15,
	grabCursor: true
});