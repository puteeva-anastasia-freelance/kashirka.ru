'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретной карточке, что сделано в поселке
 */
class StandardDTO {
	/**
	 * @param {number} id уникальный идентификатор каждой карточки
	 * @param {string} image название файла с фотографией карточки
	 * @param {string} subtitle подзаголовок карточки
	 * @param {string} text текст карточки
	 * @param {string} townshipId идентификатор поселка, к которому относится данная карточка
	 */
	constructor(id, image, subtitle, text, townshipId) {
		this.id = id;
		this.image = image;
		this.subtitle = subtitle;
		this.text = text;
		this.townshipId = townshipId;
	}
}