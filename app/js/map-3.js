ymaps.ready(['Panel']).then(function () {
	var map = new ymaps.Map("map", {
		center: [56.185107, 36.977631],
		zoom: 8,
		controls: []
	});
	// Создадим контент для меток.
	var firstOffice = '<div class="content__inner" style="background: center / cover no-repeat url(assets/img/dist/township-1.jpg);">' +
		'<button type="button" class="liked content__liked"><svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon"><path d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></button>' +
		'<div class="content__top">' +
		'<h2 class="content__name">Лесные берега</h2>' +
		'<div class="content__prices">' +
		'<span class="content__price content__price_old">от 85 000 руб/сот.</span>' +
		'<span class="content__price">от <span class="content__price_big">75 000</span> руб/сот.</span>' +
		'</div>' +
		'<span class="content__distance">38 км. от МКАД</span>' +
		'</div>' +
		'</div>' +
		'<div class="content__bottom">' +
		'<span class="content__quantity">Участков в продаже: <b>18</b></span>' +
		'<a href="town-card.html" class="content__more button">Подробнее</a>' +
		'</div>';
	var secondOffice = '<div class="content__inner" style="background: center / cover no-repeat url(assets/img/dist/township-2.jpg);">' +
		'<button type="button" class="liked content__liked"><svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon"><path d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></button>' +
		'<div class="content__top">' +
		'<h2 class="content__name">Каширка вилладж</h2>' +
		'<div class="content__prices">' +
		'<span class="content__price content__price_old none"></span>' +
		'<span class="content__price">от <span class="content__price_big">85 000</span> руб/сот.</span>' +
		'</div>' +
		'<span class="content__distance">38 км. от МКАД</span>' +
		'</div>' +
		'</div>' +
		'<div class="content__bottom">' +
		'<span class="content__quantity">Участков в продаже: <b>23</b></span>' +
		'<a href="town-card.html" class="content__more button">Подробнее</a>' +
		'</div>';
	// Создадим и добавим панель на карту.
	var panel = new ymaps.Panel();
	map.controls.add(panel, {
		float: 'right',
		position: {
			right: '20px'
		}
	});
	// Создадим коллекцию геообъектов.
	var collection = new ymaps.GeoObjectCollection(null, {
		// Запретим появление балуна.
		hasBalloon: false,
	});

	// Создаём макет содержимого.
	MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<span class="map__label-sign"><span class="map__label-sum">$[properties.iconContent]</span>$[properties.iconContent2]</span>'
		),
	MyIconContentLayout2 = ymaps.templateLayoutFactory.createClass(
			'<span class="map__label-sign active"><span class="map__label-sum">$[properties.iconContent]</span>$[properties.iconContent2]</span>'
		),
		// Добавим геообъекты в коллекцию.
		collection
		.add(new ymaps.Placemark([56.370077, 34.774790], {
			iconContent: 18,
			iconContent2: 'Озерный',
			balloonContent: firstOffice,
		}, /*текст появляющийся после нажатия*/ {
			iconLayout: 'default#imageWithContent',
			iconImageHref: '../assets/img/dist/map-ellipse.svg',
			iconImageSize: [48, 48],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-24, -24],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [15, 15],
			iconContentLayout: MyIconContentLayout,
		}))
		.add(new ymaps.Placemark([55.758240, 37.678523], {
			iconContent: '<span class="map__label-sign"><span class="map__label-sum">23</span>Каширка вилладж</span>',
			balloonContent: secondOffice,
		}, /*текст появляющийся после нажатия*/ {
			preset: 'islands#redCircleIcon',
		}));
	// Добавим коллекцию на карту.
	map.geoObjects.add(collection);

	// Подпишемся на событие клика по коллекции.
	collection.events.add('click', function (e) {
		// Получим ссылку на геообъект, по которому кликнул пользователь.
		var target = e.get('target');
		// Зададим контент боковой панели.
		panel.setContent(target.properties.get('balloonContent'));
		// Переместим центр карты по координатам метки с учётом заданных отступов.
		/*	map.panTo(target.geometry.getCoordinates(), {
				useMapMargin: true
			});*/
		$('.map__label-sign').removeClass('active');

		//e.get('target').options.set('pane', 'overlaps');

		var test = target.properties.get('iconContent');
		console.log(MyIconContentLayout);
		e.get('target').options.set("iconContentLayout", MyIconContentLayout2);

		//$(target.properties.get('iconContent')).addClass("active");
		//console.log($(target.properties.get('iconContent')).addClass("active"))

		/*	test = test.replace("map__label-sign", "map__label-sign active"); */
		//target.properties._data.iconContent = test;

		//target.setContent('<span class="map__label-sign active"><span class="map__label-sum">37</span>Озерный</span>');t
		//test.innerHTML('<span class="map__label-sign active"><span class="map__label-sum">37</span>Озерный</span>');
		//console.log(test);
		//e.get('target').options.set('preset', 'islands#greenIcon');

		/*Центрировать боковую панель по оси Y*/
		var heightMap = $('.map__wrap').outerHeight();
		var heightSidePanel = $('.customControl').outerHeight();
		var topSidePanel = (heightMap - heightSidePanel) / 2;
		$('.customControl').css('top', topSidePanel);
	});
});

$("#map").on("click", ".liked", function () {
	let $liked = $(this).parent().find('.liked__icon');
	$liked.toggleClass('active');
});

//$("#map").on("click", ".closeButton", function (e) {
//	var target = e.get('target');
//console.log(target);
//});

// Пример реализации боковой панели на основе наследования от collection.Item.
// Боковая панель отображает информацию, которую мы ей передали.
ymaps.modules.define('Panel', [
	'util.augment',
	'collection.Item'
], function (provide, augment, item) {
	// Создаем собственный класс.
	var Panel = function (options) {
		Panel.superclass.constructor.call(this, options);
	};

	// И наследуем его от collection.Item.
	augment(Panel, item, {
		onAddToMap: function (map) {
			Panel.superclass.onAddToMap.call(this, map);
			this.getParent().getChildElement(this).then(this._onGetChildElement, this);
			// Добавим отступы на карту.
			// Отступы могут учитываться при установке текущей видимой области карты,
			// чтобы добиться наилучшего отображения данных на карте.
			map.margin.addArea({
				top: 0,
				left: 0,
				width: '340px',
				height: '100%'
			})
		},

		onRemoveFromMap: function (oldMap) {
			if (this._$control) {
				this._$control.remove();
			}
			Panel.superclass.onRemoveFromMap.call(this, oldMap);
		},

		_onGetChildElement: function (parentDomContainer) {
			// Создаем HTML-элемент с текстом.
			// По-умолчанию HTML-элемент скрыт.
			this._$control = $('<div class="customControl"><div class="content"></div><button type="button" class="closeButton"><svg class="closeButton-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.28627 0.714294L0.714844 9.28572" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.714844 0.714294L9.28627 9.28572" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>').appendTo(parentDomContainer);
			this._$content = $('.content');
			// При клике по крестику будем скрывать панель.
			$('.closeButton').on('click', this._onClose);
		},
		_onClose: function () {
			$('.customControl').css('display', 'none');
			$('.map__label-sign').removeClass('active');
		},
		// Метод задания контента панели.
		setContent: function (text) {
			// При задании контента будем показывать панель.
			this._$control.css('display', 'flex');
			this._$content.html(text);
		}
	});

	provide(Panel);
});