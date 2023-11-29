(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек сотрудников
	 */
	class EmployeesCards {
		constructor() {
			this.pathToEmployeesImages = 'assets/img/dist/employees';
			this.wrapEl = document.querySelector('.employee__wrap');
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
			this.numberOfCardsOnDesktop = 8;
			this.numberOfCardsOnTablet = 6;
			this.numberOfCardsOnMobile = 4;
		}

		/**
		 * Метод вставляет карточки сотрудников на страницу
		 * @param {number} numberOfCards количество карточек сотрудников, которые необходимо отобразить на странице
		 * @param {EmployeeDTO[]} employees массив сотрудников из файла employees.js
		 */
		insertEmployeesIntoPage(numberOfCards, employees) {
			let count = 0;
			let employeesMarkup = '';
			this.wrapEl.innerHTML = '';

			this.sortEmployeesByExperience(employees);

			for (let employee of employees) {
				if (count < numberOfCards) {
					employeesMarkup += this.getEmployeeMarkup(employee);
					count++;
				}
			}

			this.wrapEl.insertAdjacentHTML('afterbegin', employeesMarkup);
		}

		/**
		 * Метод получает ширину экрана
		 * @param {EmployeeDTO[]} employees массив сотрудников из файла employees.js
		 */
		getWindowWidth(employees) {
			let windowWidth = window.innerWidth;
			let numberOfCards = this.getNumberCardsEmployees(windowWidth);
			this.insertEmployeesIntoPage(numberOfCards, employees);
			this.addButtonMore(employees, numberOfCards);
			this.addCardEmployeeClickListener(employees);

			window.addEventListener('resize', () => {
				let newWindowWidth = window.innerWidth;

				if (newWindowWidth != windowWidth) {
					windowWidth = newWindowWidth;
					numberOfCards = this.getNumberCardsEmployees(windowWidth);
					this.insertEmployeesIntoPage(numberOfCards, employees);
					this.addButtonMore(employees, numberOfCards);
					this.addCardEmployeeClickListener(employees);
				}
			});
		}

		/**
		 * Добавляем карточке сотрудника слушатель события клика
		 * @param {EmployeeDTO[]} employees массив сотрудников из файла employees.js
		 */
		addCardEmployeeClickListener(employees) {
			let employeeItemElems = document.querySelectorAll('.employee__item');
			employeeItemElems.forEach((employeeItemEl) => {
				employeeItemEl.addEventListener('click', (event) => {
					let idEmployee = +event.currentTarget.dataset.employee;
					for (let employee of employees) {
						if (employee.id == idEmployee) {
							let fullInfoAboutEmployee = this.getFullInfoAboutEmployee(employee);
							this.popUpOverlayEl.style.display = 'block';
							this.popUpOverlayEl.insertAdjacentHTML('afterend', fullInfoAboutEmployee);
						}
					}

					this.addCloseElClickListener();
					this.addPopUpElemsClickListener();
				});
			});
		}

		/**
		 * Метод добавляет "Крестику" слушатель события клика
		 */
		addCloseElClickListener(){
			let popUpCloseEl = document.querySelector('.pop-up__close');
			popUpCloseEl.addEventListener('click', () => {
				let popUpEl = document.querySelector('.pop-up');
				this.popUpOverlayEl.style.display = 'none';
				popUpEl.style.display = 'none';
			});
		}

		/**
		 * При клике на затемненный фон всплывающее окно закрывается
		 */
		addPopUpElemsClickListener() {
			let popUpElems = document.querySelectorAll('.pop-up');
			popUpElems.forEach((popUpEl) => {
				popUpEl.addEventListener('click', (event) => {
					let popUpContainerEl = popUpEl.querySelector('.pop-up__container');
					if (event.target == popUpContainerEl) {
						this.popUpOverlayEl.style.display = 'none';
						popUpEl.style.display = 'none';
					}
				})
			});
		}

		/**
		 * Метод получает полную информацию о сотруднике
		 * @param {EmployeeDTO} employee объект с информацией о сотруднике
		 * @returns {string} html-разметка карточки сотрудника
		 */
		getFullInfoAboutEmployee(employee) {
			let phoneWithoutExtraSymbols = this.getPhoneEmployeeWithoutExtraSymbols(employee.phone);

			return `<div class="pop-up">
			<div class="pop-up__container">
				<div class="pop-up__body">
					<div class="pop-up__img">
						<img src="assets/img/dist/employees/${employee.photo}" alt="${employee.name} ${employee.surname}" width="310" height="340" class="pop-up__photo">
					</div>
					<div class="pop-up__right">
						<h4 class="h5 pop-up__name">${employee.name} ${employee.surname}</h4>
						<span class="pop-up__post">${employee.post}</span>
						<p class="txt pop-up__desc">${employee.info}</p>
						<div class="pop-up__inner">
							<a href="tel:${phoneWithoutExtraSymbols}" class="pop-up__contact">${employee.phone}</a>
							<a href="mailto:${employee.email}" class="pop-up__contact">${employee.email}</a>
						</div>
						<div class="pop-up__buttons">
							<a href="tel:${phoneWithoutExtraSymbols}" class="button pop-up__call">
								<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M11.771 10.096C12.6904 10.6069 13.6103 11.118 14.5297 11.6289C14.9254 11.8486 15.099 12.3149 14.9432 12.7401C14.1522 14.9012 11.8355 16.0418 9.65558 15.2462C5.19187 13.617 1.8832 10.3081 0.253778 5.84444C-0.541862 3.66458 0.598869 1.34778 2.7599 0.556778C3.18514 0.400977 3.65138 0.574566 3.87165 0.970308C4.38206 1.88973 4.8931 2.80969 5.40402 3.72905C5.64353 4.16037 5.58724 4.67234 5.25942 5.04066C4.83011 5.52375 4.40089 6.00674 3.97158 6.48932C4.88797 8.72088 6.77907 10.612 9.01066 11.5284C9.49325 11.0991 9.97623 10.6699 10.4593 10.2406C10.8282 9.91275 11.3397 9.85644 11.7709 10.096L11.771 10.096Z" fill="white"/>
								</svg>
								<span class="pop-up__buttons-txt">Позвонить</span>
							</a>
							<a href="tg://resolve?domain=${employee.tg}" class="button pop-up__tg">
								<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.5135 5.96468L15.6145 0.51013C16.261 0.267706 16.8266 0.671748 16.6246 1.64144L14.2408 12.9546C14.0792 13.7627 13.5943 13.9647 12.9074 13.5606L9.23067 10.8536L7.4529 12.5505C7.29128 12.8334 7.12966 12.995 6.72562 12.995L6.96805 9.27781L13.7559 3.13639C14.0388 2.89397 13.6751 2.73235 13.3115 2.97478L4.94785 8.26771L1.35189 7.1364C0.543805 6.89397 0.543806 6.36872 1.5135 5.96468Z" fill="white"/>
								</svg>
								<span class="pop-up__buttons-txt">Чат телеграм</span>
							</a>
						</div>
					</div>
					<button type="button" class="pop-up__close">
						<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="pop-up__close-icon">
								<path d="M14.8571 1.14282L1.14282 14.8571" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M1.14282 1.14282L14.8571 14.8571" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			</div>
		</div>`;
		}

		/**
		 * Метод получает номер телефона сотрудника без лишних символов
		 * @param {string} phone номер телефона сотрудника
		 * @returns {string} номер телефона сотрудника без лишних символов
		 */
		getPhoneEmployeeWithoutExtraSymbols(phone) {
			return phone.replace(/[\s\(\)\-]/g, '');
		}

		/**
		 * Метод добавляет кнопку "Показать еще"
		 * @param {EmployeeDTO[]} employees массив сотрудников из файла employees.js
		 * @param {number} numberOfCards количество карточек сотрудников, которые расположены нв странице
		 */
		addButtonMore(employees, numberOfCards) {
			if (employees.length > numberOfCards) {
				this.wrapEl.insertAdjacentHTML('beforeend', '<button type="button" class="button employee__all">Показать еще</button>');
				let employeeAllEl = document.querySelector('.employee__all');
				let employeesMarkup = '';
				employeeAllEl.addEventListener('click', () => {
					for (let employee of employees) {
						employeesMarkup += this.getEmployeeMarkup(employee);
					}
					this.wrapEl.innerHTML = '';
					this.wrapEl.insertAdjacentHTML('afterbegin', employeesMarkup);
					this.addCardEmployeeClickListener(employees);
				});
			}
		}

		/**
		 * Метод получает количество карточек сотрудников на странице
		 * @param {number} windowWidth ширина экрана
		 * @returns {number} количество карточек на странице
		 */
		getNumberCardsEmployees(windowWidth) {
			if (windowWidth > 1200) {
				return this.numberOfCardsOnDesktop;
			} else if (windowWidth <= 1200 && windowWidth > 576) {
				return this.numberOfCardsOnTablet;
			} else {
				return this.numberOfCardsOnMobile;
			}
		}

		/**
		 * Этот метод принимает один из объектов из массива employees в файле employees.js
		 * @param {EmployeeDTO} employee объект с информацией о сотруднике
		 * @returns {string} html-разметка карточки сотрудника
		 */
		getEmployeeMarkup(employee) {
			return `
			<div class="employee__item" data-employee="${employee.id}">
				<div class="employee__img">
					<img src="assets/img/dist/employees/${employee.photo}" alt="${employee.name} ${employee.surname}" width="310" height="340" class="employee__photo">
				</div>
				<h3 class="h4 employee__name">${employee.name} ${employee.surname}</h3>
				<span class="employee__post">${employee.post}</span>
			</div>`;
		}

		/**
		 * Метод сортирует сотрудников по опыту работы в компании
		 * @param {EmployeeDTO[]} employees массив сотрудников из файла employees.js
		 */
		sortEmployeesByExperience(employees) {
			employees.sort((a, b) => parseFloat(b.experience) - parseFloat(a.experience));
		}
	}

	window.addEventListener('load', () => {
		let employeesCards = new EmployeesCards();
		employeesCards.getWindowWidth(employees);
	});
})();