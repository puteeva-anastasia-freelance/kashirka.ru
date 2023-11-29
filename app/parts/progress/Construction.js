(function () {
	"use strict";

	/**
	 * Класс для управления ходом строительства
	 */
	class Construction {
		constructor() {
			this.settings = {
				lazy: {
					loadPrevNext: true,
				},
				loop: true,
				speed: 800,
				navigation: {
					nextEl: '.progress-button-next',
					prevEl: '.progress-button-prev',
				},
				pagination: {
					el: '.progress-pagination',
					clickable: true,
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
					},
				}
			};

			this.progressLeftEl = document.querySelector('.progress__left .swiper-wrapper');
			this.progressWrapEl = document.querySelector('.progress__wrap .swiper-wrapper');

			this.pathToTownshipsProgressImages = 'assets/img/dist/townships/progress';
		}

		/**
		 * Метод добавляет табы на страницу
		 * @param {СonstructionDTO[]} constructions массив информации о строительстве из файла constructions.js
		 * @param {number} idTownship идентификатор поселка
		 */
		addTabsIntoPage(constructions, idTownship) {
			let tabsMarkup = '';

			for (let construction of constructions) {
				if (construction.townshipId == idTownship) {
					tabsMarkup += this.getTabMarkup(construction);
				}
			}

			this.progressLeftEl.insertAdjacentHTML('beforeend', tabsMarkup);
		}

		/**
		 * Этот метод получает разметку таба
		 * @param {СonstructionDTO} construction объект с информацией о ходе строительства
		 * @returns {string} html-разметка таба
		 */
		getTabMarkup(construction) {
			return `
			<div class="swiper-slide tab__slide">
						<button type="button" class="progress__tab" data-tab="${construction.date}">${construction.date}</button>
					</div>
			`;
		}

		/**
		 * Метод отрисовывает карточки хода строительства
		 * @param {СonstructionDTO[]} constructions массив информации о строительстве из файла constructions.js
		 * @param {number} idTownship идентификатор поселка
		 */
		renderCardsProgress(constructions, idTownship) {
			let date = document.querySelector('.progress__tab').textContent;

			this.insertCardsProgressIntoPage(constructions, idTownship, date);
			this.changeStyleBtn(document.querySelector('.progress__tab'));
			let progressSlider = new Swiper('.progress-slider', this.settings);

			let tabElems = document.querySelectorAll('.progress__tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.insertCardsProgressIntoPage(constructions, idTownship, tabEl.dataset.tab);
					this.changeStyleBtn(tabEl);
					progressSlider.destroy();
					progressSlider = new Swiper('.progress-slider', this.settings);
				});
			});
		}

		/**
		 * Метод изменяет стиль кнопки, которая относится к нужной дате
		 * @param {HTMLButtonElement} button кнопка, которой необходимо изменить стиль
		 */
		changeStyleBtn(button) {
			if (document.querySelector('.progress__tab.active')) {
				document.querySelector('.progress__tab.active').classList.remove('active');
			}
			button.classList.add('active');
		}

		/**
		 * Метод вставляет карточки хода строительства на страницу
		 * @param {СonstructionDTO[]} constructions массив информации о строительстве из файла constructions.js
		 * @param {number} idTownship идентификатор поселка
		 * @param {string} date дата строительства
		 */
		insertCardsProgressIntoPage(constructions, idTownship, date) {

			let cardsProgressMarkup = '';

			for (let construction of constructions) {
				if (construction.townshipId == idTownship && construction.date == date) {
					for(let i = 0; i < construction.images.length; i++){
						cardsProgressMarkup += this.getCardsProgressMarkup(construction, construction.images[i], construction.imagesMiddle[i]);
					}
				}
			}

			this.progressWrapEl.textContent = '';
			this.progressWrapEl.insertAdjacentHTML('beforeend', cardsProgressMarkup);
		}

		/**
		 * Этот метод получает разметку карточки прогресса строительства поселка
		 * @param {СonstructionDTO} construction объект с информацией о ходе строительства
		 * @param {string} image путь к фотографии карточки
		 * @param {string} imageMiddle путь к фотографии карточки среднего размера
		 * @returns {string} html-разметка карточки прогресса строительства поселка
		 */
		getCardsProgressMarkup(construction, image, imageMiddle) {
			return `<div class="swiper-slide progress__slide">
				<picture class="progress__photo">
					<source data-srcset="${this.pathToTownshipsProgressImages}/${image}" media="(min-width: 576px)" width="994" height="596">
					<source data-srcset="${this.pathToTownshipsProgressImages}/${imageMiddle}" media="(min-width: 0)" width="556" height="334">
					<img class="swiper-lazy" data-src="${this.pathToTownshipsProgressImages}/${imageMiddle}" alt="${construction.date}" width="556" height="334">
				</picture>
			</div>`;
		}
	}

	window.addEventListener('load', () => {
		let construction = new Construction();
		let idTownship = location.hash.replace(/#/, '');
		construction.addTabsIntoPage(constructions, idTownship);
		construction.renderCardsProgress(constructions, idTownship);
	});
})();