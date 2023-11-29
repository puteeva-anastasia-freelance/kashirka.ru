(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек участков
	 */
	class PlotsCards {
		constructor() {
			this.pathToPlotsImages = 'assets/img/dist/plots';
			this.wrapEl = document.querySelector('#plots .card__wrap');
			this.likedCountEl = document.querySelector('.main-header__liked-count');
			this.bigArea = 10;
			this.numberOfCards = 6;
			this.favorablePlot = 200000;
		}

		/**
		 * Метод добавляет кнопке "Лайк" слушатель события клика
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		addButtonLikedClickListeners(plots) {
			let likedButtons = document.querySelectorAll('#plots .liked');

			likedButtons.forEach((button) => {
				button.addEventListener('click', () => {
					let idPlot = button.parentElement.dataset.plot;
					let likedIconEl = button.querySelector('.liked__icon');

					if (likedIconEl.classList.contains('active')) {
						plots[idPlot].liked = false;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity - 1;
					} else {
						plots[idPlot].liked = true;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity + 1;
					}

					this.setPlotsLiked(plots);
					this.likedCountEl.textContent = this.likedCountEl.dataset.quantity;
				});
			});
		}

		/**
		 * Устанавливаем карточкам участка стиль кнопки "Нравится"
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		setPlotsLiked(plots) {
			for (let plot of plots) {
				let cardEl = document.querySelector(`[data-plot="${plot.id}"]`);
				if (cardEl) {
					if (plot.liked == true) {
						document.querySelector(`[data-plot="${plot.id}"]`).querySelector('.liked__icon').classList.add('active');
					} else if (plot.liked == false) {
						document.querySelector(`[data-plot="${plot.id}"]`).querySelector('.liked__icon').classList.remove('active');
					}
				}
			}
		}

		/**
		 * Отрисовываем категорию участков
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		renderCategoryPlots(plots, townships) {
			let category = 'all';

			this.setDistance(townships, plots);
			this.insertPlotsIntoPage(category, plots);
			this.changeStyleBtn(document.querySelector('#plots .tab'));
			this.addCardHoverListeners();

			let tabElems = document.querySelectorAll('#plots .tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.insertPlotsIntoPage(tabEl.dataset.tab, plots);
					this.changeStyleBtn(tabEl);
					this.setPlotsLiked(plots);
					this.addCardHoverListeners();
				});
			});
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
		 * Метод вставляет количество карточек участков нужной категории на страницу
		 * @param {string} category категория участка
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		insertPlotsIntoPage(category, plots) {
			let plotsMarkup = '';
			let count = 0;
			let i = 0;

			while (count < this.numberOfCards && i < plots.length) {
				let priceHundred = plots[i].price / plots[i].area;

				if (category == 'all') {
					plotsMarkup += this.getPlotMarkup(plots[i]);
					count++;
				} else if (category == 'sale' && plots[i].priceOld != null) {
					plotsMarkup += this.getPlotMarkup(plots[i]);
					count++;
				} else if (category == 'big' && plots[i].area >= this.bigArea) {
					plotsMarkup += this.getPlotMarkup(plots[i]);
					count++;
				} else if (category == 'favorable' && priceHundred <= this.favorablePlot) {
					plotsMarkup += this.getPlotMarkup(plots[i]);
					count++;
				} else {
					plots[i].labels.forEach((label) => {
						if (label == category) {
							plotsMarkup += this.getPlotMarkup(plots[i]);
							count++;
						}
					});
				}
				i++;
			}

			this.wrapEl.innerHTML = '';
			this.wrapEl.insertAdjacentHTML('afterbegin', plotsMarkup);

			this.addButtonLikedClickListeners(plots);
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
		 * Метод форматирует число, разбивая его на разряды
		 * @param {number} number число, которое нужно отформатировать
		 * @returns {string} отформатированное число
		 */
		formatNumber(number) {
			return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
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
		 * Этот метод принимает один из объектов из массива plots в файле plots.js
		 * @param {PlotDTO} plot объект с информацией об участке
		 * @returns {string} html-разметка карточки участка
		 */
		getPlotMarkup(plot) {
			let labelsMarkup = this.getLabelsPlotMarkup(plot);
			let priceMarkup = this.getPricePlotMarkup(plot);
			let priceOldMarkup = this.getPriceOldPlotMarkup(plot);

			return `
		<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToPlotsImages}/${plot.image});" data-plot="${plot.id}">
<div class="card__labels card__labels_plots">
${labelsMarkup}
</div>
<button type="button" class="liked card__liked" aria-label="Поставить / убрать лайк">
	<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon">
		<path
			d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
			stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>

<a href="plot-card.html#${plot.id}" class="card__bottom card__bottom_plots">
	<div class="card__bottom-inner">
		<h3 class="h3 card__name">Участок ${plot.area} соток</h3>
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
</div>
		`;
		}

		/**
		 * Метод изменяет стиль кнопки, которая относится к нужной категории
		 * @param {HTMLButtonElement} button кнопка, которой необходимо изменить стиль
		 */
		changeStyleBtn(button) {
			if (document.querySelector('#plots .tab.active')) {
				document.querySelector('#plots .tab.active').classList.remove('active');
			}
			button.classList.add('active');
		}
	}

	window.addEventListener('load', () => {
		let plotsCards = new PlotsCards();
		plotsCards.renderCategoryPlots(plots, townships);
	});
})();