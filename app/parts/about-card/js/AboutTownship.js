(function () {
	"use strict";

	/**
	 * Класс для управления информацией о поселке
	 */
	class AboutTownship {
		constructor() {
			this.wrapEl = document.querySelector('.about-card__wrap');
		}

		/**
		 * Метод вставляет текст о поселке на страницу
		 * @param {TownshipDTO} township объект с информацией о поселке
		 */
		insertTextIntoPage(township) {
			let textMarkup = `<p class="txt about-card__txt">${township.description}</p>`;

			this.wrapEl.insertAdjacentHTML('beforeend', textMarkup); 
		}
	}

	window.addEventListener('load', () => {
		let aboutTownship = new AboutTownship();
		let idTownship = location.hash.replace(/#/, '');
		let id = townships.findIndex(x => x.id == idTownship);
		aboutTownship.insertTextIntoPage(townships[id]);
	});
})();