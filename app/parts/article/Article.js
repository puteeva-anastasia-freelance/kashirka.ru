(function () {
	"use strict";

	/**
	 * Класс для отрисовки статьи новости
	 */
	class Article {
		constructor() {
			this.shareEl = document.querySelector('.share');
			this.pathToNewsImages = 'assets/img/dist/news';
		}

		/**
		 * Метод вставляет статью новости на страницу
		 * @param {NewsDTO} item объект с информацией о новости
		 */
		insertArticleIntoPage(item) {
			this.checkItemExists(item)

			let articleMarkup = this.getArticleMarkup(item);
			this.shareEl.insertAdjacentHTML('beforebegin', articleMarkup); 
		}

		/**
		 * Метод проверяет существует ли новость, если не существует, то появляется страница 404
		 * @param {NewsDTO} item объект с информацией о новости
		 */
		checkItemExists(item) {
			if (!item) {
				window.location.href = '404.html';
			}
		}

		/**
		 * Этот метод принимает один из объектов из массива news в файле news.js и генерирует разметку статьи
		 * @param {NewsDTO} item объект с информацией о новости
		 * @returns {string} html-разметка статьи
		 */
		getArticleMarkup(item) {
			let date = this.getDateNews(item);

			return `
			<article data-id="${item.id}" class="article__item">
				<header class="article__header">
					<h1 class="h1-title article__title">${item.title}</h1>
					<span class="article__short">${item.shortDescription}</span>
				</header>
				<figure class="article__figure">
					<picture class="article__img">
						<source srcset="${this.pathToNewsImages}/${item.image}" media="(min-width: 576px)" width="988" height="737">
						<source srcset="${this.pathToNewsImages}/${item.imageMiddle}" media="(min-width: 0)" width="556" height="288">
						<img src="${this.pathToNewsImages}/${item.imageMiddle}" alt="${item.title}" width="556" height="288">
					</picture>
					<figcaption class="article__caption"></figcaption>
				</figure>
				<p class="txt article__txt">${item.fullDescription}</p>
				<footer class="article__footer">
					<time datetime="${date}" class="article__date">${item.date}</time>
				</footer>
			</article>`;
		}

		/**
		 * Метод получает дату новости в формате "YYYY-MM-DD"
		 * @param {NewsDTO} item объект с информацией о новости
		 * @retutns {string} дата новости в формате "YYYY-MM-DD"
		 */
		getDateNews(item) {
			var date = item.date.split(".");
			return `${date[2]}-${date[1]}-${date[0]}`;
		}

		/**
		 * Метод перезагружает страницу при изменении хэша страницы
		 */
		reloadPage() {
			window.addEventListener('hashchange', () => {
				window.location.reload();
				window.scrollTo(0, 0);
			});
		}
	}

	window.addEventListener('load', () => {
		let article = new Article();
		let idArticle = location.hash.replace(/#/, '');
		article.insertArticleIntoPage(news[idArticle]);
		article.reloadPage();
	});
})();