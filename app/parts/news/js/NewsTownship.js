(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек новостей поселка
	 */
	class NewsTownship {
		constructor() {
			this.pathToNewsImages = 'assets/img/dist/news';
			this.wrapEl = document.querySelector('.news__wrap');
			this.numberOfCardsOnDesktop = 3;
			this.numberOfCardsOnTabletAndMobile = 2;
		}

		/**
		 * Метод получает ширину экрана
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 * @param {number} idTownship идентификатор поселка
		 */
		getWindowWidth(news, idTownship) {
			let windowWidth = window.innerWidth;
			let numberOfCards = this.getNumberCardsNews(windowWidth);
			this.insertNewsIntoPage(numberOfCards, news, idTownship);

			window.addEventListener('resize', () => {
				let newWindowWidth = window.innerWidth;

				if (newWindowWidth != windowWidth) {
					windowWidth = newWindowWidth;
					numberOfCards = this.getNumberCardsNews(windowWidth);
					this.insertNewsIntoPage(numberOfCards, news, idTownship);
				}
			});
		}

		/**
		 * Метод получает количество карточек новостей на странице
		 * @param {number} windowWidth ширина экрана
		 * @returns {number} количество карточек на странице
		 */
		getNumberCardsNews(windowWidth) {
			if (windowWidth > 1200) {
				return this.numberOfCardsOnDesktop;
			} else {
				return this.numberOfCardsOnTabletAndMobile;
			}
		}

		/**
		 * Метод вставляет карточки новостей на страницу
		 * @param {number} numberOfCards количество карточек новостей, которые необходимо отобразить на странице
		 * @param {NewsDTO[]} news массив новостей из файла news.js
		 * @param {number} idTownship идентификатор поселка
		 */
		insertNewsIntoPage(numberOfCards, news, idTownship) {
			let count = 0;
			let newsMarkup = '';
			this.wrapEl.innerHTML = '';

			for (let item of news) {
				if (count < numberOfCards && (item.townshipId == idTownship || item.townshipId == "Все проекты")) {
					newsMarkup += this.getNewsMarkup(item);
					count++;
				}
			}

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

			return `
			<a href="news.html#${item.id}" class="news__item">
				<div class="news__img">
					<img src="${this.pathToNewsImages}/${item.imageMiddle}" alt="${item.title}" width="424" height="316" class="news__photo">
				</div>
				<h3 class="h6 news__subtitle">${item.title}</h3>
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
		let newsTownship = new NewsTownship();
		let idTownship = location.hash.replace(/#/, '');
		newsTownship.getWindowWidth(news, idTownship);
	});
})();