(function () {
	"use strict";

	/**
	 * Класс для управления первым экраном главной страницы
	 */
	class First {
		constructor() {
			this.firstEl = document.querySelector('.first');
			this.mainHeaderEl = document.querySelector('.main-header');
			this.firstDownEl = document.querySelector('.first__down');
		}

		/**
		 * Метод добавляет окну браузера слушатель события прокрутки 
		 */
		addWindowScrollListener() {
			window.addEventListener('scroll', () => {
				if (window.scrollY > (this.firstEl.offsetHeight + this.mainHeaderEl.offsetHeight - window.innerHeight)) {
					this.firstDownEl.classList.add('position-absolute');
				} else {
					this.firstDownEl.classList.remove('position-absolute')
				}
			});
		}
	}

	window.addEventListener('load', () => {
		let first = new First();
		first.addWindowScrollListener();
	});
})();