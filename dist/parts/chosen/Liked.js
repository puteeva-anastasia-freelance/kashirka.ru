!function(){"use strict";class e{constructor(){this.pathToTownshipsImages="assets/img/dist/townships",this.pathToPlotsImages="assets/img/dist/plots",this.wrapEl=document.querySelector(".card__wrap"),this.mainHeaderLikedCountEl=document.querySelector(".main-header__liked-count"),this.quantityTownshipsEl=document.querySelector(".h1__number"),this.cardsInLiked=[{type:"township",id:4},{type:"plot",id:11},{type:"township",id:1},{type:"township",id:0},{type:"township",id:8},{type:"township",id:7},{type:"plot",id:5}],this.totalQuantityLikedCards=this.cardsInLiked.length}renderLikedCards(t,a){this.setCostHundred(t,a),this.setDistance(t,a),this.renderCards("all",t,a),this.renderTotalQuantityLikedCards(),this.addLikedClickListeners(),this.changeStyleBtn(document.querySelector(".tab")),document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",()=>{this.activateTab(e,e.dataset.tab,t,a)})})}activateTab(e,t,a){this.renderCards(t,a,plots),this.addLikedClickListeners(),this.changeStyleBtn(e),this.setCardsLiked()}changeStyleBtn(e){document.querySelector(".tab.active")&&document.querySelector(".tab.active").classList.remove("active"),e.classList.add("active")}addLikedClickListeners(){document.querySelectorAll(".card__liked").forEach(r=>{r.addEventListener("click",()=>{let t=r.querySelector(".liked__icon"),a=r.parentElement.dataset.type,s=r.parentElement.dataset.id;this.cardsInLiked.forEach(e=>{e.id==s&&e.type==a&&(t.classList.contains("active")?(this.totalQuantityLikedCards--,t.classList.remove("active"),this.moveCardToEnd(r),e.liked=!1):(this.totalQuantityLikedCards++,t.classList.add("active"),this.moveCardToBegin(r),e.liked=!0))}),this.renderTotalQuantityLikedCards()})})}setCardsLiked(){this.cardsInLiked.forEach(e=>{var t=document.querySelector(`[data-type="${e.type}"][data-id="${e.id}"]`);t&&(0==e.liked?(t.querySelector(".liked__icon").classList.remove("active"),this.moveCardToEnd(t.querySelector(".card__liked"))):(t.querySelector(".liked__icon").classList.add("active"),this.moveCardToBegin(t.querySelector(".card__liked"))))})}setDistance(e,t){for(var a of t)for(var s of e)a.townshipId==s.id&&(a.distanceTownship=s.distance)}moveCardToBegin(e){e=e.parentElement;e.remove(),this.wrapEl.insertAdjacentElement("afterbegin",e)}moveCardToEnd(e){e=e.parentElement;e.remove(),this.wrapEl.insertAdjacentElement("beforeend",e)}renderTotalQuantityLikedCards(){this.mainHeaderLikedCountEl.textContent=this.totalQuantityLikedCards,this.mainHeaderLikedCountEl.dataset.quantity=this.totalQuantityLikedCards,this.quantityTownshipsEl.textContent=this.totalQuantityLikedCards}renderCards(t,a,s){this.wrapEl.innerHTML="";for(let e=0;e<this.cardsInLiked.length;e++)switch(t){case"all":this.renderAllCards(this.cardsInLiked[e],a,s);break;case"townships":this.renderTownshipsCards(this.cardsInLiked[e],a);break;case"plots":this.renderPlotsCards(this.cardsInLiked[e],s)}}renderTownshipsCards(t,e){var a;"township"==t.type&&(a=e.findIndex(e=>e.id==t.id),e=e[a],this.renderCardTownship(e))}renderPlotsCards(t,e){var a;"plot"==t.type&&(a=e.findIndex(e=>e.id==t.id),e=e[a],this.renderCardPlot(e))}renderAllCards(t,e,a){var s;"township"==t.type?(s=e.findIndex(e=>e.id==t.id),e=e[s],this.renderCardTownship(e)):"plot"==t.type&&(s=a.findIndex(e=>e.id==t.id),e=a[s],this.renderCardPlot(e))}renderCardPlot(e){var t=this.getLabelsPlotMarkup(e),a=this.getPricePlotMarkup(e),s=this.getPriceOldPlotMarkup(e),t=`<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToPlotsImages}/${e.image});" data-type="plot" data-id="${e.id}">
			<div class="card__labels card__labels_plots">
				${t}
			</div>
			<button type="button" class="liked card__liked" aria-label="Убрать / поставить лайк">
				<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon active">
					<path
						d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
						stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<a href="plot-card.html#${e.id}" class="card__bottom card__bottom_plots">
				<div class="card__bottom-inner">
					<h2 class="h3 card__name">Участок ${e.area} соток</h2>
					<div class="card__prices">
					${s}
					${a}
					</div>
					<span class="card__distance">${e.distanceTownship} км. от МКАД</span>
				</div>
			</a>
			<a href="plot-card.html#${e.id}" class="chevron card__chevron card__chevron_plots" aria-label="Смотреть полную информацию об участке">
				<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</a>
		</div>`;this.wrapEl.insertAdjacentHTML("beforeend",t)}getLabelsPlotMarkup(t){let a="";for(let e=0;e<t.labels.length;e++)switch(t.labels[e]){case"look":a+='<a href="plots.html#look" class="label">Видовой</a>';break;case"coast":a+='<a href="plots.html#coast" class="label">Прибрежный</a>';break;case"forest":a+='<a href="plots.html#forest" class="label">Прилесный</a>';break;case"neighbors":a+='<a href="plots.html#neighbors" class="label">Меньше соседей</a>';break;case"favorable":a+='<a href="plots.html#favorable" class="label">Выгодный</a>'}return a}getPricePlotMarkup(e){return`<span class="card__price"><span class="card__price_big">${this.formatNumber(e.price)}</span> руб.</span>`}getPriceOldPlotMarkup(e){return null!=e.priceOld?`<span class="card__price card__price_old">${this.formatNumber(e.priceOld)} руб.</span>`:""}renderCardTownship(e){var t=this.getLabelsTownshipMarkup(e),a=this.getPriceTownshipMarkup(e),s=this.getPriceOldTownshipMarkup(e),t=`<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToTownshipsImages}/${e.imageMiddle});" data-type="township" data-id="${e.id}">
					<div class="card__labels">
						${t}
					</div>
					<button type="button" class="liked card__liked" aria-label="Убрать / поставить лайк">
						<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon active">
							<path
								d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
								stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
					<a href="town-card.html#${e.id}" class="card__bottom">
						<div class="card__bottom-inner">
							<h2 class="h3 card__name">${e.name}</h2>
							<div class="card__prices">
							${s}
							${a}
							</div>
							<span class="card__distance card__distance_township">${e.distance} км. от МКАД</span>
						</div>
					</a>
					<a href="town-card.html#${e.id}" class="chevron card__chevron" aria-label="Смотреть полную информацию о поселке">
						<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</a>
				</div>`;this.wrapEl.insertAdjacentHTML("beforeend",t)}getLabelsTownshipMarkup(t){let a="";for(let e=0;e<t.labels.length;e++)switch(t.labels[e]){case"moscow":a+='<a href="townships.html#moscow" class="label">Ближе к Москве</a>';break;case"water":a+='<a href="townships.html#water" class="label">У воды</a>';break;case"forest":a+='<a href="townships.html#forest" class="label">У леса</a>'}return a}setCostHundred(e,t){for(var a of e)for(var s of t){var r;s.townshipId==a.id&&(r=this.getMinCostHundred(t,s.townshipId),s=this.getOldMinCostHundred(t,s.townshipId),a.minCostHundred=r,a.oldMinCostHundred=s)}}getOldMinCostHundred(t,a){var s=[];let r=0;for(let e=0;e<t.length;e++)t[e].townshipId==a&&null!=t[e].priceOld&&(s[r]=(t[e].priceOld/t[e].area).toFixed(0),r++);return Math.min(...s)}getMinCostHundred(t,a){var s=[];let r=0;for(let e=0;e<t.length;e++)t[e].townshipId==a&&(s[r]=(t[e].price/t[e].area).toFixed(0),r++);return Math.min(...s)}formatNumber(e){return e.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}getPriceTownshipMarkup(e){return`<span class="card__price">от <span class="card__price_big">${this.formatNumber(e.minCostHundred)}</span> руб/сот.</span>`}getPriceOldTownshipMarkup(e){return e.oldMinCostHundred!=1/0?`<span class="card__price card__price_old">от ${this.formatNumber(e.oldMinCostHundred)} руб/сот.</span>`:""}}window.addEventListener("load",()=>{(new e).renderLikedCards(townships,plots)})}();