(function () {
	"use strict";

	/**
	 * Класс для управления "Хлебными крошками"
	 */
	class Breadcrumbs {
		constructor() {
			this.breadcrumbsLinkElems = document.querySelectorAll('.breadcrumbs__link');
			this.breadcrumbsListEl = document.querySelector('.breadcrumbs__list');
			this.breadcrumbsHomeEl = document.querySelector('.breadcrumbs__home');
		}

		/**
		 * Метод отрисовывает "хлебные крошки" на странице
		 */
		renderBreabcrumbsPage() {
			let hashPage = location.hash.replace(/#/, '');

			let pathnamePage = document.location.pathname.replace(/\/kashirka.ru/, '');

			switch (pathnamePage) {
				case '/townships.html':
					this.getTitleAndPathPage('Поселки', 'townships.html');
					break;
				case '/plots.html':
					this.getTitleAndPathPage('Участки', 'plots.html');
					break;
				case '/all-news.html':
					this.getTitleAndPathPage('Новости', 'all-news.html');
					break;
				case '/liked.html':
					this.getTitleAndPathPage('Избранное', 'liked.html');
					break;
				case '/about-company.html':
					this.getTitleAndPathPage('О компании', 'about-company.html');
					break;
				case '/contacts.html':
					this.getTitleAndPathPage('Контакты', 'contacts.html');
					break;
				case '/news.html':
					let atricleEl = document.querySelector('.article__item');
					this.getTitleAndPathPage('Новости', 'all-news.html');
					this.addTitleInBreabcrumbs(atricleEl.dataset.id);
					break;
				case '/town-card.html':
					this.getTitleAndPathPage('Поселки', 'townships.html');
					this.addTitleInBreabcrumbs(hashPage);
					this.repaintInColor('white');
					break;
				case '/plot-card.html':
					this.getTitleAndPathPage('Участки', 'plots.html');
					this.addTitleInBreabcrumbs(hashPage);
					this.repaintInColor('white');
					break;
				case '/privacy-policy.html':
					this.getTitleAndPathPage('Политика конфиденциальности', 'privacy-policy.html');
					break;
				case '/terms-use.html':
					this.getTitleAndPathPage('Пользовательское соглашение', 'terms-use.html');
					break;
			}
		}

		/**
		 * Метод получает название страницы и путь до страницы
		 * @param {string} titlePage название страницы
		 * @param {string} pathToPage путь до страницы
		 */
		getTitleAndPathPage(titlePage, pathToPage) {
			this.breadcrumbsLinkElems[this.breadcrumbsLinkElems.length - 1].textContent = titlePage;
			this.breadcrumbsLinkElems[this.breadcrumbsLinkElems.length - 1].href = pathToPage;
		}

		/**
		 * Метод добавляет название заголовка страницы и хэш-страницы в "хлебные крошки"
		 * @param {string} id идентификатор карточки
		 */
		addTitleInBreabcrumbs(idCard) {
			let titlePageEl = document.querySelector('.h1-title');
			this.breadcrumbsListEl.insertAdjacentHTML('beforeend', `<li class="breadcrumbs__item"><a href="#${idCard}" class="breadcrumbs__link">${titlePageEl.textContent}</a></li>`);
		}

		/**
		 * Метод перекрашивает "хлебные крошки" в переданный цвет
		 * @param {string} color цвет, в который нужно перекрасить "хлебные крошки"
		 */
		repaintInColor(color) {
			let breadcrumbsItemElems = document.querySelectorAll('.breadcrumbs__item');
			let breadcrumbsLinkElems = document.querySelectorAll('.breadcrumbs__link');

			breadcrumbsItemElems.forEach((breadcrumbsItemEl) => {
				breadcrumbsItemEl.classList.add(color);
			});

			breadcrumbsLinkElems.forEach((breadcrumbsLinkEl) => {
				breadcrumbsLinkEl.classList.add(color);
			});

			this.breadcrumbsHomeEl.classList.add(color);
		}
	}

	window.addEventListener('load', () => {
		let breadcrumbs = new Breadcrumbs();
		breadcrumbs.renderBreabcrumbsPage();
	});

})();