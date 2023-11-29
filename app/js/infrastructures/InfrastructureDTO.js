'use strict';

/**
 * Этот класс будет хранить в себе информацию о ближлежайшей инфраструктуре поселка
 */
class InfrastructureDTO {
	/**
	 * @param {number} id уникальный идентификатор инфраструктуры
	 * @param {string} type тип инфраструктуры
	 * @param {string} image название файла с фотографией инфраструктуры
	 * @param {string} place название инфраструктуры
	 * @param {number} distance расстояние от поселка до инфраструктуры
	 * @param {string} townshipId идентификатор поселка, к которому относится данная инфраструктура
	 */
	constructor(id, type, image, place, distance, townshipId) {
		this.id = id;
		this.type = type;
		this.image = image;
		this.place = place;
		this.distance = distance;
		this.townshipId = townshipId;
	}
}