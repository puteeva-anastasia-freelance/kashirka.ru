(function () {
	"use strict";

	/**
	 * Класс для управления информацией об участке
	 */
	class AboutPlot {
		constructor() {
			this.wrapEl = document.querySelector('.about-card__wrap');
		}

		/**
		 * Метод вставляет текст об участке на страницу
		 * @param {PlotDTO} plot объект с информацией об участке
		 */
		insertTextIntoPage(plot) {
			let textMarkup = `<p class="txt about-card__txt">${plot.description}</p>`;

			this.wrapEl.insertAdjacentHTML('beforeend', textMarkup);
		}
	}

	window.addEventListener('load', () => {
		let aboutPlot = new AboutPlot();
		let idPlot = location.hash.replace(/#/, '');
		let id = plots.findIndex(x => x.id == idPlot);
		aboutPlot.insertTextIntoPage(plots[id]);
	});
})();