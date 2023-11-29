!function(){"use strict";class e{constructor(){this.galleryPlanEl=document.querySelector("#gallery-plan"),this.planLeftEl=document.querySelector(".plan__left"),this.pathToTownshipsPlanImages="assets/img/dist/townships/plans"}insertPlanIntoPage(e){var t=`<a aria-label="Открыть план поселка" href="${this.pathToTownshipsPlanImages}/${e.plan}" data-lg-size="1600-2400" data-src="${this.pathToTownshipsPlanImages}/${e.plan}" data-sub-html="План поселка ${e.name}">
				<span class="plan__play">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="white"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
							stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
			</a>`;this.galleryPlanEl.insertAdjacentHTML("afterbegin",t),window.innerWidth<=576?this.planLeftEl.style.background=`center / cover no-repeat url(${this.pathToTownshipsPlanImages}/${e.planMiddle})`:this.planLeftEl.style.background=`center / cover no-repeat url(${this.pathToTownshipsPlanImages}/${e.plan})`,this.addLightGallery()}addLightGallery(){lightGallery(document.getElementById("gallery-plan"),{speed:500,plugins:[lgZoom,lgHash],mobileSettings:{controls:!0,showCloseIcon:!0,download:!0}})}findTownship(e,n){let a=location.hash.replace(/#/,"");let l=0;switch(document.location.pathname.replace(/\/kashirka.ru/,"")){case"/town-card.html":l=e.findIndex(e=>e.id==a),this.insertPlanIntoPage(e[l]);break;case"/plot-card.html":var s=n.findIndex(e=>e.id==a);let t=n[s].townshipId;l=e.findIndex(e=>e.id==t),this.insertPlanIntoPage(e[l])}}}window.addEventListener("load",()=>{(new e).findTownship(townships,plots)})}();