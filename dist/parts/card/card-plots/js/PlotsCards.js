!function(){"use strict";class e{constructor(){this.pathToPlotsImages="assets/img/dist/plots",this.wrapEl=document.querySelector("#plots .card__wrap"),this.likedCountEl=document.querySelector(".main-header__liked-count"),this.bigArea=10,this.numberOfCards=6,this.favorablePlot=2e5}addButtonLikedClickListeners(a){document.querySelectorAll("#plots .liked").forEach(t=>{t.addEventListener("click",()=>{var e=t.parentElement.dataset.plot;t.querySelector(".liked__icon").classList.contains("active")?(a[e].liked=!1,this.likedCountEl.dataset.quantity=+this.likedCountEl.dataset.quantity-1):(a[e].liked=!0,this.likedCountEl.dataset.quantity=+this.likedCountEl.dataset.quantity+1),this.setPlotsLiked(a),this.likedCountEl.textContent=this.likedCountEl.dataset.quantity})})}setPlotsLiked(e){for(var t of e)document.querySelector(`[data-plot="${t.id}"]`)&&(1==t.liked?document.querySelector(`[data-plot="${t.id}"]`).querySelector(".liked__icon").classList.add("active"):0==t.liked&&document.querySelector(`[data-plot="${t.id}"]`).querySelector(".liked__icon").classList.remove("active"))}renderCategoryPlots(t,e){this.setDistance(e,t),this.insertPlotsIntoPage("all",t),this.changeStyleBtn(document.querySelector("#plots .tab")),this.addCardHoverListeners(),document.querySelectorAll("#plots .tab").forEach(e=>{e.addEventListener("click",()=>{this.insertPlotsIntoPage(e.dataset.tab,t),this.changeStyleBtn(e),this.setPlotsLiked(t),this.addCardHoverListeners()})})}setDistance(e,t){for(var a of t)for(var s of e)a.townshipId==s.id&&(a.distanceTownship=s.distance)}addCardBottomHoverListeners(){document.querySelectorAll(".card__bottom").forEach(e=>{let t=e.parentElement,a=t.querySelector(".chevron");e.addEventListener("mouseover",()=>{t.classList.add("active"),a.classList.add("active")}),e.addEventListener("mouseout",()=>{t.classList.remove("active"),a.classList.remove("active")})})}addChevronHoverListeners(){document.querySelectorAll(".chevron").forEach(e=>{let t=e.parentElement;e.addEventListener("mouseover",()=>{t.classList.add("active")}),e.addEventListener("mouseout",()=>{t.classList.remove("active")})})}addCardHoverListeners(){this.addCardBottomHoverListeners(),this.addChevronHoverListeners()}insertPlotsIntoPage(t,a){let s="",r=0,l=0;for(;r<this.numberOfCards&&l<a.length;){var e=a[l].price/a[l].area;"all"==t||"sale"==t&&null!=a[l].priceOld||"big"==t&&a[l].area>=this.bigArea||"favorable"==t&&e<=this.favorablePlot?(s+=this.getPlotMarkup(a[l]),r++):a[l].labels.forEach(e=>{e==t&&(s+=this.getPlotMarkup(a[l]),r++)}),l++}this.wrapEl.innerHTML="",this.wrapEl.insertAdjacentHTML("afterbegin",s),this.addButtonLikedClickListeners(a)}getLabelsPlotMarkup(t){let a="";for(let e=0;e<t.labels.length;e++)switch(t.labels[e]){case"look":a+='<a href="plots.html#look" class="label">Видовой</a>';break;case"coast":a+='<a href="plots.html#coast" class="label">Прибрежный</a>';break;case"forest":a+='<a href="plots.html#forest" class="label">Прилесный</a>';break;case"neighbors":a+='<a href="plots.html#neighbors" class="label">Меньше соседей</a>';break;case"favorable":a+='<a href="plots.html#favorable" class="label">Выгодный</a>'}return a}formatNumber(e){return e.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}getPricePlotMarkup(e){return`<span class="card__price"><span class="card__price_big">${this.formatNumber(e.price)}</span> руб.</span>`}getPriceOldPlotMarkup(e){return null!=e.priceOld?`<span class="card__price card__price_old">${this.formatNumber(e.priceOld)} руб.</span>`:""}getPlotMarkup(e){var t=this.getLabelsPlotMarkup(e),a=this.getPricePlotMarkup(e),s=this.getPriceOldPlotMarkup(e);return`
		<div class="card__inner" style="background: center / cover no-repeat url(${this.pathToPlotsImages}/${e.image});" data-plot="${e.id}">
<div class="card__labels card__labels_plots">
${t}
</div>
<button type="button" class="liked card__liked" aria-label="Поставить / убрать лайк">
	<svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon">
		<path
			d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z"
			stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>

<a href="plot-card.html#${e.id}" class="card__bottom card__bottom_plots">
	<div class="card__bottom-inner">
		<h3 class="h3 card__name">Участок ${e.area} соток</h3>
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
</div>
		`}changeStyleBtn(e){document.querySelector("#plots .tab.active")&&document.querySelector("#plots .tab.active").classList.remove("active"),e.classList.add("active")}}window.addEventListener("load",()=>{(new e).renderCategoryPlots(plots,townships)})}();