(function () {
	"use strict";

	/**
	 * Класс для управления картой с поселками
	 */
	class Map {
		constructor() {
			this.buttonFilterEl = document.querySelector('.map__button-filter');
			this.filterEl = document.querySelector('.map__filter');
			this.tabsEl = document.querySelector('.map__tabs');
			this.filterCloseEl = document.querySelector('.map__filter-close');
		}

		/**
		 * Метод инициализирует карту с поселками
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		init(townships) {
			this.getWindowWidth();
			this.addButtonsClickListener();
			this.addTabsClickListeners(townships);
		}

		/**
		 * Метод добавляет кнопке "Показать" слушатель события клика
		 */
		addFilterButtonShowClickListeners() {
			let filterButtonShowEl = document.querySelector('.map__filter-button-show');
			filterButtonShowEl.addEventListener('click', () => {
				this.filterEl.classList.remove('show');
			});
		}

		/**
		 * Метод добавляет табам слушатель события клика
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		addTabsClickListeners(townships) {
			let tabElems = document.querySelectorAll('.map__filter-tabs .tab');
			let tabActiveEl = document.querySelector('.map__filter-tabs .tab.active');
			let numberTownships = this.getNumberTownhips(townships, tabActiveEl);
			this.filterEl.insertAdjacentHTML('beforeend', `<button type="button" class="button map__filter-button-show">Показать ${numberTownships}</button>`);
			this.addFilterButtonShowClickListeners();

			for (let i = 0; i < tabElems.length; i++) {
				tabElems[i].addEventListener('click', () => {
					tabActiveEl = document.querySelector('.map__filter-tabs .tab.active');
					tabActiveEl.classList.remove('active');
					tabElems[i].classList.add('active');
					numberTownships = this.getNumberTownhips(townships, tabElems[i]);
					document.querySelector('.map__filter-button-show').remove();
					this.filterEl.insertAdjacentHTML('beforeend', `<button type="button" class="button map__filter-button-show">Показать ${numberTownships}</button>`);
					this.addFilterButtonShowClickListeners();
				});
			}
		}

		/**
		 * Метод получает количество поселков, подходящих под категорию: "Все", "Ближе к Москве", "У воды" или "У леса"
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {HTMLButtonElement} tabEl таб, который выбран
		 * @returns {number} количество поселков, подходящих под категорию
		 */
		getNumberTownhips(townships, tabEl) {
			switch (tabEl.dataset.tab) {
				case 'all':
					return townships.length;
				case 'moscow':
					return this.getNumberTownhipsCategory(townships, 'moscow');
				case 'water':
					return this.getNumberTownhipsCategory(townships, 'water');
				case 'forest':
					return this.getNumberTownhipsCategory(townships, 'forest');
			}
		}

		/**
		 * Метод получает количество поселков, подходящих под категорию: "Ближе к Москве", "У воды" или "У леса"
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {string} category категория поселка
		 * @return {number} count количество поселков, подходящих под категорию: "Ближе к Москве", "У воды" или "У леса"
		 */
		getNumberTownhipsCategory(townships, category) {
			let count = 0;

			for (let township of townships) {
				for (let label of township.labels) {
					if (label == category) {
						count++;
					}
				}
			}

			return count;
		}

		/**
		 * Метод получает ширину экрана
		 */
		getWindowWidth() {
			let windowWidth = window.innerWidth;

			this.setVisibilityTabs(windowWidth);

			window.addEventListener('resize', () => {
				windowWidth = window.innerWidth;
				this.setVisibilityTabs(windowWidth);
			});
		}

		/**
		 * Метод устанавливает, в зависимости от ширины экрана, видимость табам
		 * @param {number} windowWidth ширина экрана
		 */
		setVisibilityTabs(windowWidth) {
			if (windowWidth <= 576) {
				this.tabsEl.classList.add('hidden');
			} else {
				this.tabsEl.classList.remove('hidden');
			}
		}

		/**
		 * Метод добавляет кнопкам слушатель события клика
		 */
		addButtonsClickListener() {
			this.addButtonFilterClickListener();
			this.addFilterCloseClickListener();
		}

		/**
		 * Метод добавляет "Крестику" фильтра слушатель события клика
		 */
		addFilterCloseClickListener() {
			this.filterCloseEl.addEventListener('click', () => {
				this.filterEl.classList.remove('show');
			});
		}

		/**
		 * Метод добавляет кнопке "Фильтры" слушатель события клика
		 */
		addButtonFilterClickListener() {
			this.buttonFilterEl.addEventListener('click', () => {
				this.filterEl.classList.add('show');
			});
		}
	}

	window.addEventListener('load', () => {
		let map = new Map();
		map.init(townships);
	});
})();