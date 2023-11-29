(function () {
	"use strict";

	/**
	 * Класс для управления специальными предложениями для клиентов
	 */
	class Offer {
		constructor() {
			this.formElems = document.querySelectorAll('.offer__form');
		}

		/**
		 * Метод проверяет согласие с обработкой персональных данных
		 */
		checkComplianceWithPolicy() {
			this.formElems.forEach((formEl) => {
				let policyCheckboxEl = formEl.querySelector('.policy__checkbox');
				let policyErrorEl = formEl.querySelector('.policy__error');

				formEl.addEventListener('submit', (event) => {
					if (policyCheckboxEl.checked == false) {
						event.preventDefault();
					}
				});

				policyCheckboxEl.addEventListener('click', () => {
					if (policyCheckboxEl.checked == true) {
						policyErrorEl.style.display = 'none';
					} else {
						policyErrorEl.style.display = 'block';
					}
				});
			});
		}

		/**
		 * Метод устанавливает тегу form значение атрибута action
		 */
		setFormAction() {
			this.formElems.forEach((formEl) => {
				formEl.attributes.action.value = location.hash;
			});
		}
	}

	window.addEventListener('load', () => {
		let offer = new Offer();
		offer.checkComplianceWithPolicy();
		offer.setFormAction();
	});
})();