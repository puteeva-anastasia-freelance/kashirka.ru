ymaps.ready(['Panel']).then(function () {
	let map = new ymaps.Map("map", {
		center: [56.185107, 36.977631],
		zoom: 8,
		controls: []
	});

	let contentForTags = [];
	let pathToTownshipsImages = 'assets/img/dist/townships';

	function getOldMinCostHundred(plots, idTownship) {
		let arrayCostHundred = [];
		let j = 0;

		for (let i = 0; i < plots.length; i++) {
			if (plots[i].townshipId == idTownship) {
				if (plots[i].priceOld != null) {
					arrayCostHundred[j] = (plots[i].priceOld / plots[i].area).toFixed(0);
					j++;
				}
			}
		}

		return Math.min(...arrayCostHundred);
	}

	function getMinCostHundred(plots, idTownship) {
		let arrayCostHundred = [];
		let j = 0;

		for (let i = 0; i < plots.length; i++) {
			if (plots[i].townshipId == idTownship) {
				arrayCostHundred[j] = (plots[i].price / plots[i].area).toFixed(0);
				j++;
			}
		}

		return Math.min(...arrayCostHundred);
	}

	function setCostHundred(townships, plots) {
		for (let township of townships) {
			for (let plot of plots) {
				if (plot.townshipId == township.id) {
					let minCostHundred = getMinCostHundred(plots, plot.townshipId);
					let oldMinCostHundred = getOldMinCostHundred(plots, plot.townshipId);
					township.minCostHundred = minCostHundred;
					township.oldMinCostHundred = oldMinCostHundred;
				}
			}
		}
	}

	function formatNumber(number) {
		return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}

	function getPriceOldTownshipMarkup(township) {
		if (township.oldMinCostHundred != Infinity) {
			let priceOld = formatNumber(township.oldMinCostHundred);
			return `<span class="content__price content__price_old">от ${priceOld} руб/сот.</span>`;
		} else {
			return '';
		}
	}

	function getNumberPlotsForSale(plots, idTownship) {
		let count = 0;

		plots.forEach((plot) => {
			if (plot.townshipId == idTownship) {
				count++;
			}
		})

		return count;
	}

	setCostHundred(townships, plots);

	for (let i = 0; i < townships.length; i++) {
		let priceOldMarkup = getPriceOldTownshipMarkup(townships[i]);
		let numberPlotsForSale = getNumberPlotsForSale(plots, townships[i].id);

		contentForTags[i] = `<div class="content__inner" style="background: center / cover no-repeat url(${pathToTownshipsImages}/${townships[i].image});">
			<button type="button" class="liked content__liked"><svg width="28" height="23" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg" class="liked__icon"><path d="M24.3473 2.78577C23.7271 2.16522 22.9906 1.67295 22.1801 1.33709C21.3695 1.00124 20.5007 0.828369 19.6233 0.828369C18.7459 0.828369 17.8771 1.00124 17.0666 1.33709C16.256 1.67295 15.5196 2.16522 14.8993 2.78577L13.612 4.07303L12.3248 2.78577C11.0719 1.53288 9.3726 0.829019 7.60075 0.829019C5.8289 0.829019 4.12962 1.53288 2.87673 2.78577C1.62385 4.03866 0.919983 5.73794 0.919983 7.50979C0.919983 9.28164 1.62385 10.9809 2.87673 12.2338L4.164 13.5211L13.612 21.8651L23.0601 13.5211L24.3473 12.2338C24.9679 11.6135 25.4601 10.8771 25.796 10.0665C26.1319 9.25597 26.3047 8.38717 26.3047 7.50979C26.3047 6.6324 26.1319 5.7636 25.796 4.95304C25.4601 4.14248 24.9679 3.40603 24.3473 2.78577Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
			<div class="content__top">
			<h2 class="content__name">${townships[i].name}</h2>
			<div class="content__prices">
			${priceOldMarkup}
			<span class="content__price">от <span class="content__price_big">${formatNumber(townships[i].minCostHundred)}</span> руб/сот.</span>
			</div>
			<span class="content__distance">${townships[i].distance} км. от МКАД</span>
			</div>
			</div>
			<div class="content__bottom">
			<span class="content__quantity">Участков в продаже: <b>${numberPlotsForSale}</b></span>
			<a href="town-card.html#${townships[i].id}" class="content__more button">Подробнее</a>
			</div>`;
	}

	var panel = new ymaps.Panel();
	map.controls.add(panel, {
		float: 'right',
	});

	var collection = new ymaps.GeoObjectCollection(null, {
		hasBalloon: false,
	});

	for (let i = 0; i < townships.length; i++) {
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<span class="map__label-sign"><span class="map__label-sum">$[properties.iconContentQuantity]</span>$[properties.iconContentName]</span>',
			),
			MyIconContentLayoutClick = ymaps.templateLayoutFactory.createClass(
				'<span class="map__label-sign active"><span class="map__label-sum">$[properties.iconContentQuantity]</span>$[properties.iconContentName]</span>'
			),

			collection
			.add(new ymaps.Placemark([townships[i].coordinates[0], townships[i].coordinates[1]], {
				iconContentQuantity: `${getNumberPlotsForSale(plots, townships[i].id)}`,
				iconContentName: `${townships[i].name}`,
				balloonContent: `${contentForTags[i]}`,
			}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: 'assets/img/dist/map-ellipse.svg',
				iconImageSize: [18, 18],
				iconImageOffset: [-9, -9],
				iconContentOffset: [-45, 0],
				iconContentLayout: MyIconContentLayout,
			}));
	}

	map.geoObjects.add(collection);

	collection.events.add('click', function (e) {
		var target = e.get('target');

		panel.setContent(target.properties.get('balloonContent'));

		collection.each(function (object) {
			object.options.set("iconContentLayout", MyIconContentLayout);
		});

		e.get('target').options.set("iconContentLayout", MyIconContentLayoutClick);

		var heightMap = $('.map__wrap').outerHeight();
		var heightSidePanel = $('.customControl').outerHeight();
		var topSidePanel = (heightMap - heightSidePanel) / 2;
		$('.customControl').css('top', topSidePanel);
	});

	collection.events.add('mouseenter', function (e) {
		e.get('target').options.set("iconImageHref", 'assets/img/dist/map-ellipse-hover.svg');
	})

	collection.events.add('mouseleave', function (e) {
		e.get('target').options.set("iconImageHref", 'assets/img/dist/map-ellipse.svg');
	})

	$("#map").on("click", ".liked", function () {
		let $liked = $(this).parent().find('.liked__icon');
		$liked.toggleClass('active');
	});

	$("#map").on("click", ".closeButton", function () {
		collection.each(function (object) {
			object.options.set("iconContentLayout", MyIconContentLayout);
		});
	});

	let tabElems = document.querySelectorAll('#tabs-slider-map .tab');

	tabElems.forEach((tabEl) => {
		tabEl.addEventListener('click', () => {
			if (document.querySelector('#tabs-slider-map .tab.active')) {
				document.querySelector('#tabs-slider-map .tab.active').classList.remove('active');
			}
			tabEl.classList.add('active');
		});
	});

	let logoLink = document.querySelector('.ymaps-2-1-79-copyright__logo');
	logoLink.href = 'https://yandex.ru/legal/maps_termsofuse/?lang=ru';
});

ymaps.modules.define('Panel', [
	'util.augment',
	'collection.Item'
], function (provide, augment, item) {
	var Panel = function (options) {
		Panel.superclass.constructor.call(this, options);
	};

	augment(Panel, item, {
		onAddToMap: function (map) {
			Panel.superclass.onAddToMap.call(this, map);
			this.getParent().getChildElement(this).then(this._onGetChildElement, this);
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
			this._$control = $('<div class="customControl"><div class="content"></div><button type="button" class="closeButton"><svg class="closeButton-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.28627 0.714294L0.714844 9.28572" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.714844 0.714294L9.28627 9.28572" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>').appendTo(parentDomContainer);
			this._$content = $('.content');
			$('.closeButton').on('click', this._onClose);
		},
		_onClose: function () {
			$('.customControl').css('display', 'none');
		},
		setContent: function (text) {
			this._$control.css('display', 'flex');
			this._$content.html(text);
		}
	});

	provide(Panel);
});