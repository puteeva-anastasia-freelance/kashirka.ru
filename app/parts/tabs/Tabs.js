(function () {
	"use strict";

	/**
	 * Данный класс управляет табами 
	 */
	class Tabs {
		constructor() {
			this.settings = {
				slidesPerView: 'auto',
				watchSlidesProgress: true,
				freeMode: true,
				speed: 600,
				navigation: {
					nextEl: '.tab__button-next',
					prevEl: '.tab__button-prev',
				},
			};
		}

		/**
		 * Метод инициализирует управление табами
		 */
		init() {
			let idsTabs = ['#tabs-slider-plots', '#tabs-slider-townships', '#tabs-slider-news', '#tabs-slider-map', '#tabs-slider-progress'];
			idsTabs.forEach((id) => {
				this.addSwiperAndEventListeners(id);
			});
		}

		/**
		 * Метод добавляет табам слайдер и слушатели событий
		 * @param {string} id идентификатор слайдера
		 */
		addSwiperAndEventListeners(id) {
			let tabsSwiper = new Swiper(id, this.settings);

			if (document.querySelector(id)) {
				let btnNext = document.querySelector(`${id} .tab__button-next`);
				let btnPrev = document.querySelector(`${id} .tab__button-prev`);

				this.setStyleLastVisibleSlide(id, btnNext);
				this.addButtonsSwiperClickListener(id, tabsSwiper, btnNext, btnPrev);
				this.addSwiperEventListener(id, tabsSwiper, btnNext, btnPrev);
				this.addWindowResizeListener(id, tabsSwiper, btnNext, btnPrev);
			}
		}

		/**
		 * Метод добавляет окну браузера слушатель события клика
		 * @param {string} id идентификатор слайдера
		 * @param {Swiper} tabsSwiper слайдер
		 * @param {HTMLDivElement} btnNext кнопка вперед
		 * @param {HTMLDivElement} btnPrev кнопка назад
		 */
		addWindowResizeListener(id, tabsSwiper, btnNext, btnPrev) {
			let resizeTimeout;
			let windowWidth = window.innerWidth;

			window.addEventListener('resize', () => {
				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(() => {
					let newWindowWidth = window.innerWidth;

					if (newWindowWidth != windowWidth) {
						windowWidth = newWindowWidth;
						tabsSwiper.destroy();
						tabsSwiper = new Swiper(id, this.settings);
						this.changeStyleTabs(id, btnNext, btnPrev);
						this.addSwiperEventListener(id, tabsSwiper, btnNext, btnPrev);
						this.addButtonsSwiperClickListener(id, tabsSwiper, btnNext, btnPrev);
					}
				}, 200);
			});
		}

		/**
		 * Метод добавляет слайдеру слушатели событий
		 * @param {string} id идентификатор слайдера
		 * @param {Swiper} tabsSwiper слайдер
		 * @param {HTMLDivElement} btnNext кнопка вперед
		 * @param {HTMLDivElement} btnPrev кнопка назад
		 */
		addSwiperEventListener(id, tabsSwiper, btnNext, btnPrev) {
			tabsSwiper.on('touchMove', () => {
				this.changeStyleTabs(id, btnNext, btnPrev);
			})

			tabsSwiper.on('slideChange', () => {
				this.changeStyleTabs(id, btnNext, btnPrev);
			});

			tabsSwiper.on('slideChangeTransitionEnd', () => {
				this.changeStyleTabs(id, btnNext, btnPrev);
			});
		}

		/**
		 * Метод устанавливает стиль последнего видимого слайда
		 * @param {string} id идентификатор слайдера
		 * @param {HTMLDivElement} btnNext кнопка вперед
		 */
		setStyleLastVisibleSlide(id, btnNext) {


			if (!btnNext.classList.contains('swiper-button-disabled')) {
				let slideVisibleElems = document.querySelectorAll(`${id} .swiper-slide-visible`);

				console.log(slideVisibleElems);
				let lastSlideVisibleEl = slideVisibleElems[slideVisibleElems.length - 1];
				lastSlideVisibleEl.classList.add('brighten');
			}
		}

		/**
		 * Метод изменяет стиль табов
		 * @param {string} id идентификатор слайдера
		 * @param {HTMLDivElement} btnNext кнопка вперед
		 * @param {HTMLDivElement} btnPrev кнопка назад
		 */
		changeStyleTabs(id, btnNext, btnPrev) {
			let slideElems = document.querySelectorAll(`${id} .swiper-slide`);
			let slideVisibleElems = document.querySelectorAll(`${id} .swiper-slide-visible`);
			let lastSlideVisibleEl = slideVisibleElems[slideVisibleElems.length - 1];
			let firstSlideVisibleEl = slideVisibleElems[0];

			slideElems.forEach((slideEl) => {
				slideEl.classList.remove('brighten');
			});

			if (!btnNext.classList.contains('swiper-button-disabled')) {
				lastSlideVisibleEl.classList.add('brighten');
			}

			if (!btnPrev.classList.contains('swiper-button-disabled')) {
				firstSlideVisibleEl.classList.add('brighten');
			}

			if (!btnNext.classList.contains('swiper-button-disabled') && !btnPrev.classList.contains('swiper-button-disabled')) {
				lastSlideVisibleEl.classList.add('brighten');
				firstSlideVisibleEl.classList.add('brighten');
			}
		}

		/**
		 * Метод добавляет кнопкам слайдера слушатель события клика
		 * @param {Swiper} tabsSwiper слайдер
		 * @param {HTMLDivElement} btnNext кнопка вперед
		 * @param {HTMLDivElement} btnPrev кнопка назад
		 */
		addButtonsSwiperClickListener(id, tabsSwiper, btnNext, btnPrev) {
			btnNext.addEventListener('click', () => {
				tabsSwiper.slideTo(8, 800, true);
				this.changeStyleTabs(id, btnNext, btnPrev);
			});

			btnPrev.addEventListener('click', () => {
				tabsSwiper.slideTo(0, 800, true);
				this.changeStyleTabs(id, btnNext, btnPrev);
			});
		}
	}

	window.addEventListener('load', () => {
		let tabs = new Tabs();
		tabs.init();
	});

})();