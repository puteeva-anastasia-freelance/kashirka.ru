'use strict';

/**
 * Этот класс будет хранить в себе информацию о ходе строительства конкретного поселка
 */
class ConstructionDTO {
	/**
	 * @param {number} id уникальный идентификатор информации о строительстве за конкретный месяц
	 * @param {string} data дата строительства 
	 * @param {array} images названия файлов с фотографиями прогресса строительства
	 * @param {array} imagesMiddle названия файлов с фотографиями прогресса строительства среднего размера
	 * @param {string} townshipId идентификатор поселка, к которому относится данная информация о строительстве
	 */
	constructor(id, date, images, imagesMiddle, townshipId) {
		this.id = id;
		this.date = date;
		this.images = images;
		this.imagesMiddle = imagesMiddle;
		this.townshipId = townshipId;
	}
}