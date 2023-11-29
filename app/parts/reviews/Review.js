(function () {
	"use strict";

	/**
	 * Класс для отрисовки отзывов покупателей
	 */
	class Review {
		constructor() {
			this.wrapEl = document.querySelector('.reviews__wrap');
			this.pathToReviewsImages = 'assets/img/dist/reviews';
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');

			this.numberOfReviewsOnDesktop = 3;
			this.numberOfReviewsOnTabletAndMobile = 2;
		}

		/**
		 * Метод получает ширину экрана
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 * @param {number} idTownship идентификатор поселка
		 */
		getWindowWidth(reviews, idTownship) {
			let windowWidth = window.innerWidth;
			let numberOfReviews = this.getNumberReviews(windowWidth);
			this.insertReviewsIntoPage(reviews, idTownship, numberOfReviews);
			let count = this.getNumberReviewsTownship(idTownship, reviews);
			this.addButtonMore(reviews, numberOfReviews, count, idTownship);

			window.addEventListener('resize', () => {
				let newWindowWidth = window.innerWidth;

				if (newWindowWidth != windowWidth) {
					windowWidth = newWindowWidth;
					numberOfReviews = this.getNumberReviews(windowWidth);
					this.insertReviewsIntoPage(reviews, idTownship, numberOfReviews);

					let count = this.getNumberReviewsTownship(idTownship, reviews);
					this.addButtonMore(reviews, numberOfReviews, count, idTownship);
				}
			});
		}

		/**
		 * Метод получает количество отзывов определенного поселка
		 * @param {number} idTownship идентификатор поселка
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 * @returns {number} count количество отзывов определенного поселка
		 */
		getNumberReviewsTownship(idTownship, reviews) {
			let count = 0;

			for (let review of reviews) {
				if (review.townshipId == idTownship) {
					count++;
				}
			}

			return count;
		}

		/**
		 * Метод получает количество отзывов на странице
		 * @param {number} windowWidth ширина экрана
		 * @returns {number} количество отзывов на странице
		 */
		getNumberReviews(windowWidth) {
			if (windowWidth > 1200) {
				return this.numberOfReviewsOnDesktop;
			} else {
				return this.numberOfReviewsOnTabletAndMobile;
			}
		}

		/**
		 * Метод добавляет кнопку "Показать еще"
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 * @param {number} numberOfReviews количество отзывов, которые расположены нв странице
		 * @param {number} count количество отзывов определенного поселка
		 * @param {number} idTownship идентификатор поселка
		 */
		addButtonMore(reviews, numberOfReviews, count, idTownship) {
			if (count > numberOfReviews && document.querySelector('.reviews__more') == null) {
				this.wrapEl.insertAdjacentHTML('afterend', '<button type="button" class="reviews__more button">Показать еще</button>');
				
				let moreEl = document.querySelector('.reviews__more');

				let reviewsMarkup = '';

				moreEl.addEventListener('click', () => {
					for (let review of reviews) {
						if (review.townshipId == idTownship) {
							reviewsMarkup += this.getReviewMarkup(review);
						}
					}

					this.wrapEl.innerHTML = '';
					this.wrapEl.insertAdjacentHTML('beforeend', reviewsMarkup);

					moreEl.remove();

					this.manageСardsReviews(reviews);
				});

			}
		}

		/**
		 * Метод управляет карточками отзывов
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 */
		manageСardsReviews(reviews) {
			this.addButtonsReadFully();
			this.addButtonsFullyClickListener(reviews);

			this.setSameHeightPhoto();
			this.setSameHeightBottom();
		}

		/**
		 * Метод вставляет отзывы покупателей о поселке на страницу
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 * @param {number} idTownship идентификатор поселка
		 * @param {number} numberOfCards количество отзывов покупателей, которые необходимо отобразить на странице
		 */
		insertReviewsIntoPage(reviews, idTownship, numberOfReviews) {
			let reviewsMarkup = '';
			let count = 0;

			this.wrapEl.innerHTML = '';

			for (let i = 0; i < reviews.length; i++) {
				if (reviews[i].townshipId == idTownship && count < numberOfReviews) {
					reviewsMarkup += this.getReviewMarkup(reviews[i]);
					count++;
				}
			}

			this.wrapEl.insertAdjacentHTML('beforeend', reviewsMarkup);

			this.manageСardsReviews(reviews);
		}

		/**
		 * Метод устанавливает одинаковую высоту фотографиям
		 */
		setSameHeightPhoto() {
			let widthPhotoEl = document.querySelector('.reviews__photo').clientWidth;
			let photoElems = document.querySelectorAll('.reviews__photo');

			photoElems.forEach((photoEl) => {
				photoEl.style.height = `${widthPhotoEl * 0.7075}px`;
			});
		}

		/**
		 * Метод устанавливает одинаковую высоту нижнему блоку отзыва (только для отзывов, которые помещаются в заданную высоту)
		 */
		setSameHeightBottom() {
			let reviewsItemElems = document.querySelectorAll('.reviews .reviews__item');
			let maxBottomHeight = 0;

			reviewsItemElems.forEach((itemEl) => {
				let textReviewEl = itemEl.querySelector('.reviews__desc');

				if (textReviewEl.scrollHeight > textReviewEl.offsetHeight) {
					maxBottomHeight = textReviewEl.parentElement.offsetHeight;
					textReviewEl.parentElement.style.height = `auto`;
				} else {
					textReviewEl.parentElement.style.height = `${maxBottomHeight}px`;
				}
			});
		}

		/**
		 * Метод добавляет отзывам, который не помещаются в заданную высоту, кнопки "Читать полностью"
		 */
		addButtonsReadFully() {
			let reviewsItemElems = document.querySelectorAll('.reviews .reviews__item');

			reviewsItemElems.forEach((itemEl) => {
				let textReviewEl = itemEl.querySelector('.reviews__desc');
				let innerEl = itemEl.querySelector('.reviews__inner');

				innerEl.innerHTML = '';

				if (textReviewEl.scrollHeight > textReviewEl.offsetHeight) {
					innerEl.insertAdjacentHTML('afterbegin', '<button type="button" class="reviews__fully">Читать полностью</button>');
				}
			});
		}

		/**
		 * Метод добавляет кнопкам "Читать полностью" слушатель события клика
		 * @param {ReviewDTO[]} reviews массив отзывов покупателей из файла reviews.js
		 */
		addButtonsFullyClickListener(reviews) {
			let fullyElems = document.querySelectorAll('.reviews__fully');

			fullyElems.forEach((fullyEl) => {
				fullyEl.addEventListener('click', (event) => {
					let idReview = +event.currentTarget.closest(".reviews__item").dataset.review;

					for (let review of reviews) {
						if (review.id == idReview) {
							let fullReview = this.getFullReview(review);
							this.popUpOverlayEl.style.display = 'block';
							this.popUpOverlayEl.insertAdjacentHTML('afterend', fullReview);
						}
					}

					this.addCloseElClickListener();
					this.addPopUpElemsClickListener();
				});
			});
		}

		/**
		 * Метод добавляет "Крестику" слушатель события клика
		 */
		addCloseElClickListener() {
			let popUpCloseEl = document.querySelector('.pop-up__close');
			popUpCloseEl.addEventListener('click', () => {
				let popUpEl = document.querySelector('.pop-up');
				this.popUpOverlayEl.style.display = 'none';
				popUpEl.style.display = 'none';
			});
		}

		/**
		 * При клике на затемненный фон всплывающее окно закрывается
		 */
		addPopUpElemsClickListener() {
			let popUpElems = document.querySelectorAll('.pop-up');
			popUpElems.forEach((popUpEl) => {
				popUpEl.addEventListener('click', (event) => {
					let popUpContainerEl = popUpEl.querySelector('.pop-up__container');
					if (event.target == popUpContainerEl) {
						this.popUpOverlayEl.style.display = 'none';
						popUpEl.style.display = 'none';
					}
				})
			});
		}

		/**
		 * Метод генерирует полный отзыв покупателя
		 * @param {ReviewDTO} review объект с отзывом покупателя
		 * @returns {string} html-разметка полного отзыва покупателя
		 */
		getFullReview(review) {
			return `
			<div class="pop-up">
	<div class="pop-up__container">
		<div class="pop-up__body pop-up__body_employee">
			<div class="reviews__item">
				<div class="reviews__bottom">
					<span class="reviews__name">${review.name}</span>
					<p class="reviews__desc">${review.text}</p>
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
</div>`;
		}

		/**
		 * Этот метод генерирует разметку отзыва покупателя
		 * @param {ReviewDTO} review объект с отзывом покупателя
		 * @returns {string} html-разметка отзыва покупателя
		 */
		getReviewMarkup(review) {
			return `
			<div class="reviews__item" data-review="${review.id}">
				<img src="${this.pathToReviewsImages}/${review.image}" alt="${review.name}" width="424" height="300" class="reviews__photo">
				<div class="reviews__bottom">
					<span class="reviews__name">${review.name}</span>
					<p class="reviews__desc">${review.text}</p>
					<div class="reviews__inner"></div>
				</div>
			</div>`;
		}
	}

	window.addEventListener('load', () => {
		let review = new Review();
		let idTownship = location.hash.replace(/#/, '');
		review.getWindowWidth(reviews, idTownship);
	});
})();