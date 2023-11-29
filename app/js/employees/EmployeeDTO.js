'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретном сотруднике
 */
class EmployeeDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого сотрудника
	 * @param {string} name имя сотрудника
	 * @param {string} surname фамилия сотрудника
	 * @param {string} post должность сотрудника
	 * @param {string} photo название файла с фотографией сотрудника
	 * @param {string} info информация о сотруднике
	 * @param {string} phone номер телефона сотрудника
	 * @param {string} email адрес электронной почты сотрудника
	 * @param {string} tg телеграм сотрудника
	 * @param {number} experience опыт работы
	 */
	constructor(id, name, surname, post, photo, info, phone, email, tg, experience) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.post = post;
		this.photo = photo;
		this.info = info;
		this.phone = phone;
		this.email = email;
		this.tg = tg;
		this.experience = experience;
	}
}