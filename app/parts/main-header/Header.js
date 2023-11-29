(function () {
	"use strict";

	/**
	 * Класс для управления хедером сайта
	 */
	class Header {
		constructor() {
			this.menuBtnEl = document.querySelector('.main-header__menu-button');
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
			this.menuLeftEl = document.querySelector('.main-header__menu-left');
			this.menuCloseEl = document.querySelector('.main-header__menu-close');
		}

		/**
		 * Метод добавляет кнопкам меню слушатель события клика
		 */
		addButtonsMenuClickListener() {
			this.menuBtnEl.addEventListener('click', () => {
				this.popUpOverlayEl.style.display = 'block';
				this.menuLeftEl.classList.toggle('show');
			});

			this.menuCloseEl.addEventListener('click', () => {
				this.popUpOverlayEl.style.display = 'none';
				this.menuLeftEl.classList.remove('show');
			});

			this.popUpOverlayEl.addEventListener('click', () => {
				this.popUpOverlayEl.style.display = 'none';
				this.menuLeftEl.classList.remove('show');
			});

			this.changeStyleLinkMenu();
		}

		/**
		 * Метод изменяет стиль ссылки меню
		 */
		changeStyleLinkMenu() {
			let pathnamePage = document.location.pathname.replace(/\/kashirka.ru/, '');

			switch (pathnamePage) {
				case '/townships.html':
					this.getLinkMenu('Поселки');
					break;
				case '/plots.html':
					this.getLinkMenu('Участки');
					break;
				case '/all-news.html':
					this.getLinkMenu('Новости');
					break;
				case '/about-company.html':
					this.getLinkMenu('О компании');
					break;
				case '/contacts.html':
					this.getLinkMenu('Контакты');
					break;
			}
		}

		/**
		 * Метод получает ссылку меню
		 * @param {string} text текст ссылки
		 */
		getLinkMenu(text) {
			let linkMenuElems = document.querySelectorAll('.main-header__menu-nav-link');
			linkMenuElems.forEach((link) => {
				if (link.textContent == text) {
					link.classList.add('accent');
				}
			})
		}
	}

	window.addEventListener('load', () => {
		let header = new Header();
		header.addButtonsMenuClickListener();
	});
})();