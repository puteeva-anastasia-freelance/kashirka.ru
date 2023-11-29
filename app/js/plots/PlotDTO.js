'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретном участке
 */
class PlotDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого участка
	 * @param {number} area площадь участка
	 * @param {number | null} priceOld старая цена участка
	 * @param {number} price цена участка
	 * @param {array} labels метки участка
	 * @param {string} image название файла с картинкой участка
	 * @param {number} numberOnPlan номер участка на плане
	 * @param {string} description описание участка
	 * @param {number} townshipId идентификатор поселка, в котором расположен участок
	 */
	constructor(id, area, priceOld, price, labels, image, numberOnPlan, description, townshipId) {
		this.id = id;
		this.area = area;
		this.priceOld = priceOld;
		this.price = price;
		this.labels = labels;
		this.image = image;
		this.numberOnPlan = numberOnPlan;
		this.description = description;
		this.townshipId = townshipId;
	}
}