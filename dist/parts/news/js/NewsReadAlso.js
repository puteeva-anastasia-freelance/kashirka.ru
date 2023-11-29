!function(){"use strict";class e{constructor(){this.pathToNewsImages="assets/img/dist/news",this.wrapEl=document.querySelector(".news__wrap"),this.numberOfCardsOnDesktop=3,this.numberOfCardsOnTabletAndMobile=2}getWindowWidth(t){let s=window.innerWidth,i=this.getNumberCardsNews(s);this.insertNewsIntoPage(i,t),window.addEventListener("resize",()=>{var e=window.innerWidth;e!=s&&(s=e,i=this.getNumberCardsNews(s),this.insertNewsIntoPage(i,t))})}getNumberCardsNews(e){return 1200<e?this.numberOfCardsOnDesktop:this.numberOfCardsOnTabletAndMobile}insertNewsIntoPage(e,t){let s=0,i="";this.wrapEl.innerHTML="";for(var n of t){var a=location.hash.replace(/#/,"");s<e&&a!=n.id&&(i+=this.getNewsMarkup(n),s++)}this.wrapEl.insertAdjacentHTML("afterbegin",i),this.setSameHeightImage()}setSameHeightImage(){let t=document.querySelector(".news__item").clientWidth;document.querySelectorAll(".news__img").forEach(e=>{e.style.height=.75*t+"px"})}getNewsMarkup(e){var t=this.getDateNews(e);return`
			<a href="news.html#${e.id}" class="news__item">
				<div class="news__img">
					<img src="${this.pathToNewsImages}/${e.imageMiddle}" alt="${e.title}" width="424" height="316" class="news__photo">
				</div>
				<h3 class="h6 news__subtitle">${e.title}</h3>
				<p class="txt news__txt">${e.shortDescription}</p>
				<time datetime="${t}" class="news__date">${e.date}</time>
			</a>`}getDateNews(e){e=e.date.split(".");return`${e[2]}-${e[1]}-`+e[0]}}window.addEventListener("load",()=>{(new e).getWindowWidth(news)})}();