!function(){"use strict";class t{constructor(){this.buttonFilterEl=document.querySelector(".map__button-filter"),this.filterEl=document.querySelector(".map__filter"),this.tabsEl=document.querySelector(".map__tabs"),this.filterCloseEl=document.querySelector(".map__filter-close")}init(t){this.getWindowWidth(),this.addButtonsClickListener(),this.addTabsClickListeners(t)}addFilterButtonShowClickListeners(){document.querySelector(".map__filter-button-show").addEventListener("click",()=>{this.filterEl.classList.remove("show")})}addTabsClickListeners(e){let i=document.querySelectorAll(".map__filter-tabs .tab"),s=document.querySelector(".map__filter-tabs .tab.active"),r=this.getNumberTownhips(e,s);this.filterEl.insertAdjacentHTML("beforeend",`<button type="button" class="button map__filter-button-show">Показать ${r}</button>`),this.addFilterButtonShowClickListeners();for(let t=0;t<i.length;t++)i[t].addEventListener("click",()=>{(s=document.querySelector(".map__filter-tabs .tab.active")).classList.remove("active"),i[t].classList.add("active"),r=this.getNumberTownhips(e,i[t]),document.querySelector(".map__filter-button-show").remove(),this.filterEl.insertAdjacentHTML("beforeend",`<button type="button" class="button map__filter-button-show">Показать ${r}</button>`),this.addFilterButtonShowClickListeners()})}getNumberTownhips(t,e){switch(e.dataset.tab){case"all":return t.length;case"moscow":return this.getNumberTownhipsCategory(t,"moscow");case"water":return this.getNumberTownhipsCategory(t,"water");case"forest":return this.getNumberTownhipsCategory(t,"forest")}}getNumberTownhipsCategory(t,e){let i=0;for(var s of t)for(var r of s.labels)r==e&&i++;return i}getWindowWidth(){let t=window.innerWidth;this.setVisibilityTabs(t),window.addEventListener("resize",()=>{t=window.innerWidth,this.setVisibilityTabs(t)})}setVisibilityTabs(t){t<=576?this.tabsEl.classList.add("hidden"):this.tabsEl.classList.remove("hidden")}addButtonsClickListener(){this.addButtonFilterClickListener(),this.addFilterCloseClickListener()}addFilterCloseClickListener(){this.filterCloseEl.addEventListener("click",()=>{this.filterEl.classList.remove("show")})}addButtonFilterClickListener(){this.buttonFilterEl.addEventListener("click",()=>{this.filterEl.classList.add("show")})}}window.addEventListener("load",()=>{(new t).init(townships)})}();