(function () {
	"use strict";

	/**
	 * Класс для отрисовки избранных поселков и участков
	 */
	class Liked {
		constructor() {
			this.pathToTownshipsImages = 'assets/img/dist/townships';
			this.pathToPlotsImages = 'assets/img/dist/plots';
			this.wrapEl = document.querySelector('.card__wrap');
			this.mainHeaderLikedCountEl = document.querySelector('.main-header__liked-count');
			this.quantityTownshipsEl = document.querySelector('.h1__number');

			//Карточки в избранном
			this.cardsInLiked = [{
					type: 'township',
					id: 4
				},
				{
					type: 'plot',
					id: 11
				},
				{
					type: 'township',
					id: 1
				},
				{
					type: 'township',
					id: 0
				},
				{
					type: 'township',
					id: 8
				},
				{
					type: 'township',
					id: 7
				},
				{
					type: 'plot',
					id: 5
				},
			];

			this.totalQuantityLikedCards = this.cardsInLiked.length;
		}

		/**
		 * Метод отрисовывает понравившиеся карточки на странице
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js 
		 */
		renderLikedCards(townships, plots) {
			let type = 'all';

			this.setCostHundred(townships, plots);
			this.setDistance(townships, plots);
			this.renderCards(type, townships, plots);
			this.renderTotalQuantityLikedCards();
			this.addLikedClickListeners();
			this.changeStyleBtn(document.querySelector('.tab'));

			let tabElems = document.querySelectorAll('.tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.activateTab(tabEl, tabEl.dataset.tab, townships, plots);
				});
			});
		}

		/**
		 * Метод активирует таб
		 * @param {HTMLButtonElement} tabEl активный таб
		 * @param {string} type тип карточки
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js 
		 */
		activateTab(tabEl, type, townships) {
			this.renderCards(type, townships, plots);
			this.addLikedClickListeners();
			this.changeStyleBtn(tabEl);
			this.setCardsLiked();
		}

		/**
		 * Метод изменяет стиль кнопки, которая относится к нужной категории
		 * @param {HTMLButtonElement} button кнопка, которой необходимо изменить стиль
		 */
		changeStyleBtn(button) {
			if (document.querySelector('.tab.active')) {
				document.querySelector('.tab.active').classList.remove('active');
			}
			button.classList.add('active');
		}

		/**
		 * Метод добавляет элементам "Лайк" слушатель события клика
		 */
		addLikedClickListeners() {
			let cardLikedElems = document.querySelectorAll('.card__liked');
			cardLikedElems.forEach((button) => {
				button.addEventListener('click', () => {
					let likedIconEl = button.querySelector('.liked__icon');
					let typeCard = button.parentElement.dataset.type;
					let idCard = button.parentElement.dataset.id;

					this.cardsInLiked.forEach((card) => {
						if (card.id == idCard && card.type == typeCard) {
							if (likedIconEl.classList.contains('active')) {
								this.totalQuantityLikedCards--;
								likedIconEl.classList.remove('active');
								this.moveCardToEnd(button);
								card.liked = false;
							} else {
								this.totalQuantityLikedCards++;
								likedIconEl.classList.add('active');
								this.moveCardToBegin(button);
								card.liked = true;
							}
						}
					});
					this.renderTotalQuantityLikedCards();
				})
			});
		}

		/**
		 * Метод устанавливает карточкам стиль кнопки "Нравится"
		 */
		setCardsLiked() {
			this.cardsInLiked.forEach((card) => {
				let cardEl = document.querySelector(`[data-type="${card.type}"][data-id="${card.id}"]`);
				if (cardEl) {
					if (card.liked == false) {
						cardEl.querySelector('.liked__icon').classList.remove('active');
						this.moveCardToEnd(cardEl.querySelector('.card__liked'));
					} else {
						cardEl.querySelector('.liked__icon').classList.add('active');
						this.moveCardToBegin(cardEl.querySelector('.card__liked'));
					}
				}
			})
		}

		/**
		 * Метод устанавливает карточкам участков удаленность от МКАД
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		setDistance(townships, plots) {
			for (let plot of plots) {
				for (let township of townships) {
					if (plot.townshipId == township.id) {
						plot.distanceTownship = township.distance;
					}
				}
			}
		}

		/**
		 * Метод перемещает карточку поселка или участка в начало всех карточек
		 * @param {HTMLButtonElement} button "Лайк", на который нажали
		 */
		moveCardToBegin(button) {
			let cardEl = button.parentElement;
			cardEl.remove();
			this.wrapEl.insertAdjacentElement('afterbegin', cardEl);
		}

		/**
		 * Метод перемещает карточку поселка или участка в конец всех карточек
		 * @param {HTMLButtonElement} button "Лайк", на который нажали
		 */
		moveCardToEnd(button) {
			let cardEl = button.parentElement;
			cardEl.remove();
			this.wrapEl.insertAdjacentElement('beforeend', cardEl);
		}

		/**
		 * Метод отрисовывает общее количество понравившихся карточек
		 */
		renderTotalQuantityLikedCards() {
			this.mainHeaderLikedCountEl.textContent = this.totalQuantityLikedCards;
			this.mainHeaderLikedCountEl.dataset.quantity = this.totalQuantityLikedCards;
			this.quantityTownshipsEl.textContent = this.totalQuantityLikedCards;
		}

		/**
		 * Метод отрисовывает карточки поселков и (или) участков
		 * @param {string} type тип карточек для отрисовки
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		renderCards(type, townships, plots) {
			this.wrapEl.innerHTML = '';
			for (let i = 0; i < this.cardsInLiked.length; i++) {
				switch (type) {
					case 'all':
						this.renderAllCards(this.cardsInLiked[i], townships, plots);
						break;
					case 'townships':
						this.renderTownshipsCards(this.cardsInLiked[i], townships);
						break;
					case 'plots':
						this.renderPlotsCards(this.cardsInLiked[i], plots);
						break;
				}
			}
		}

		/**
		 * Метод отрисовывает карточки поселков
		 * @param {this.cardsInLiked} likedCard понравившаяся карточка
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		renderTownshipsCards(likedCard, townships) {
			if (likedCard.type == 'township') {
				let idTownship = townships.findIndex(x => x.id == likedCard.id);
				let township = townships[idTownship];
				this.renderCardTownship(township);
			}
		}

		/**
		 * Метод отрисовывает карточки участков
		 * @param {this.cardsInLiked} likedCard понравившаяся карточка
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		renderPlotsCards(likedCard, plots) {
			if (likedCard.type == 'plot') {
				let idPlot = plots.findIndex(x => x.id == likedCard.id);
				let plot = plots[idPlot];
				this.renderCardPlot(plot);
			}
		}

		/**
		 * Метод отрисовывает все карточки
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		renderAllCards(likedCard, townships, plots) {
			if (likedCard.type == 'township') {
				let idTownship = townships.findIndex(x => x.id == likedCard.id);
				let township = townships[idTownship];
				this.renderCardTownship(township);
			} else if (likedCard.type == 'plot') {
				let idPlot = plots.findIndex(x => x.id == likedCard.id);
				let plot = plots[idPlot];
				this.renderCardPlot(plot);
			}
		}

		/**
		 * Метод отрисовывает карточку участка
		 * @param {PlotDTO} plot объект с информацией об участке
		 */
		renderCardPlot(plot) {
			let labelsMarkup = this.getLabelsPlotMarkup(plot);
			let priceMarkup = this.getPricePlotMarkup(plot);
			let priceOldMarkup = this.getPriceOldPlotMarkup(plot);

			let plotMarkup = `<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToPlotsImages}/${plot.image});" data-type="plot" data-id="${plot.id}">
			<div class="card__labels card__labels_plots">
				${labelsMarkup}
			</div>
			<button type="button" class="liked card__liked" aria-label="Убрать / поставить лайк">
				<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon active">
					<path
						d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
						stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<a href="plot-card.html#${plot.id}" class="card__bottom card__bottom_plots">
				<div class="card__bottom-inner">
					<h2 class="h3 card__name">Участок ${plot.area} соток</h2>
					<div class="card__prices">
					${priceOldMarkup}
					${priceMarkup}
					</div>
					<span class="card__distance">${plot.distanceTownship} км. от МКАД</span>
				</div>
			</a>
			<a href="plot-card.html#${plot.id}" class="chevron card__chevron card__chevron_plots" aria-label="Смотреть полную информацию об участке">
				<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</a>
		</div>`;

			this.wrapEl.insertAdjacentHTML('beforeend', plotMarkup);
		}

		/**
		 * Метод получает разметку меток участка
		 * @param {PlotDTO} plot объект с информацией об участке
		 * @returns {string} html-разметка меток участка
		 */
		getLabelsPlotMarkup(plot) {
			let labelsMarkup = '';

			for (let i = 0; i < plot.labels.length; i++) {
				switch (plot.labels[i]) {
					case 'look':
						labelsMarkup += `<a href="plots.html#look" class="label">Видовой</a>`;
						break;
					case 'coast':
						labelsMarkup += `<a href="plots.html#coast" class="label">Прибрежный</a>`;
						break;
					case 'forest':
						labelsMarkup += `<a href="plots.html#forest" class="label">Прилесный</a>`;
						break;
					case 'neighbors':
						labelsMarkup += `<a href="plots.html#neighbors" class="label">Меньше соседей</a>`;
						break;
					case 'favorable':
						labelsMarkup += `<a href="plots.html#favorable" class="label">Выгодный</a>`;
						break;
				}
			}
			return labelsMarkup;
		}

		/**
		 * Метод получает разметку цены участка
		 * @param {PlotDTO} plot объект с информацией об участке
		 * @returns {string} html-разметка цены участка, разделенная пробелами по тысячам
		 */
		getPricePlotMarkup(plot) {
			let price = this.formatNumber(plot.price);
			return `<span class="card__price"><span class="card__price_big">${price}</span> руб.</span>`;
		}

		/**
		 * Метод получает разметку старой цены участка
		 * @param {PlotDTO} plot объект с информацией об участке
		 * @returns {string} html-разметка старой цены участка, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldPlotMarkup(plot) {
			if (plot.priceOld != null) {
				let priceOld = this.formatNumber(plot.priceOld);
				return `<span class="card__price card__price_old">${priceOld} руб.</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Метод отрисовывает карточку поселка
		 * @param {TownshipDTO} township объект с информацией о поселке
		 */
		renderCardTownship(township) {

			let labelsMarkup = this.getLabelsTownshipMarkup(township);
			let priceMarkup = this.getPriceTownshipMarkup(township);
			let priceOldMarkup = this.getPriceOldTownshipMarkup(township);

			let townshipMarkup = `<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToTownshipsImages}/${township.imageMiddle});" data-type="township" data-id="${township.id}">
					<div class="card__labels">
						${labelsMarkup}
					</div>
					<button type="button" class="liked card__liked" aria-label="Убрать / поставить лайк">
						<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon active">
							<path
								d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
								stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
					<a href="town-card.html#${township.id}" class="card__bottom">
						<div class="card__bottom-inner">
							<h2 class="h3 card__name">${township.name}</h2>
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
				</div>`;

			this.wrapEl.insertAdjacentHTML('beforeend', townshipMarkup);
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
		 * Метод форматирует число, разбивая его на разряды
		 * @param {number} number число, которое нужно отформатировать
		 * @returns {string} отформатированное число
		 */
		formatNumber(number) {
			return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
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
	}

	window.addEventListener('load', () => {
		let liked = new Liked();
		liked.renderLikedCards(townships, plots);
	});
})();