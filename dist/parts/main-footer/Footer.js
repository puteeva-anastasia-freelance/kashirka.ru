!function(){"use strict";class e{constructor(){this.buttonWriteElems=document.querySelectorAll(".button__write"),this.popUpOverlayEl=document.querySelector(".pop-up__overlay")}addButtonsWriteClickListener(){this.buttonWriteElems.forEach(e=>{e.addEventListener("click",()=>{var e=this.getFormToWrite();this.popUpOverlayEl.style.display="block",this.popUpOverlayEl.insertAdjacentHTML("afterend",e),this.addMaskPhone(),this.checkComplianceWithPolicy(),this.addCloseElClickListener(),this.addPopUpElemsClickListener()})})}addCloseElClickListener(){document.querySelector(".pop-up__close").addEventListener("click",()=>{var e=document.querySelector(".pop-up");this.popUpOverlayEl.style.display="none",e.style.display="none"})}addPopUpElemsClickListener(){document.querySelectorAll(".pop-up").forEach(o=>{o.addEventListener("click",e=>{var t=o.querySelector(".pop-up__container");e.target==t&&(this.popUpOverlayEl.style.display="none",o.style.display="none")})})}checkComplianceWithPolicy(){var e=document.querySelector(".pop-up__form");let t=e.querySelector(".policy__checkbox"),o=e.querySelector(".policy__error");e.addEventListener("submit",e=>{0==t.checked&&e.preventDefault()}),t.addEventListener("click",()=>{1==t.checked?o.style.display="none":o.style.display="block"})}addMaskPhone(){$(".input__tel").mask("+7 (999) 999-99-99")}getFormToWrite(){return`<div class="pop-up">
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
		</div>`}}window.addEventListener("load",()=>{(new e).addButtonsWriteClickListener()})}();