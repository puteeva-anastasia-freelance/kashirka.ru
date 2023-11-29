'use strict';

/**
 * Этот класс будет хранить в себе информацию об отзывах о поселках
 */
class ReviewDTO {
	/**
	 * @param {number} id уникальный идентификатор отзыва
	 * @param {string} image название файла с фотографией покупателя, который оставил отзыв
	 * @param {string} name имя или имена покупателей, которые оставили отзыв
	 * @param {string} text текст отзыва
	 * @param {string} townshipId идентификатор поселка, к которому относится данный отзыв
	 */
	constructor(id, image, name, text, townshipId) {
		this.id = id;
		this.image = image;
		this.name = name;
		this.text = text;
		this.townshipId = townshipId;
	}
}