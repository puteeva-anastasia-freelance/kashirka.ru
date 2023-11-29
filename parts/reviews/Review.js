!function(){"use strict";class s{constructor(){this.wrapEl=document.querySelector(".reviews__wrap"),this.pathToReviewsImages="assets/img/dist/reviews",this.popUpOverlayEl=document.querySelector(".pop-up__overlay"),this.numberOfReviewsOnDesktop=3,this.numberOfReviewsOnTabletAndMobile=2}getWindowWidth(t,s){let i=window.innerWidth,r=this.getNumberReviews(i);this.insertReviewsIntoPage(t,s,r);var e=this.getNumberReviewsTownship(s,t);this.addButtonMore(t,r,e,s),window.addEventListener("resize",()=>{var e=window.innerWidth;e!=i&&(i=e,r=this.getNumberReviews(i),this.insertReviewsIntoPage(t,s,r),e=this.getNumberReviewsTownship(s,t),this.addButtonMore(t,r,e,s))})}getNumberReviewsTownship(e,t){let s=0;for(var i of t)i.townshipId==e&&s++;return s}getNumberReviews(e){return 1200<e?this.numberOfReviewsOnDesktop:this.numberOfReviewsOnTabletAndMobile}addButtonMore(i,e,t,r){if(e<t&&null==document.querySelector(".reviews__more")){this.wrapEl.insertAdjacentHTML("afterend",'<button type="button" class="reviews__more button">Показать еще</button>');let t=document.querySelector(".reviews__more"),s="";t.addEventListener("click",()=>{for(var e of i)e.townshipId==r&&(s+=this.getReviewMarkup(e));this.wrapEl.innerHTML="",this.wrapEl.insertAdjacentHTML("beforeend",s),t.remove(),this.manageСardsReviews(i)})}}"manageСardsReviews"(e){this.addButtonsReadFully(),this.addButtonsFullyClickListener(e),this.setSameHeightPhoto(),this.setSameHeightBottom()}insertReviewsIntoPage(t,s,i){let r="",o=0;this.wrapEl.innerHTML="";for(let e=0;e<t.length;e++)t[e].townshipId==s&&o<i&&(r+=this.getReviewMarkup(t[e]),o++);this.wrapEl.insertAdjacentHTML("beforeend",r),this.manageСardsReviews(t)}setSameHeightPhoto(){let t=document.querySelector(".reviews__photo").clientWidth;document.querySelectorAll(".reviews__photo").forEach(e=>{e.style.height=.7075*t+"px"})}setSameHeightBottom(){var e=document.querySelectorAll(".reviews .reviews__item");let t=0;e.forEach(e=>{e=e.querySelector(".reviews__desc");e.scrollHeight>e.offsetHeight?(t=e.parentElement.offsetHeight,e.parentElement.style.height="auto"):e.parentElement.style.height=t+"px"})}addButtonsReadFully(){document.querySelectorAll(".reviews .reviews__item").forEach(e=>{var t=e.querySelector(".reviews__desc"),e=e.querySelector(".reviews__inner");e.innerHTML="",t.scrollHeight>t.offsetHeight&&e.insertAdjacentHTML("afterbegin",'<button type="button" class="reviews__fully">Читать полностью</button>')})}addButtonsFullyClickListener(r){document.querySelectorAll(".reviews__fully").forEach(e=>{e.addEventListener("click",e=>{var t,s,i=+e.currentTarget.closest(".reviews__item").dataset.review;for(t of r)t.id==i&&(s=this.getFullReview(t),this.popUpOverlayEl.style.display="block",this.popUpOverlayEl.insertAdjacentHTML("afterend",s));this.addCloseElClickListener(),this.addPopUpElemsClickListener()})})}addCloseElClickListener(){document.querySelector(".pop-up__close").addEventListener("click",()=>{var e=document.querySelector(".pop-up");this.popUpOverlayEl.style.display="none",e.style.display="none"})}addPopUpElemsClickListener(){document.querySelectorAll(".pop-up").forEach(s=>{s.addEventListener("click",e=>{var t=s.querySelector(".pop-up__container");e.target==t&&(this.popUpOverlayEl.style.display="none",s.style.display="none")})})}getFullReview(e){return`
			<div class="pop-up">
	<div class="pop-up__container">
		<div class="pop-up__body pop-up__body_employee">
			<div class="reviews__item">
				<div class="reviews__bottom">
					<span class="reviews__name">${e.name}</span>
					<p class="reviews__desc">${e.text}</p>
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
</div>`}getReviewMarkup(e){return`
			<div class="reviews__item" data-review="${e.id}">
				<img src="${this.pathToReviewsImages}/${e.image}" alt="${e.name}" width="424" height="300" class="reviews__photo">
				<div class="reviews__bottom">
					<span class="reviews__name">${e.name}</span>
					<p class="reviews__desc">${e.text}</p>
					<div class="reviews__inner"></div>
				</div>
			</div>`}}window.addEventListener("load",()=>{var e=new s,t=location.hash.replace(/#/,"");e.getWindowWidth(reviews,t)})}();