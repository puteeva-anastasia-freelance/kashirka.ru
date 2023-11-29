'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретном поселке
 */
class TownshipDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого поселка
	 * @param {string} name название поселка
	 * @param {number} distance удаленность поселка от МКАД
	 * @param {array} labels метки поселка
	 * @param {string} image название файла с картинкой поселка
	 * @param {string} imageMiddle image название файла с картинкой поселка среднего размера
	 * @param {array} communications коммуникации
	 * @param {array} images названия файлов с дополнительными картинками 
	 * @param {array} imagesMiddle названия файлов с дополнительными картинками среднего размера
	 * @param {string} description описание поселка
	 * @param {string} video название файла с видео о поселке
	 * @param {string} onMap ссылка на яндекс-карту поселка на карте
	 * @param {string} panorama ссылка на панораму поселка
	 * @param {string} plan название файла с планом поселка
	 * @param {string} planMiddle название файла с планом поселка среднего размера
	 * @param {array} coordinates координаты поселка
	 */
	constructor(id, name, distance, labels, image, imageMiddle, communications, images, imagesMiddle, description, video, onMap, panorama, plan, planMiddle, coordinates) {
		this.id = id;
		this.name = name;
		this.distance = distance;
		this.labels = labels;
		this.image = image;
		this.imageMiddle = imageMiddle;
		this.communications = communications;
		this.images = images;
		this.imagesMiddle = imagesMiddle;
		this.description = description;
		this.video = video;
		this.onMap = onMap;
		this.panorama = panorama;
		this.plan = plan;
		this.planMiddle = planMiddle;
		this.coordinates = coordinates;
	}
}