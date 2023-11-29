!function(){"use strict";class e{constructor(){this.pathToEmployeesImages="assets/img/dist/employees",this.wrapEl=document.querySelector(".employee__wrap"),this.popUpOverlayEl=document.querySelector(".pop-up__overlay"),this.numberOfCardsOnDesktop=8,this.numberOfCardsOnTablet=6,this.numberOfCardsOnMobile=4}insertEmployeesIntoPage(e,t){let s=0,o="";this.wrapEl.innerHTML="",this.sortEmployeesByExperience(t);for(var p of t)s<e&&(o+=this.getEmployeeMarkup(p),s++);this.wrapEl.insertAdjacentHTML("afterbegin",o)}getWindowWidth(t){let s=window.innerWidth,o=this.getNumberCardsEmployees(s);this.insertEmployeesIntoPage(o,t),this.addButtonMore(t,o),this.addCardEmployeeClickListener(t),window.addEventListener("resize",()=>{var e=window.innerWidth;e!=s&&(s=e,o=this.getNumberCardsEmployees(s),this.insertEmployeesIntoPage(o,t),this.addButtonMore(t,o),this.addCardEmployeeClickListener(t))})}addCardEmployeeClickListener(p){document.querySelectorAll(".employee__item").forEach(e=>{e.addEventListener("click",e=>{var t,s,o=+e.currentTarget.dataset.employee;for(t of p)t.id==o&&(s=this.getFullInfoAboutEmployee(t),this.popUpOverlayEl.style.display="block",this.popUpOverlayEl.insertAdjacentHTML("afterend",s));this.addCloseElClickListener(),this.addPopUpElemsClickListener()})})}addCloseElClickListener(){document.querySelector(".pop-up__close").addEventListener("click",()=>{var e=document.querySelector(".pop-up");this.popUpOverlayEl.style.display="none",e.style.display="none"})}addPopUpElemsClickListener(){document.querySelectorAll(".pop-up").forEach(s=>{s.addEventListener("click",e=>{var t=s.querySelector(".pop-up__container");e.target==t&&(this.popUpOverlayEl.style.display="none",s.style.display="none")})})}getFullInfoAboutEmployee(e){var t=this.getPhoneEmployeeWithoutExtraSymbols(e.phone);return`<div class="pop-up">
			<div class="pop-up__container">
				<div class="pop-up__body">
					<div class="pop-up__img">
						<img src="assets/img/dist/employees/${e.photo}" alt="${e.name} ${e.surname}" width="310" height="340" class="pop-up__photo">
					</div>
					<div class="pop-up__right">
						<h4 class="h5 pop-up__name">${e.name} ${e.surname}</h4>
						<span class="pop-up__post">${e.post}</span>
						<p class="txt pop-up__desc">${e.info}</p>
						<div class="pop-up__inner">
							<a href="tel:${t}" class="pop-up__contact">${e.phone}</a>
							<a href="mailto:${e.email}" class="pop-up__contact">${e.email}</a>
						</div>
						<div class="pop-up__buttons">
							<a href="tel:${t}" class="button pop-up__call">
								<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M11.771 10.096C12.6904 10.6069 13.6103 11.118 14.5297 11.6289C14.9254 11.8486 15.099 12.3149 14.9432 12.7401C14.1522 14.9012 11.8355 16.0418 9.65558 15.2462C5.19187 13.617 1.8832 10.3081 0.253778 5.84444C-0.541862 3.66458 0.598869 1.34778 2.7599 0.556778C3.18514 0.400977 3.65138 0.574566 3.87165 0.970308C4.38206 1.88973 4.8931 2.80969 5.40402 3.72905C5.64353 4.16037 5.58724 4.67234 5.25942 5.04066C4.83011 5.52375 4.40089 6.00674 3.97158 6.48932C4.88797 8.72088 6.77907 10.612 9.01066 11.5284C9.49325 11.0991 9.97623 10.6699 10.4593 10.2406C10.8282 9.91275 11.3397 9.85644 11.7709 10.096L11.771 10.096Z" fill="white"/>
								</svg>
								<span class="pop-up__buttons-txt">Позвонить</span>
							</a>
							<a href="tg://resolve?domain=${e.tg}" class="button pop-up__tg">
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
		</div>`}getPhoneEmployeeWithoutExtraSymbols(e){return e.replace(/[\s\(\)\-]/g,"")}addButtonMore(s,e){if(s.length>e){this.wrapEl.insertAdjacentHTML("beforeend",'<button type="button" class="button employee__all">Показать еще</button>');e=document.querySelector(".employee__all");let t="";e.addEventListener("click",()=>{for(var e of s)t+=this.getEmployeeMarkup(e);this.wrapEl.innerHTML="",this.wrapEl.insertAdjacentHTML("afterbegin",t),this.addCardEmployeeClickListener(s)})}}getNumberCardsEmployees(e){return 1200<e?this.numberOfCardsOnDesktop:e<=1200&&576<e?this.numberOfCardsOnTablet:this.numberOfCardsOnMobile}getEmployeeMarkup(e){return`
			<div class="employee__item" data-employee="${e.id}">
				<div class="employee__img">
					<img src="assets/img/dist/employees/${e.photo}" alt="${e.name} ${e.surname}" width="310" height="340" class="employee__photo">
				</div>
				<h3 class="h4 employee__name">${e.name} ${e.surname}</h3>
				<span class="employee__post">${e.post}</span>
			</div>`}sortEmployeesByExperience(e){e.sort((e,t)=>parseFloat(t.experience)-parseFloat(e.experience))}}window.addEventListener("load",()=>{(new e).getWindowWidth(employees)})}();