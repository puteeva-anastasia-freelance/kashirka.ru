(function () {
	"use strict";

	/**
	 * Класс для управления расположением поселка
	 */
	class LocationTownship {
		constructor() {
			this.mapEl = document.querySelector('.location__map');
			this.wrapEl = document.querySelector('.location__right');
			this.panoramaEl = document.querySelector('.location__panorama');

			this.pathToTownshipsLocationImages = 'assets/img/dist/townships/location';
		}

		/**
		 * Метод вставляет расположение поселка на страницу
		 * @param {TownshipDTO} township объект с информацией о поселке
		 * @param {number} idTownship идентификатор поселка
		 * @param {InfrastructureDTO[]} infrastructures массив инфраструктуры поселка из файла infrastructures.js
		 */
		insertLocationIntoPage(township, idTownship, infrastructures) {
			let onMapMarkup = `<iframe title="Поселок на карте" src="${township.onMap}" width="880" height="468" frameborder="0" class="map__wrap"></iframe>`;
			this.mapEl.insertAdjacentHTML('afterbegin', onMapMarkup);

			this.addSelectSortingClickListeners(infrastructures, idTownship);

			this.renderCategoryInfrastructure(infrastructures, idTownship);

			this.setMapWrapHeight();
			window.addEventListener('resize', () => {
				this.setMapWrapHeight();
			});

			this.addResizeListeners();

			let panoramaMarkup = `<a target="_blank" href="${township.panorama}" class="button location__panorama-button">Смотреть</a>`;
			this.panoramaEl.insertAdjacentHTML('beforeend', panoramaMarkup);
		}

		/**
		 * Метод устанавливает карте высоту
		 */
		setMapWrapHeight() {
			document.querySelector('.map__wrap').style.height = `${this.wrapEl.offsetHeight}px`;
		}

		/**
		 * Добавляем селекту сортировки слушатель события клика по его элементам
		 * @param {InfrastructureDTO[]} infrastructures массив инфраструктуры поселка из файла infrastructures.js
		 * @param {number} idTownship идентификатор поселка
		 */
		addSelectSortingClickListeners(infrastructures, idTownship) {
			document.querySelectorAll(".location__select .option").forEach((option) => {
				option.addEventListener('click', (event) => {
					let category = event.currentTarget.dataset.value;
					this.insertInfrastructureIntoPage(category, infrastructures, idTownship);
					this.addOptionCategoryElClassesAndText(category);
				})
			})
		}

		/**
		 * Метод добавляет элементу .option нужной категории классы selected и focus и текст выбранному селекту
		 * @param {string} category категория инфраструктуры
		 */
		addOptionCategoryElClassesAndText(category) {
			let optionElems = document.querySelectorAll(`.location__select .option`);
			let optionCategoryEl = document.querySelector(`.location__select .option[data-value="${category}"`);
			let textOptionCategoryEl = optionCategoryEl.textContent;

			optionElems.forEach((option) => {
				option.classList.remove('selected', 'focus');
			});

			optionCategoryEl.classList.add('selected', 'focus');

			document.querySelector('.location__select .current').textContent = textOptionCategoryEl;
		}

		/**
		 * Отрисовываем категорию инфраструктуры
		 * @param {InfrastructureDTO[]} infrastructures массив инфраструктуры поселка из файла infrastructures.js
		 * @param {number} idTownship идентификатор поселка
		 */
		renderCategoryInfrastructure(infrastructures, idTownship) {
			let category = 'transport';
			this.insertInfrastructureIntoPage(category, infrastructures, idTownship);
			this.changeStyleBtn(document.querySelector('.location .tab'));

			let tabElems = document.querySelectorAll('.location .tab');
			tabElems.forEach((tabEl) => {
				tabEl.addEventListener('click', () => {
					this.insertInfrastructureIntoPage(tabEl.dataset.tab, infrastructures, idTownship);
					this.changeStyleBtn(tabEl);
				});
			});
		}

		/**
		 * Метод изменяет стиль кнопки, которая относится к нужной категории
		 * @param {HTMLButtonElement} button кнопка, которой необходимо изменить стиль
		 */
		changeStyleBtn(button) {
			if (document.querySelector('.location .tab.active')) {
				document.querySelector('.location .tab.active').classList.remove('active');
			}
			button.classList.add('active');
		}

		/**
		 * Метод вставляет карточки инфраструктуры поселка нужной категории на страницу
		 * @param {string} category категория инфраструктуры
		 * @param {InfrastructureDTO[]} infrastructures массив инфраструктуры поселка из файла infrastructures.js
		 * @param {number} idTownship идентификатор поселка
		 */
		insertInfrastructureIntoPage(category, infrastructures, idTownship) {
			let infrastructureMarkup = '';
			this.wrapEl.setAttribute('data-category', category);

			for (let i = 0; i < infrastructures.length; i++) {
				if (infrastructures[i].townshipId == idTownship && infrastructures[i].type == category) {
					infrastructureMarkup += this.getInfrastructureMarkup(infrastructures[i]);
				}
			}

			this.wrapEl.innerHTML = '';
			this.wrapEl.insertAdjacentHTML('afterbegin', infrastructureMarkup);
		}

		/**
		 * Метод добавляет слушатель события изменения ширины экрана
		 */
		addResizeListeners() {
			window.addEventListener('resize', () => {
				let category = this.wrapEl.dataset.category;
				this.addOptionCategoryElClassesAndText(category);
				this.changeStyleBtn(document.querySelector(`.location .tab[data-tab="${category}"]`));
			});
		}

		/**
		 * Этот метод получает разметку инфраструктуры поселка
		 * @param {InfrastructureDTO} infrastructure объект с информацией об инфраструктуре поселка
		 * @returns {string} html-разметка инфраструктуры поселка
		 */
		getInfrastructureMarkup(infrastructure) {
			let distance = this.getDistanceInfrastructure(infrastructure);

			return `<div class="location__inner" style="background: center / cover no-repeat url(${this.pathToTownshipsLocationImages}/${infrastructure.image});">
			<span class="location__distance">
				<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M2.42547 10.186L3.45605 11.835L2.66106 13.9993C2.54327 14.3085 2.24882 14.4998 1.93961 14.4998C1.85129 14.4998 1.76297 14.4851 1.67465 14.4557C1.2771 14.3084 1.07098 13.8668 1.21826 13.4692L2.42547 10.186Z"
						fill="white" />
					<path
						d="M0.128756 6.38764L0.98269 5.13613C1.21828 4.79753 1.55689 4.53246 1.93963 4.38529C3.50024 3.78162 3.70637 3.79642 3.85365 3.79642L4.95787 3.87006C5.26711 3.88474 5.5026 3.97317 6.66577 5.44547C6.76888 5.57795 6.91605 5.66627 7.09268 5.71043L8.24108 5.96071C8.60915 6.03434 8.82995 6.38762 8.75644 6.7557C8.6828 7.12377 8.31472 7.34457 7.96145 7.27106L6.81305 7.02078C6.34186 6.91767 5.92962 6.6527 5.62052 6.28463C5.57635 6.22578 5.53219 6.16683 5.48803 6.12267L4.42798 9.2145L6.98973 13.322C7.21053 13.69 7.10752 14.1612 6.73945 14.382C6.60696 14.4556 6.47449 14.4998 6.3272 14.4998C6.06224 14.4998 5.81185 14.3673 5.67937 14.1317L2.4992 9.02285C2.17529 8.50749 2.08695 7.85979 2.24892 7.27079L2.76428 5.50405C2.66116 5.54822 2.54347 5.59238 2.4109 5.63654C2.27841 5.69538 2.16062 5.78381 2.07229 5.9015L1.21836 7.15301C1.08588 7.34444 0.879757 7.44744 0.673635 7.44744C0.541152 7.44744 0.408674 7.40328 0.290864 7.32964C-0.00367546 7.10884 -0.0919867 6.69661 0.128803 6.38748L0.128756 6.38764Z"
						fill="white" />
					<path
						d="M3.12643 1.83888C3.0376 2.65525 3.62741 3.38914 4.44375 3.47797C5.26022 3.56691 5.994 2.9771 6.08294 2.16066C6.17178 1.34429 5.58197 0.610405 4.76553 0.521567C3.94916 0.43263 3.21527 1.02244 3.12643 1.83888Z"
						fill="white" />
				</svg>
				<span class="location__distance-number">${distance}</span>
			</span>
			<span class="location__place">${infrastructure.place}</span>
		</div>`;
		}

		/**
		 * Метод получает расстояние до инфраструктуры
		 * @param {InfrastructureDTO} infrastructure объект с информацией об инфраструктуре поселка
		 * @returns {string} расстояние до инфраструктуры
		 */
		getDistanceInfrastructure(infrastructure) {
			if (infrastructure.distance >= 1000) {
				return `${infrastructure.distance / 1000} км`;
			} else {
				return `${infrastructure.distance} м`;
			}
		}
	}

	window.addEventListener('load', () => {
		NiceSelect.bind(document.querySelector('#location-select'));

		let locationTownship = new LocationTownship();
		let idTownship = location.hash.replace(/#/, '');
		let id = townships.findIndex(x => x.id == idTownship);
		locationTownship.insertLocationIntoPage(townships[id], idTownship, infrastructures);
	});
})();