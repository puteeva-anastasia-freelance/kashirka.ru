(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек, что сделано в поселке
	 */
	class Standard {
		constructor() {
			this.wrapEl = document.querySelector('.standard .swiper-wrapper');
			this.innerEl = document.querySelector('.standard__inner');
			this.standardEl = document.querySelector('.standard');

			this.pathToTownshipsStandardImages = 'assets/img/dist/townships/standard';

			this.settings = {
				loop: true,
				speed: 700,
				navigation: {
					nextEl: '.standard-swiper-button-next',
					prevEl: '.standard-swiper-button-prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					577: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					993: {
						slidesPerView: 2,
						spaceBetween: 24,
					},
					1201: {
						slidesPerView: 3,
						spaceBetween: 32,
					},
				}
			}
		}

		/**
		 * Метод вставляет карточки с информацией о том, что сделано в поселке, на страницу
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @param {number} idTownship идентификатор поселка
		 * @param {StandardDTO[]} standards массив карточек того, что сделано в поселке, из файла standards.js
		 */
		insertCardsIntoPage(township, idTownship, standards) {
			let cardsMarkup = '';

			let videoMarkup = `<iframe width="100%" height="500"
			title="${township.name}" frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen="" class="standard__video-iframe"></iframe>`;

			/*let videoMarkup = `<iframe width="100%" height="500" src="${township.video}"
			title="${township.name}" frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen=""></iframe>`;*/

			for (let i = 0; i < standards.length; i++) {
				if (standards[i].townshipId == idTownship) {
					cardsMarkup += this.getCardsMarkup(standards[i]);
				}
			}

			this.wrapEl.insertAdjacentHTML('beforeend', cardsMarkup);
			this.innerEl.insertAdjacentHTML('beforeend', videoMarkup);

			this.addSliderStandard();
			this.setSameHeightPhoto();
			this.addScrollWindow(township);

			window.addEventListener('resize', () => {
				this.setSameHeightPhoto();
			});
		}

		/**
		 * Метод добавляет элементу окна слушатель события скролл
		 * @param {TownshipDTO} township объект с информацией о поселке
		 */
		addScrollWindow(township){
			let videoEl = document.querySelector('.standard__video-iframe');

			window.addEventListener('scroll', () => {
				let standardElPosition = this.standardEl.getBoundingClientRect();
				let windowHeight = window.innerHeight;

				if (standardElPosition.top <= windowHeight && videoEl.src == '') {
					videoEl.src = `${township.video}`;
				}
			});
		}

		/**
		 * Метод устанавливает одинаковую высоту фотографиям
		 */
		setSameHeightPhoto() {
			let standardPhotoElems = document.querySelectorAll('.standard__photo');
			let widthSlide = document.querySelector('#standard-slider .swiper-slide').clientWidth;

			standardPhotoElems.forEach((standardPhotoEl) => {
				standardPhotoEl.style.height = `${widthSlide * 0.764}px`;
			});
		}

		/**
		 * Этот метод генерирует разметку карточек с информацией о том, что сделано в поселке
		 * @param {StandardDTO} standard объект с информацией о том, что сделано в поселке
		 * @returns {string} html-разметка карточки с информацией о том, что сделано в поселке
		 */
		getCardsMarkup(standard) {
			return `
			<div class="swiper-slide">
					<div class="standard__item">
						<img src="${this.pathToTownshipsStandardImages}/${standard.image}" alt="${standard.subtitle}" class="standard__photo" width="424" height="324">
						<h2 class="standard__subtitle">${standard.subtitle}</h2>
						<p class="standard__txt">${standard.text}</p>
					</div>
				</div>`;
		}

		/**
		 * Метод добавляет слайдер карточкам с информацией о том, что сделано в поселке
		 */
		addSliderStandard() {
			new Swiper('#standard-slider', this.settings);
		}
	}

	window.addEventListener('load', () => {
		let standard = new Standard();
		let idTownship = location.hash.replace(/#/, '');
		let id = townships.findIndex(x => x.id == idTownship);
		standard.insertCardsIntoPage(townships[id], idTownship, standards);
	});
})();