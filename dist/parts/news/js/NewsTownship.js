!function(){"use strict";class s{constructor(){this.pathToNewsImages="assets/img/dist/news",this.wrapEl=document.querySelector(".news__wrap"),this.numberOfCardsOnDesktop=3,this.numberOfCardsOnTabletAndMobile=2}getWindowWidth(t,s){let i=window.innerWidth,n=this.getNumberCardsNews(i);this.insertNewsIntoPage(n,t,s),window.addEventListener("resize",()=>{var e=window.innerWidth;e!=i&&(i=e,n=this.getNumberCardsNews(i),this.insertNewsIntoPage(n,t,s))})}getNumberCardsNews(e){return 1200<e?this.numberOfCardsOnDesktop:this.numberOfCardsOnTabletAndMobile}insertNewsIntoPage(e,t,s){let i=0,n="";this.wrapEl.innerHTML="";for(var a of t)i<e&&(a.townshipId==s||"Все проекты"==a.townshipId)&&(n+=this.getNewsMarkup(a),i++);this.wrapEl.insertAdjacentHTML("afterbegin",n),this.setSameHeightImage()}setSameHeightImage(){let t=document.querySelector(".news__item").clientWidth;document.querySelectorAll(".news__img").forEach(e=>{e.style.height=.75*t+"px"})}getNewsMarkup(e){var t=this.getDateNews(e);return`
			<a href="news.html#${e.id}" class="news__item">
				<div class="news__img">
					<img src="${this.pathToNewsImages}/${e.imageMiddle}" alt="${e.title}" width="424" height="316" class="news__photo">
				</div>
				<h3 class="h6 news__subtitle">${e.title}</h3>
				<p class="txt news__txt">${e.shortDescription}</p>
				<time datetime="${t}" class="news__date">${e.date}</time>
			</a>`}getDateNews(e){e=e.date.split(".");return`${e[2]}-${e[1]}-`+e[0]}}window.addEventListener("load",()=>{var e=new s,t=location.hash.replace(/#/,"");e.getWindowWidth(news,t)})}();