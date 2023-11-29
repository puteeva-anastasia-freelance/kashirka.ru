(function () {
	"use strict";

	/**
	 * Класс для управления футером сайта
	 */
	class Footer {
		constructor() {
			this.buttonWriteElems = document.querySelectorAll('.button__write');
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
		}

		/**
		 * Метод добавляет кнопкам "Написать нам" слушатель события клика
		 */
		addButtonsWriteClickListener() {
			this.buttonWriteElems.forEach((button) => {
				button.addEventListener('click', () => {
					let formToWrite = this.getFormToWrite();
					this.popUpOverlayEl.style.display = 'block';
					this.popUpOverlayEl.insertAdjacentHTML('afterend', formToWrite);
					this.addMaskPhone();
					this.checkComplianceWithPolicy();
					this.addCloseElClickListener();
					this.addPopUpElemsClickListener();
				});
			});
		}

		/**
		 * Метод добавляет "Крестику" слушатель события клика
		 */
		addCloseElClickListener() {
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
		 * Метод проверяет согласие с обработкой персональных данных
		 */
		checkComplianceWithPolicy() {
			let formEl = document.querySelector('.pop-up__form');
			let checkboxEl = formEl.querySelector('.policy__checkbox');
			let policyErrorEl = formEl.querySelector('.policy__error');

			formEl.addEventListener('submit', (event) => {
				if (checkboxEl.checked == false) {
					event.preventDefault();
				}
			});

			checkboxEl.addEventListener('click', () => {
				if (checkboxEl.checked == true) {
					policyErrorEl.style.display = 'none';
				} else {
					policyErrorEl.style.display = 'block';
				}
			});
		}

		/**
		 * Метод добавляет маску телефона
		 */
		addMaskPhone() {
			$('.input__tel').mask('+7 (999) 999-99-99');
		}

		/**
		 * Метод получает форму "Написать нам"
		 * @returns {string} html-разметка формы "Написать нам"
		 */
		getFormToWrite() {
			return `<div class="pop-up">
			<div class="pop-up__container">
				<div class="pop-up__body pop-up__body_write">
					<h4 class="h3 pop-up__title">Написать нам</h4>
					<form action="#" class="pop-up__form">
						<input class="pop-up__input" id="nameWriteUs" type="text" placeholder="Введите ваше имя" name="name">
						<input class="pop-up__input input__tel" id="telWriteUs" type="tel" placeholder="Номер телефона" required name="phone">
						<textarea class="pop-up__textarea" name="message" id="messageWriteUs" placeholder="Сообщение" required></textarea>
						<button class="pop-up__submit button" type="submit">Отправить</button>
						<div class="policy">
							<input class="policy__checkbox" id="privacy-policy-write-us" type="checkbox" name="privacy-policy" checked>
							<label class="policy__label" for="privacy-policy-write-us">Нажимая на&nbsp;кнопку, вы&nbsp;даете согласие
								на&nbsp;<a href="privacy-policy.html" target="_blank" class="policy__link"
									title="Ознакомиться с обработкой персональных данных">обработку персональных данных</a></label>
							<span class="policy__error">Чтобы отправить сообщение, подтвердите согласие на&nbsp;обработку персональных данных, нажав на&nbsp;кнопку выше</span>
						</div>
					</form>
					<button type="button" class="pop-up__close">
						<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="pop-up__close-icon">
								<path d="M14.8571 1.14282L1.14282 14.8571" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M1.14282 1.14282L14.8571 14.8571" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			</div>
		</div>`
		}
	}

	window.addEventListener('load', () => {
		let footer = new Footer();
		footer.addButtonsWriteClickListener();
	});
})();