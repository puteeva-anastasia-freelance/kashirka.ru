'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретной новости
 */
class NewsDTO {
	/**
	 * @param {number} id уникальный идентификатор каждой новости
	 * @param {string} title заголовок новости
	 * @param {string} shortDescription краткое описание новости
	 * @param {string} date дата опубликования новости
	 * @param {string} image фотография новости
	 * @param {string} imageMiddle фотография новости среднего размера
	 * @param {number || string} townshipId идентификатор поселка, к которому относится новость или "Все проекты", если новость относится ко всем поселкам
	 * @param {string} fullDescription полное описание новости
	 */
	constructor(id, title, shortDescription, date, image, imageMiddle, townshipId, fullDescription) {
		this.id = id;
		this.title = title;
		this.shortDescription = shortDescription;
		this.date = date;
		this.image = image;
		this.imageMiddle = imageMiddle;
		this.townshipId = townshipId;
		this.fullDescription = fullDescription;
	}
}