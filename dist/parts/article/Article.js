!function(){"use strict";class i{constructor(){this.shareEl=document.querySelector(".share"),this.pathToNewsImages="assets/img/dist/news"}insertArticleIntoPage(e){this.checkItemExists(e);e=this.getArticleMarkup(e);this.shareEl.insertAdjacentHTML("beforebegin",e)}checkItemExists(e){e||(window.location.href="404.html")}getArticleMarkup(e){var t=this.getDateNews(e);return`
			<article data-id="${e.id}" class="article__item">
				<header class="article__header">
					<h1 class="h1-title article__title">${e.title}</h1>
					<span class="article__short">${e.shortDescription}</span>
				</header>
				<figure class="article__figure">
					<picture class="article__img">
						<source srcset="${this.pathToNewsImages}/${e.image}" media="(min-width: 576px)" width="988" height="737">
						<source srcset="${this.pathToNewsImages}/${e.imageMiddle}" media="(min-width: 0)" width="556" height="288">
						<img src="${this.pathToNewsImages}/${e.imageMiddle}" alt="${e.title}" width="556" height="288">
					</picture>
					<figcaption class="article__caption"></figcaption>
				</figure>
				<p class="txt article__txt">${e.fullDescription}</p>
				<footer class="article__footer">
					<time datetime="${t}" class="article__date">${e.date}</time>
				</footer>
			</article>`}getDateNews(e){e=e.date.split(".");return`${e[2]}-${e[1]}-`+e[0]}reloadPage(){window.addEventListener("hashchange",()=>{window.location.reload(),window.scrollTo(0,0)})}}window.addEventListener("load",()=>{var e=new i,t=location.hash.replace(/#/,"");e.insertArticleIntoPage(news[t]),e.reloadPage()})}();