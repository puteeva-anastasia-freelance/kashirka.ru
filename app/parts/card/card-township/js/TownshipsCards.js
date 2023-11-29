(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек поселков
	 */
	class TownshipsCards {
		constructor() {
			this.pathToTownshipsImages = 'assets/img/dist/townships';
			this.wrapEl = document.querySelector('#townships .card__wrap');
			this.likedCountEl = document.querySelector('.main-header__liked-count');
			this.numberOfCards = 5;
		}

		/**
		 * Отрисовываем категорию поселков
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		renderCategoryTownships(townships, plots) {
			let category = 'all';

			this.setCostHundred(townships, plots);
			this.insertTownshipsIntoPage(category, townships);
			this.changeStyleBtn(document.querySelector('#townships .tab'));
			this.addCardHoverListeners();

			let tabElems = document.querySelectorAll('#townships .tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.insertTownshipsIntoPage(tabEl.dataset.tab, townships);
					this.changeStyleBtn(tabEl);
					this.setTownshipsLiked(townships);
					this.addCardHoverListeners();
				});
			});
		}

		/**
		 * Метод устанавливает минимальную стоимость сотки в поселке и старую минимальную стоимость сотки в поселке
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		setCostHundred(townships, plots) {
			for (let township of townships) {
				for (let plot of plots) {
					if (plot.townshipId == township.id) {
						let minCostHundred = this.getMinCostHundred(plots, plot.townshipId);
						let oldMinCostHundred = this.getOldMinCostHundred(plots, plot.townshipId);
						township.minCostHundred = minCostHundred;
						township.oldMinCostHundred = oldMinCostHundred;
					}
				}
			}
		}

		/**
		 * Метод получает минимальную старую стоимость сотки в поселке
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @param {number} idTownship идентификатор поселка
		 * @returns {number} минимальная старая стоимость сотки в поселке
		 */
		getOldMinCostHundred(plots, idTownship) {
			let arrayCostHundred = [];
			let j = 0;

			for (let i = 0; i < plots.length; i++) {
				if (plots[i].townshipId == idTownship) {
					if (plots[i].priceOld != null) {
						arrayCostHundred[j] = (plots[i].priceOld / plots[i].area).toFixed(0);
						j++;
					}
				}
			}

			return Math.min(...arrayCostHundred);
		}

		/**
		 * Метод получает минимальную стоимость сотки в поселке
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @param {number} idTownship идентификатор поселка
		 * @returns {number} минимальная стоимость сотки в поселке
		 */
		getMinCostHundred(plots, idTownship) {
			let arrayCostHundred = [];
			let j = 0;

			for (let i = 0; i < plots.length; i++) {
				if (plots[i].townshipId == idTownship) {
					arrayCostHundred[j] = (plots[i].price / plots[i].area).toFixed(0);
					j++;
				}
			}

			return Math.min(...arrayCostHundred);
		}

		/**
		 * Метод добавляет нижней части карточки эффект наведения
		 */
		addCardBottomHoverListeners() {
			let cardBottomElems = document.querySelectorAll('.card__bottom');

			cardBottomElems.forEach((cardBottomEl) => {
				let cardInnerEl = cardBottomEl.parentElement;
				let chevronEl = cardInnerEl.querySelector('.chevron');

				cardBottomEl.addEventListener('mouseover', () => {
					cardInnerEl.classList.add('active');
					chevronEl.classList.add('active');
				});
				cardBottomEl.addEventListener('mouseout', () => {
					cardInnerEl.classList.remove('active');
					chevronEl.classList.remove('active');
				});
			})
		}

		/**
		 * Добавляем шеврону эффект наведения
		 */
		addChevronHoverListeners() {
			let chevronElems = document.querySelectorAll('.chevron');

			chevronElems.forEach((chevron) => {
				let cardInnerEl = chevron.parentElement;

				chevron.addEventListener('mouseover', () => {
					cardInnerEl.classList.add('active');
				});

				chevron.addEventListener('mouseout', () => {
					cardInnerEl.classList.remove('active');
				});
			})
		}

		/**
		 * Метод добавляет карточке эффект наведения
		 */
		addCardHoverListeners() {
			this.addCardBottomHoverListeners();
			this.addChevronHoverListeners();
		}

		/**
		 * Метод изменяет стиль кнопки, которая относится к нужной категории
		 * @param {HTMLButtonElement} button кнопка, которой необходимо изменить стиль
		 */
		changeStyleBtn(button) {
			if (document.querySelector('#townships .tab.active')) {
				document.querySelector('#townships .tab.active').classList.remove('active');
			}
			button.classList.add('active');
		}

		/**
		 * Метод вставляет число карточек поселков нужной категории на страницу
		 * @param {string} category категория поселка
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		insertTownshipsIntoPage(category, townships) {
			let townshipsMarkup = '';
			let count = 0;
			let i = 0;

			while (count < this.numberOfCards && i < townships.length) {
				if (category == 'all') {
					townshipsMarkup += this.getTownshipMarkup(townships[i]);
					count++;
				} else {
					townships[i].labels.forEach((label) => {
						if (label == category) {
							townshipsMarkup += this.getTownshipMarkup(townships[i]);
							count++;
						}
					});
				}
				i++;
			}

			this.wrapEl.innerHTML = '';
			this.wrapEl.insertAdjacentHTML('afterbegin', townshipsMarkup);

			this.setEveryThirdElementFullWidth();
			this.addButtonLikedClickListeners(townships);
		}

		/**
		 * Установить каждый третий элемент на всю длину контейнера
		 */
		setEveryThirdElementFullWidth() {
			let cardWrapEl = document.querySelector('#townships .card__wrap');
			let cardInnerElems = cardWrapEl.querySelectorAll('.card__inner');

			for (let i = 2; i < cardInnerElems.length; i += 3) {
				let idTownship = cardInnerElems[i].dataset.township;
				
				cardInnerElems[i].classList.add('card__inner-100');
				
				for(let township of townships){
					if(township.id == idTownship){
						cardInnerElems[i].style.backgroundImage = `url(${this.pathToTownshipsImages}/${township.image}`;
					}
				}
			}
		}

		/**
		 * Метод добавляет кнопке "Лайк" слушатель события клика
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		addButtonLikedClickListeners(townships) {
			let likedButtons = document.querySelectorAll('#townships .liked');

			likedButtons.forEach((button) => {
				button.addEventListener('click', () => {
					let idTownship = button.parentElement.dataset.township;
					let likedIconEl = button.querySelector('.liked__icon');

					if (likedIconEl.classList.contains('active')) {
						townships[idTownship].liked = false;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity - 1;
					} else {
						townships[idTownship].liked = true;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity + 1;
					}

					this.setTownshipsLiked(townships);
					this.likedCountEl.textContent = this.likedCountEl.dataset.quantity;
				});
			});
		}

		/**
		 * Устанавливаем карточкам поселка стиль кнопки "Нравится"
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		setTownshipsLiked(townships) {
			for (let township of townships) {
				let cardEl = document.querySelector(`[data-township="${township.id}"]`);
				if (cardEl) {
					if (township.liked == true) {
						cardEl.querySelector('.liked__icon').classList.add('active');
					} else if (township.liked == false) {
						cardEl.querySelector('.liked__icon').classList.remove('active');
					}
				}
			}
		}

		/**
		 * Метод форматирует число, разбивая его на разряды
		 * @param {number} number число, которое нужно отформатировать
		 * @returns {string} отформатированное число
		 */
		formatNumber(number) {
			return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		}

		/**
		 * Метод получает разметку меток поселка
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @returns {string} html-разметка меток поселка
		 */
		getLabelsTownshipMarkup(township) {
			let labelsMarkup = '';

			for (let i = 0; i < township.labels.length; i++) {
				switch (township.labels[i]) {
					case 'moscow':
						labelsMarkup += `<a href="townships.html#moscow" class="label">Ближе к Москве</a>`;
						break;
					case 'water':
						labelsMarkup += `<a href="townships.html#water" class="label">У воды</a>`;
						break;
					case 'forest':
						labelsMarkup += `<a href="townships.html#forest" class="label">У леса</a>`;
						break;
				}
			}
			return labelsMarkup;
		}

		/**
		 * Метод получает разметку цены поселка
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @returns {string} html-разметка минимальной цены поселка, разделенная пробелами по тысячам
		 */
		getPriceTownshipMarkup(township) {
			let price = this.formatNumber(township.minCostHundred);
			return `<span class="card__price">от <span class="card__price_big">${price}</span> руб/сот.</span>`;
		}

		/**
		 * Метод получает разметку старой цены поселка
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @returns {string} html-разметка минимальной старой цены поселка, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldTownshipMarkup(township) {
			if (township.oldMinCostHundred != Infinity) {
				let priceOld = this.formatNumber(township.oldMinCostHundred);
				return `<span class="card__price card__price_old">от ${priceOld} руб/сот.</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Этот метод принимает один из объектов из массива townships в файле townships.js
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @returns {string} html-разметка карточки поселка
		 */
		getTownshipMarkup(township) {
			let labelsMarkup = this.getLabelsTownshipMarkup(township);
			let priceMarkup = this.getPriceTownshipMarkup(township);
			let priceOldMarkup = this.getPriceOldTownshipMarkup(township);

			return `
			<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToTownshipsImages}/${township.imageMiddle});" data-township="${township.id}">
				<div class="card__labels">
					${labelsMarkup}
				</div>
				<button type="button" class="liked card__liked" aria-label="Поставить / убрать лайк">
					<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon">
						<path
							d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
							stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
				<a href="town-card.html#${township.id}" class="card__bottom">
					<div class="card__bottom-inner">
						<h3 class="h3 card__name">${township.name}</h3>
						<div class="card__prices">
							${priceOldMarkup}
							${priceMarkup}
						</div>
						<span class="card__distance card__distance_township">${township.distance} км. от МКАД</span>
					</div>
				</a>
				<a href="town-card.html#${township.id}" class="chevron card__chevron" aria-label="Смотреть полную информацию о поселке">
					<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</a>
			</div>
			`;
		}

	}

	window.addEventListener('load', () => {
		let townshipsCards = new TownshipsCards();
		townshipsCards.renderCategoryTownships(townships, plots);
	});
})();