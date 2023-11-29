(function () {
	"use strict";

	/**
	 * Класс для управления планом поселка
	 */
	class Plan {
		constructor() {
			this.galleryPlanEl = document.querySelector('#gallery-plan');
			this.planLeftEl = document.querySelector('.plan__left');

			this.pathToTownshipsPlanImages = 'assets/img/dist/townships/plans';
		}

		/**
		 * Метод вставляет план поселка на страницу
		 * @param {TownshipDTO} township объект с информацией о поселке
		 */
		insertPlanIntoPage(township) {
			let planMarkup = `<a aria-label="Открыть план поселка" href="${this.pathToTownshipsPlanImages}/${township.plan}" data-lg-size="1600-2400" data-src="${this.pathToTownshipsPlanImages}/${township.plan}" data-sub-html="План поселка ${township.name}">
				<span class="plan__play">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="white"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
							stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
			</a>`;
			this.galleryPlanEl.insertAdjacentHTML('afterbegin', planMarkup);

			if(window.innerWidth <= 576){
				this.planLeftEl.style.background = `center / cover no-repeat url(${this.pathToTownshipsPlanImages}/${township.planMiddle})`;
			} else{
				this.planLeftEl.style.background = `center / cover no-repeat url(${this.pathToTownshipsPlanImages}/${township.plan})`;
			}

			this.addLightGallery();
		}

		/**
		 * Метод добавляет плагин галереи изображений
		 */
		addLightGallery() {
			lightGallery(document.getElementById("gallery-plan"), {
				speed: 500,
				plugins: [lgZoom, lgHash],
				mobileSettings: {
					controls: true,
					showCloseIcon: true,
					download: true,
				},
			});
		}

		/**
		 * Метод находит поселок для того, чтобы дальше вставить его план на страницу
		 * @param {TownshipDTO[]} townships массив поселков из файла townships.js
		 * @param {PlotDTO[]} plots массив участков из файла plots.js
		 */
		findTownship(townships, plots) {
			let hashPage = location.hash.replace(/#/, '');
			let pathnamePage = document.location.pathname.replace(/\/kashirka.ru/, '');
			let idTownship = 0;

			switch (pathnamePage) {
				case '/town-card.html':
					idTownship = townships.findIndex(x => x.id == hashPage);
					this.insertPlanIntoPage(townships[idTownship]);
					break;
				case '/plot-card.html':
					let idPlot = plots.findIndex(x => x.id == hashPage);
					let id = plots[idPlot].townshipId;
					idTownship = townships.findIndex(x => x.id == id);
					this.insertPlanIntoPage(townships[idTownship]);
					break;
			}
		}
	}

	window.addEventListener('load', () => {
		let plan = new Plan();
		plan.findTownship(townships, plots);
	});
})();