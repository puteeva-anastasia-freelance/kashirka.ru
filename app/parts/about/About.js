(function () {
	"use strict";

	/**
	 * Класс для управления информацией о "Каширка.ру"
	 */
	class About {
		constructor() {
			this.containerEl = document.querySelector('.card .container');
			this.aboutEl = document.querySelector('.about');
			this.aboutSwiperButtonNextEl = document.querySelector('.about-swiper-button-next');

			this.settings = {
				loop: true,
				slidesPerView: 'auto',
				speed: 600,
				navigation: {
					nextEl: '.about-swiper-button-next',
				},
				breakpoints: {
					320: {
						spaceBetween: 10,
					},
					577: {
						spaceBetween: 20,
					},
					993: {
						spaceBetween: 24,
					},
					1201: {
						spaceBetween: 32,
					}
				}
			};

			this.aboutSwiper = new Swiper('#about-slider', this.settings);
		}

		/**
		 * Метод устанавливает отступы элементам
		 */
		setIndentsElems() {
			let mlContainerEl = window.getComputedStyle(this.containerEl).marginLeft;
			this.aboutEl.style.marginLeft = mlContainerEl;
			this.aboutSwiperButtonNextEl.style.right = mlContainerEl;
		}
	}

	window.addEventListener('load', () => {
		let about = new About();
		about.setIndentsElems();
		window.addEventListener('resize', () => {
			about.setIndentsElems();
		})
	});
})();