(function () {
	"use strict";

	/**
	 * Класс для отрисовки всех карточек новостей
	 */
	class NewsAllCards {
		constructor() {
			this.pathToNewsImages = 'assets/img/dist/news';
			this.wrapEl = document.querySelector('.news__wrap');
			this.tabsWrapEl = document.querySelector('.news__tabs .swiper-wrapper');
			this.numberOfCardsOnDesktopAndTablet = 12;
			this.numberOfCardsOnMobile = 8;
		}

		/**
		 * Метод добавляет слайды с табами на страницу
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 */
		addSwiperSlidesIntoPage(townships) {
			let tabsMarkup = '';

			for (let township of townships) {
				tabsMarkup += this.getTabMarkup(township);
			}

			this.tabsWrapEl.insertAdjacentHTML('beforeend', tabsMarkup);
		}

		/**
		 * Этот метод получает разметку таба
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @returns {string} html-разметка таба
		 */
		getTabMarkup(township) {
			return `<div class="swiper-slide tab__slide">
			<button type="button" class="tab" data-tab="${township.id}">${township.name}</button>
		</div>`;
		}

		/**
		 * Метод получает ширину экрана
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 */
		getWindowWidth(news) {
			let windowWidth = window.innerWidth;
			let numberOfCards = this.getNumberCardsNews(windowWidth);
			this.renderCategoryNews(numberOfCards, news);

			window.addEventListener('resize', () => {
				let newWindowWidth = window.innerWidth;

				if (newWindowWidth != windowWidth) {
					windowWidth = newWindowWidth;
					numberOfCards = this.getNumberCardsNews(windowWidth);
					this.renderCategoryNews(numberOfCards, news);
				}
			});
		}

		/**
		 * Метод получает количество карточек новостей на странице
		 * @param {number} windowWidth ширина экрана
		 * @returns {number} количество карточек на странице
		 */
		getNumberCardsNews(windowWidth) {
			if (windowWidth > 576) {
				return this.numberOfCardsOnDesktopAndTablet;
			} else {
				return this.numberOfCardsOnMobile;
			}
		}

		/**
		 * Отрисовываем категорию новости
		 * @param {number} numberOfCards количество карточек новостей, которые необходимо отобразить на странице
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 */
		renderCategoryNews(numberOfCards, news) {
			let category = 'Все проекты';
			let count = this.getNumberCardsCategory(category, news);
			this.insertNewsIntoPage(numberOfCards, category, news);
			this.addButtonMore(numberOfCards, news, category, count);
			this.changeStyleBtn(document.querySelector('.tab'));

			let tabElems = document.querySelectorAll('.tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.activateTab(numberOfCards, tabEl, tabEl.dataset.tab, news);
				});
			});
		}

		/**
		 * Метод активирует таб
		 * @param {number} numberOfCards количество карточек новостей, которые необходимо отобразить на странице
		 * @param {HTMLButtonElement} tabEl активный таб
		 * @param {string} category категория новости
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 */
		activateTab(numberOfCards, tabEl, category, news) {
			let count = this.getNumberCardsCategory(category, news);
			this.insertNewsIntoPage(numberOfCards, category, news);
			this.addButtonMore(numberOfCards, news, category, count);
			this.changeStyleBtn(tabEl);
		}

		/**
		 * Метод получает количество карточек нужной категории
		 * @param {string} category нужная категории 
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 * @returns {number} count количество новостей нужной категории
		 */
		getNumberCardsCategory(category, news) {
			let count = 0;
			for (let item of news) {
				if (category == 'Все проекты') {
					count = news.length;
					return count;
				} else if (item.townshipId == category || item.townshipId == 'Все проекты') {
					count++;
				}
			}
			return count;
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
		 * Метод добавляет кнопку "Показать еще"
		 * @param {number} numberOfCards количество карточек новостей, которые необходимо отобразить на странице
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 * @param {string} category категория новости
		 * @param {number} count количество новостей нужной категории
		 */
		addButtonMore(numberOfCards, news, category, count) {
			if (count > numberOfCards) {
				this.wrapEl.insertAdjacentHTML('beforeend', '<div class="news__inner"><button type="button" class="button news__more">Показать еще</button></div>');
				let moreEl = document.querySelector('.news__more');
				let newsMarkup = '';

				moreEl.addEventListener('click', () => {
					for (let i = 0; i < news.length; i++) {
						if (category == 'Все проекты') {
							newsMarkup += this.getNewsMarkup(news[i]);
						} else if (news[i].townshipId == category || news[i].townshipId == 'Все проекты') {
							newsMarkup += this.getNewsMarkup(news[i]);
						}
					}

					this.wrapEl.innerHTML = '';
					this.wrapEl.insertAdjacentHTML('afterbegin', newsMarkup);
				});
			}
		}

		/**
		 * Метод вставляет карточки новостей нужной категории на страницу
		 * @param {number} numberOfCards количество карточек новостей, которые необходимо отобразить на странице
		 * @param {string} category категория новости
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 */
		insertNewsIntoPage(numberOfCards, category, news) {
			let newsMarkup = '';
			let count = 0;
			let i = 0;

			while (count < numberOfCards && i < news.length) {
				if (category == 'Все проекты') {
					newsMarkup += this.getNewsMarkup(news[i]);
					count++;
				} else if (news[i].townshipId == category || news[i].townshipId == 'Все проекты') {
					newsMarkup += this.getNewsMarkup(news[i]);
					count++;
				}
				i++;
			}

			this.wrapEl.innerHTML = '';
			this.wrapEl.insertAdjacentHTML('afterbegin', newsMarkup);

			this.setSameHeightImage();
		}

		/**
		 * Метод устанавливает одинаковую высоту картинкам новостей
		 */
		setSameHeightImage() {
			let widthItemEl = document.querySelector('.news__item').clientWidth;
			let imgElems = document.querySelectorAll('.news__img');

			imgElems.forEach((imgEl) => {
				imgEl.style.height = `${widthItemEl * 0.75}px`;
			});
		}

		/**
		 * Этот метод принимает один из объектов из массива news в файле news.js
		 * @param {NewsDTO} item объект с информацией о новости
		 * @returns {string} html-разметка карточки новости
		 */
		getNewsMarkup(item) {
			let date = this.getDateNews(item);

			return `<a href="news.html#${item.id}" class="news__item">
			<div class="news__img">
				<img src="${this.pathToNewsImages}/${item.imageMiddle}" alt="${item.title}" width="424" height="316" class="news__photo">
			</div>
			<h2 class="h6 news__subtitle">${item.title}</h2>
			<p class="txt news__txt">${item.shortDescription}</p>
			<time datetime="${date}" class="news__date">${item.date}</time>
		</a>`
		}

		/**
		 * Метод получает дату новости в формате "YYYY-MM-DD"
		 * @param {NewsDTO} item объект с информацией о новости
		 * @retutns {string} дата новости в формате "YYYY-MM-DD"
		 */
		getDateNews(item) {
			var date = item.date.split(".");
			return `${date[2]}-${date[1]}-${date[0]}`;
		}

	}

	window.addEventListener('load', () => {
		let newsAllCards = new NewsAllCards();
		newsAllCards.addSwiperSlidesIntoPage(townships);
		newsAllCards.getWindowWidth(news);
	});
})();