(function () {
	"use strict";

	/**
	 * Класс для управления фотографиями поселка
	 */
	class Photo {
		constructor() {
			this.wrapEl = document.querySelector('.photo .swiper-wrapper');
			this.containerEl = document.querySelector('.container');
			this.photoSwiperButtonNext = document.querySelector('.photo-swiper-button-next');
			this.photoSwiperButtonPrev = document.querySelector('.photo-swiper-button-prev');

			this.pathToTownshipsPhotoImages = 'assets/img/dist/townships/images';

			this.settings = {
				loop: true,
				slidesPerView: 'auto',
				speed: 700,
				centeredSlides: true,
				roundLengths: true,
				navigation: {
					nextEl: '.photo-swiper-button-next',
					prevEl: '.photo-swiper-button-prev',
				},
				breakpoints: {
					320: {
						spaceBetween: 12,
					},
					577: {
						spaceBetween: 20,
					},
					993: {
						spaceBetween: 24,
					},
					1201: {
						spaceBetween: 42,
					},
				}
			}
		}

		/**
		 * Метод вставляет фотографии поселка на страницу
		 * @param {TownshipDTO} township объект с информацией о поселке
		 */
		insertPhotosIntoPage(township) {
			let photosMarkup = '';

			for (let i = 0; i < township.images.length; i++) {
				photosMarkup += this.getPhotosMarkup(township, township.images[i], township.imagesMiddle[i]);
			}

			this.wrapEl.insertAdjacentHTML('beforeend', photosMarkup);

			this.addSliderPhotos();
			this.setIndentsElems();
		}

		/**
		 * Метод добавляет слайдер фотографиям
		 */
		addSliderPhotos() {
			new Swiper('#photo-slider', this.settings);
		}

		/**
		 * Метод устанавливает отступы элементам
		 */
		setIndentsElems() {
			let mlContainerEl = window.getComputedStyle(this.containerEl).marginLeft;
			this.photoSwiperButtonNext.style.right = mlContainerEl;
			this.photoSwiperButtonPrev.style.left = mlContainerEl;
		}

		/**
		 * Этот метод принимает один из объектов из массива townships в файле townships.js и генерирует разметку фотографий поселка
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @param {string} image название файла с дополнительной картинкой
		 * @param {string} imageMiddle название файла с дополнительной картинкой среднего размера
		 * @returns {string} html-разметка фотографий поселка
		 */
		getPhotosMarkup(township, image, imageMiddle) {
			return `
			<div class="swiper-slide photo__slide">
				<picture class="photo__img">
					<source srcset="${this.pathToTownshipsPhotoImages}/${image}" media="(min-width: 576px)" width="988" height="737">
					<source srcset="${this.pathToTownshipsPhotoImages}/${imageMiddle}" media="(min-width: 0)" width="556" height="348">
					<img src="${this.pathToTownshipsPhotoImages}/${imageMiddle}" alt="Фотография поселка ${township.name}" width="556" height="348">
				</picture>
			</div>`;
		}

		/**
		 * Метод находит поселок для того, чтобы дальше вставить его картинки на страницу
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		findTownship(townships, plots) {
			let hashPage = location.hash.replace(/#/, '');
			let pathnamePage = document.location.pathname.replace(/\/kashirka.ru/, '');
			let idTownship = 0;

			switch (pathnamePage) {
				case '/town-card.html':
					idTownship = townships.findIndex(x => x.id == hashPage);
					this.insertPhotosIntoPage(townships[idTownship]);
					break;
				case '/plot-card.html':
					let idPlot = plots.findIndex(x => x.id == hashPage);
					let id = plots[idPlot].townshipId;
					idTownship = townships.findIndex(x => x.id == id);
					this.insertPhotosIntoPage(townships[idTownship]);
					break;
			}
		}
	}

	window.addEventListener('load', () => {
		let photo = new Photo();
		photo.findTownship(townships, plots);

		window.addEventListener('resize', () => {
			photo.setIndentsElems();
		})
	});
})();