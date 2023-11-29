!function(){"use strict";class a{constructor(){this.bannerWrapEl=document.querySelector(".banner__wrap"),this.bannerBottomEl=document.querySelector(".banner__bottom"),this.likedCountEl=document.querySelector(".main-header__liked-count")}insertBannerIntoPage(n,t){this.checkPlotExists(n);var e=this.getBannerTopMarkup(n,t),e=(this.bannerWrapEl.insertAdjacentHTML("beforeend",e),this.getBannerBottomMarkup(n,t));this.bannerBottomEl.insertAdjacentHTML("beforeend",e),this.addLikedClickListener()}checkPlotExists(n){n||(window.location.href="404.html")}getCommunicationsTownship(n,t){for(var e of t)if(n.townshipId==e.id)return e.communications}getDistanceTownship(n,t){for(var e of t)if(n.townshipId==e.id)return e.distance}getNameTownship(n,t){for(var e of t)if(n.townshipId==e.id)return e.name}addLikedClickListener(){let t=document.querySelector(".banner__liked");t.addEventListener("click",()=>{var n=t.querySelector(".liked__icon");n.classList.contains("active")?(n.classList.remove("active"),this.likedCountEl.dataset.quantity=+this.likedCountEl.dataset.quantity-1):(n.classList.add("active"),this.likedCountEl.dataset.quantity=+this.likedCountEl.dataset.quantity+1),this.likedCountEl.textContent=this.likedCountEl.dataset.quantity})}getBannerTopMarkup(n,t){t=this.getNameTownship(n,t);return`<h2 class="h1 h1-title banner__title">Участок&nbsp;${n.area} соток в&nbsp;КП&nbsp;${t}</h2>
			<span class="banner__txt">Каширское шоссе, Домодедовский район</span>
			<div class="banner__inner">
				<a href="plots.html" class="button banner__button">Каталог участков</a>
				<button type="button" class="liked banner__liked" aria-label="Поставить / убрать лайк">
					<svg width="24" height="20" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg" class="liked__icon">
						<path d="M20.8687 2.53068C20.337 1.99878 19.7058 1.57683 19.011 1.28895C18.3162 1.00108 17.5716 0.852905 16.8195 0.852905C16.0675 0.852905 15.3228 1.00108 14.628 1.28895C13.9332 1.57683 13.302 1.99878 12.7704 2.53068L11.667 3.63405L10.5636 2.53068C9.48971 1.45677 8.03319 0.853462 6.51446 0.853462C4.99573 0.853462 3.5392 1.45677 2.4653 2.53068C1.3914 3.60458 0.788086 5.06111 0.788086 6.57983C0.788086 8.09856 1.3914 9.55509 2.4653 10.629L3.56867 11.7324L11.667 18.8844L19.7653 11.7324L20.8687 10.629C21.4006 10.0973 21.8225 9.4661 22.1104 8.77133C22.3983 8.07656 22.5464 7.33188 22.5464 6.57983C22.5464 5.82779 22.3983 5.08311 22.1104 4.38834C21.8225 3.69357 21.4006 3.06233 20.8687 2.53068Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>`}formatNumber(n){return n.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}getBannerBottomMarkup(n,t){var e=this.getDistanceTownship(n,t),t=this.getCommunicationsTownship(n,t),t=this.getCommMarkup(t);return`<div class="container banner__bottom-container">
			<div class="banner__col">
				<span class="banner__subtitle">от МКАД:</span>
				<span class="banner__count"><span class="banner__count banner__count_big">${e} </span>км.</span>
			</div>
			<div class="banner__col">
				<span class="banner__subtitle">Стоимость участка:</span>
				<span class="banner__count"><span class="banner__count banner__count_big">${this.formatNumber(n.price)} </span>руб.</span>
			</div>
			<div class="banner__col">
				<span class="banner__subtitle">Номер на плане:</span>
				<span class="banner__count"><span class="banner__count banner__count_big">${n.numberOnPlan}</span></span>
			</div>
			${t}
		</div>`}getCommMarkup(t){let e="";for(let n=0;n<t.length;n++)switch(t[n]){case"elec":e+=`<div class="banner__comm-item">
						<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3.85981 14.38H10.1423V15.2774H3.85981V14.38ZM6.10355 17.97H7.89858C8.98211 17.97 9.88862 17.1979 10.0969 16.175H3.90501C4.11363 17.1978 5.01983 17.97 6.10335 17.97H6.10355ZM13.7323 6.75133C13.7323 9.00384 12.6088 11.0966 10.7273 12.3495C10.3609 12.5933 10.1424 13.0073 10.1424 13.4568L10.1422 13.4826H3.85974V13.4571C3.85974 13.007 3.64281 12.5941 3.27957 12.3529C1.2199 10.9837 0.0773521 8.60132 0.297399 6.13493C0.593985 2.81019 3.33654 0.184613 6.67683 0.0275514C8.53757 -0.0586843 10.3027 0.597862 11.6467 1.88016C12.9916 3.1631 13.7324 4.89298 13.7324 6.75108L13.7323 6.75133ZM8.74315 6.98829C8.66505 6.84242 8.51324 6.75133 8.34734 6.75133H6.49317L7.82318 4.75644C7.96075 4.55032 7.90504 4.27155 7.6986 4.13432C7.49169 3.99628 7.21359 4.05262 7.07648 4.25891L5.28145 6.95136C5.18989 7.08893 5.18113 7.26594 5.25907 7.41196C5.33701 7.55798 5.4893 7.64877 5.65488 7.64877H7.50905L6.17904 9.64365C6.04146 9.84977 6.09718 10.1285 6.30362 10.2658C6.38031 10.3168 6.46639 10.3414 6.55185 10.3414C6.69678 10.3414 6.8392 10.2714 6.92559 10.1415L8.72063 7.44905C8.8125 7.31132 8.82126 7.1343 8.74316 6.98828L8.74315 6.98829Z"
								fill="white" />
						</svg>
						<span class="banner__comm-sign">Элекричество</span>
					</div>`;break;case"gas":e+=`<div class="banner__comm-item">
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M2.99426 1.9551C2.81886 1.867 0.583986 3.7277 0.583986 5.09884C0.581768 6.97084 3.19023 11.2139 3.63018 12.8537C4.00861 14.261 2.98904 15.9498 3.26889 16.0265C3.52554 16.1918 5.95921 13.7073 6.05439 12.6469C6.17636 10.9602 3.21227 6.03887 2.97593 4.76713C2.70033 3.28687 3.19086 1.98829 2.99428 1.95505L2.99426 1.9551Z"
								fill="white" />
							<path
								d="M8.5697 0.0185657C8.34591 -0.0939349 5.4961 2.27885 5.4961 4.02744C5.49287 6.41433 8.81986 11.8251 9.38079 13.916C9.86224 15.7109 8.56345 17.8641 8.9193 17.9613C9.24733 18.1724 12.3502 15.0045 12.4717 13.6521C12.6278 11.5015 8.8473 5.22626 8.54573 3.60406C8.19492 1.71617 8.82012 0.0607336 8.56972 0.0183594L8.5697 0.0185657Z"
								fill="white" />
							<path
								d="M14.3249 1.9551C14.1497 1.867 11.915 3.7277 11.915 5.09884C11.9122 6.97084 14.5209 11.2139 14.9612 12.8537C15.3391 14.261 14.3201 15.9498 14.5993 16.0265C14.8562 16.1918 17.2903 13.7073 17.3848 12.6469C17.5074 10.9602 14.5427 6.03887 14.3066 4.76713C14.031 3.28687 14.5215 1.98829 14.3249 1.95505L14.3249 1.9551Z"
								fill="white" />
						</svg>
						<span class="banner__comm-sign">Газ</span>
					</div>`;break;case"water":e+=`<div class="banner__comm-item">
						<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.5327 0.000431478C6.51986 0.000431478 6.50702 0.00456931 6.49432 0.00656695C6.39358 0.0188377 6.29813 0.0702035 6.23221 0.147253C6.23221 0.147253 4.68739 1.98458 3.13844 4.32115C1.58949 6.65772 0 9.45971 0 11.659C0 15.1821 2.94423 18 6.54557 18C10.147 18 13.0911 15.1822 13.0911 11.659C13.0911 9.45968 11.5016 6.65739 9.95255 4.32115C8.40361 1.98443 6.85879 0.147253 6.85879 0.147253C6.77974 0.05251 6.65603 -0.00327702 6.53276 0.000149179L6.5327 0.000431478ZM11.02 11.2503C11.1331 11.2373 11.2459 11.2769 11.3293 11.3591C11.4127 11.4413 11.4585 11.5579 11.4546 11.6786C11.4546 14.167 9.40926 16.1593 6.93517 16.1593H6.93531C6.71758 16.1593 6.54108 15.9718 6.54108 15.7407C6.54108 15.5094 6.71757 15.3219 6.93531 15.3219C9.01517 15.3219 10.6683 13.6815 10.6683 11.6785C10.6616 11.4599 10.8151 11.2729 11.0199 11.2502L11.02 11.2503Z"
								fill="white" />
						</svg>
						<span class="banner__comm-sign">Вода</span>
					</div>`}return""==e?"":`<div class="banner__col">
				<span class="banner__subtitle">Коммуникации:</span>
				<div class="banner__comm">
					${e}
				</div>
			</div>`}reloadPage(){window.addEventListener("hashchange",()=>{window.location.reload(),window.scrollTo(0,0)})}}window.addEventListener("load",()=>{var n=new a;let t=location.hash.replace(/#/,"");var e=plots.findIndex(n=>n.id==t);n.insertBannerIntoPage(plots[e],townships),n.reloadPage()})}();