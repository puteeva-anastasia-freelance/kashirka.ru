(function () {
	"use strict";

	/**
	 * Класс для отрисовки всех карточек участков
	 */
	class PlotsAllCards {
		constructor() {
			this.pathToPlotsImages = 'assets/img/dist/plots';
			this.wrapEl = document.querySelector('.card__wrap');
			this.likedCountEl = document.querySelector('.main-header__liked-count');
			this.numberOfCards = 12;
			this.arrayLiked = [];
			this.quantityPlotsEl = document.querySelector('.h1__number');
			this.bigArea = 10;
			this.favorablePlot = 200000;
		}

		/**
		 * Метод отрисовывает количество участов
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		renderQuantityPlots(plots) {
			this.quantityPlotsEl.textContent = plots.length;
		}

		/**
		 * Метод создает массив лайков
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		createArrayLiked(plots) {
			for (let i = 0; i < plots.length; i++) {
				this.arrayLiked[i] = {
					id: plots[i].id,
					liked: false
				}
			}
		}

		/**
		 * Добавляем селекту сортировки слушатель события клика по его элементам
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		addSelectSortingClickListeners(plots) {
			document.querySelectorAll(".sorting .option").forEach((option) => {
				option.addEventListener('click', (event) => {
					let category = document.querySelector('.tab.active').dataset.tab;
					let count = this.getNumberCardsCategory(category, plots);
					this.sortingCards(event.currentTarget.dataset.value, category, plots);
					this.addButtonMore(plots, category, count);
					this.addCardHoverListeners();
					this.setPlotsLiked();
				})
			})
		}

		/**
		 * Метод сортирует карточки участков по выбранному типу сортировки
		 * @param {string} typeSorting тип сортировки
		 * @param {string} category категория
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		sortingCards(typeSorting, category, plots) {
			switch (typeSorting) {
				case 'relevance':
					plots.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
					this.insertPlotsIntoPage(category, plots);
					break;
				case 'cheaper':
					plots.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
					this.insertPlotsIntoPage(category, plots);
					break;
				case 'expensive':
					plots.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
					this.insertPlotsIntoPage(category, plots);
					break;
				case 'distance':
					plots.sort((a, b) => parseFloat(a.distanceTownship) - parseFloat(b.distanceTownship));
					this.insertPlotsIntoPage(category, plots);
					break;
			}
		}

		/**
		 * Отрисовываем категорию участков
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		renderCategoryPlots(plots, townships) {
			let category = 'all';
			let count = this.getNumberCardsCategory(category, plots);

			this.setDistance(townships, plots);
			this.createArrayLiked(plots);
			this.renderQuantityPlots(plots);
			this.addSelectSortingClickListeners(plots);
			this.insertPlotsIntoPage(category, plots);
			this.changeStyleBtn(document.querySelector('.tab'));
			this.addButtonMore(plots, category, count);
			this.addCardHoverListeners();
			this.chooseCategory(plots);
			this.addHashPageHashChangeListeners(plots);

			let tabElems = document.querySelectorAll('.tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.activateTab(tabEl, tabEl.dataset.tab, plots);
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
		 * Метод активирует таб
		 * @param {HTMLButtonElement} tabEl активный таб
		 * @param {string} category категория участка
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		activateTab(tabEl, category, plots) {
			let count = this.getNumberCardsCategory(category, plots);
			this.insertPlotsIntoPage(tabEl.dataset.tab, plots);
			this.changeStyleBtn(tabEl);
			this.setPlotsLiked();
			this.addButtonMore(plots, tabEl.dataset.tab, count);
			this.addCardHoverListeners();
			this.changeHashPage(category);
		}

		/**
		 * Метод получает количество карточек нужной категории
		 * @param {string} category нужная категории 
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @returns {number} count количество участков нужной категории
		 */
		getNumberCardsCategory(category, plots) {
			let count = 0;

			for (let plot of plots) {
				let priceHundred = plot.price / plot.area;

				if (category == 'all') {
					count = plots.length;
					return count;
				} else if (category == 'sale' && plot.priceOld != null) {
					count++;
				} else if (category == 'big' && plot.area >= this.bigArea) {
					count++;
				} else if (category == 'favorable' && priceHundred <= this.favorablePlot) {
					count++;
				} else {
					plot.labels.forEach((label) => {
						if (label == category) {
							count++;
						}
					});
				}
			}
			return count;
		}

		/**
		 * Метод изменяет хэш страницы
		 * @param {string} category категория участка
		 */
		changeHashPage(category) {
			if (category == 'all') {
				history.pushState("", document.title, window.location.href.replace(/\#(.+)/, '').replace(/http(s?)\:\/\/([^\/]+)/, ''));
			} else {
				window.location.hash = `#${category}`;
			}
		}

		/**
		 * Метод выбирает нужную категорию участка по хэшу страницы
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		chooseCategory(plots) {
			switch (location.hash.replace(/#/, '')) {
				case 'look':
					this.activateTab(document.querySelector('[data-tab="look"]'), "look", plots);
					break;
				case 'coast':
					this.activateTab(document.querySelector('[data-tab="coast"]'), "coast", plots);
					break;
				case 'forest':
					this.activateTab(document.querySelector('[data-tab="forest"]'), "forest", plots);
					break;
				case 'neighbors':
					this.activateTab(document.querySelector('[data-tab="neighbors"]'), "neighbors", plots);
					break;
				case 'favorable':
					this.activateTab(document.querySelector('[data-tab="favorable"]'), "favorable", plots);
					break;
				default:
					this.activateTab(document.querySelector('[data-tab="all"]'), "all", plots);
			}
		}

		/**
		 * Метод добавляет хэшу страницы слушатель изменения хэша страницы
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		addHashPageHashChangeListeners(plots) {
			window.addEventListener('hashchange', () => {
				let hashPage = location.hash.replace(/#/, '');
				this.activateTab(document.querySelector(`[data-tab="${hashPage}"]`), hashPage, plots);
			});
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
		 * Метод добавляет кнопку "Показать еще"
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 * @param {string} category категория участка
		 * @param {number} count количество участков нужной категории
		 */
		addButtonMore(plots, category, count) {
			if (count > this.numberOfCards) {
				this.wrapEl.insertAdjacentHTML('beforeend', '<button type="button" class="button card__more">Показать еще</button>'); 
				let cardMoreEl = document.querySelector('.card__more');
				let plotsMarkup = '';

				cardMoreEl.addEventListener('click', () => {
					for (let i = 0; i < plots.length; i++) {
						let priceHundred = plots[i].price / plots[i].area;

						if (category == 'all') {
							plotsMarkup += this.getPlotMarkup(plots[i]);
						} else if (category == 'sale' && plots[i].priceOld != null) {
							plotsMarkup += this.getPlotMarkup(plots[i]);
						} else if (category == 'big' && plots[i].area >= this.bigArea) {
							plotsMarkup += this.getPlotMarkup(plots[i]);
						} else if (category == 'favorable' && priceHundred <= this.favorablePlot) {
							plotsMarkup += this.getPlotMarkup(plots[i]);
						} else {
							plots[i].labels.forEach((label) => {
								if (label == category) {
									plotsMarkup += this.getPlotMarkup(plots[i]);
								}
							});
						}
					}
					this.wrapEl.innerHTML = '';
					this.wrapEl.insertAdjacentHTML('afterbegin', plotsMarkup); 
					this.addButtonLikedClickListeners();
					this.setPlotsLiked();
					this.addCardHoverListeners();
				})
			}
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
		 * Метод вставляет карточки участков нужной категории на страницу
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
		 * Метод добавляет кнопке "Лайк" слушатель события клика
		 */
		addButtonLikedClickListeners() {
			let likedButtons = document.querySelectorAll('.liked');

			likedButtons.forEach((button) => {
				button.addEventListener('click', () => {
					let idPlot = button.parentElement.dataset.plot;
					let likedIconEl = button.querySelector('.liked__icon');

					if (likedIconEl.classList.contains('active')) {
						this.arrayLiked[idPlot].liked = false;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity - 1;
					} else {
						this.arrayLiked[idPlot].liked = true;
						this.likedCountEl.dataset.quantity = +this.likedCountEl.dataset.quantity + 1;
					}

					this.setPlotsLiked();
					this.likedCountEl.textContent = this.likedCountEl.dataset.quantity;
				});
			});
		}

		/**
		 * Устанавливаем карточкам участка стиль кнопки "Нравится"
		 */
		setPlotsLiked() {
			for (let element of this.arrayLiked) {
				let cardEl = document.querySelector(`[data-plot="${element.id}"]`);
				if (cardEl) {
					if (element.liked == true) {
						cardEl.querySelector('.liked__icon').classList.add('active');
					} else {
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
		 * Этот метод принимает один из объектов из массива plots в файле plots.js
		 * @param {PlotDTO} plot объект с информацией об участке
		 * @returns {string} html-разметка карточки участка
		 */
		getPlotMarkup(plot) {
			let labelsMarkup = this.getLabelsPlotMarkup(plot);
			let priceMarkup = this.getPricePlotMarkup(plot);
			let priceOldMarkup = this.getPriceOldPlotMarkup(plot);

			return `<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToPlotsImages}/${plot.image});" data-plot="${plot.id}">
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
						<h2 class="h3 card__name">Участок ${plot.area.toFixed(2)} соток</h2>
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

	}

	window.addEventListener('load', () => {
		NiceSelect.bind(document.querySelector('#sorting'));

		let plotsAllCards = new PlotsAllCards();
		plotsAllCards.renderCategoryPlots(plots, townships);
	});
})();