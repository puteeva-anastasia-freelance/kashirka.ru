document.addEventListener('DOMContentLoaded', () => {

	var windowWidth = window.innerWidth;
	window.onresize = function () {
		var newWindowWidth = window.innerWidth;
		if (newWindowWidth != windowWidth) {
			windowWidth = newWindowWidth;
			location.reload();
		}
	};

	function checkWidth() {
		var windowWidth = $('body').innerWidth(),
			elem = $(".none-middle"),
			elemSmall = $(".none-small");
		if (windowWidth <= 1200) {
			elem.addClass('none');
		} else {
			elem.removeClass('none');
		}
		if (windowWidth <= 576) {
			elemSmall.addClass('none');
		} else {
			elemSmall.removeClass('none');
		}
	}

	checkWidth();

	$(window).scroll(function () {
		if ($(this).scrollTop() > ($('.first').outerHeight() + $('.main-header').outerHeight() - $(window).height())) {
			$('.first__down').addClass('show');
		} else
			$('.first__down').removeClass('show');
	});

	$('.first__down').click(function () {
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 1000);
		return false;
	});

	$('.liked').click(function () {
		let $liked = $(this).parent().find('.liked__icon');
		$liked.toggleClass('active');
	});

	//Переключение поселков

	$('#card-all').addClass('show');

	$('#tab-all').click(function () {
		$('.card__wrap-t').removeClass('show');
		$('#card-all').addClass('show');

		$('.tab-t').removeClass('tab__active');
		$('#tab-all').addClass('tab__active');
	});

	$('#tab-moscow').click(function () {
		$('.card__wrap-t').removeClass('show');
		$('#card-moscow').addClass('show');

		$('.tab-t').removeClass('tab__active');
		$('#tab-moscow').addClass('tab__active');
	});

	$('#tab-water').click(function () {
		$('.card__wrap-t').removeClass('show');
		$('#card-water').addClass('show');

		$('.tab-t').removeClass('tab__active');
		$('#tab-water').addClass('tab__active');
	});

	$('#tab-forest').click(function () {
		$('.card__wrap-t').removeClass('show');
		$('#card-forest').addClass('show');

		$('.tab-t').removeClass('tab__active');
		$('#tab-forest').addClass('tab__active');
	});

	//Переключение участков

	$('#card-all-p').addClass('show');

	$('#tab-all-p').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-all-p').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-all-p').addClass('tab__active');
	});

	$('#tab-look').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-look').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-look').addClass('tab__active');
	});

	$('#tab-coast').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-coast').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-coast').addClass('tab__active');
	});

	$('#tab-forest-p').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-forest-p').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-forest-p').addClass('tab__active');
	});

	$('#tab-neighbors').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-neighbors').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-neighbors').addClass('tab__active');
	});

	$('#tab-sale').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-sale').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-sale').addClass('tab__active');
	});

	$('#tab-big').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-big').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-big').addClass('tab__active');
	});

	$('#tab-favorable').click(function () {
		$('.card__wrap-p').removeClass('show');
		$('#card-favorable').addClass('show');

		$('.tab-p').removeClass('tab__active');
		$('#tab-favorable').addClass('tab__active');
	});

	//Переключение расположения

	$('#location-transport').addClass('show');

	$('#tab-transport').click(function () {
		$('.location__right').removeClass('show');
		$('#location-transport').addClass('show');

		$('.location__tab').removeClass('tab__active');
		$('#tab-transport').addClass('tab__active');
	});

	$('#tab-nature').click(function () {
		$('.location__right').removeClass('show');
		$('#location-nature').addClass('show');

		$('.location__tab').removeClass('tab__active');
		$('#tab-nature').addClass('tab__active');
	});

	$('#tab-sight').click(function () {
		$('.location__right').removeClass('show');
		$('#location-sight').addClass('show');

		$('.location__tab').removeClass('tab__active');
		$('#tab-sight').addClass('tab__active');
	});

	//Переключение хода строительства

	$('#progress-1').addClass('show');

	$('#tab-progress-1').click(function () {
		$('.progress__wrap').removeClass('show');
		$('#progress-1').addClass('show');

		$('.progress__tab').removeClass('progress__tab_active');
		$('#tab-progress-1').addClass('progress__tab_active');
	});

	$('#tab-progress-2').click(function () {
		$('.progress__wrap').removeClass('show');
		$('#progress-2').addClass('show');

		$('.progress__tab').removeClass('progress__tab_active');
		$('#tab-progress-2').addClass('progress__tab_active');
	});

	$('#tab-progress-3').click(function () {
		$('.progress__wrap').removeClass('show');
		$('#progress-3').addClass('show');

		$('.progress__tab').removeClass('progress__tab_active');
		$('#tab-progress-3').addClass('progress__tab_active');
	});

	//Переключение новостей

	$('#all-projects').addClass('show');

	$('#tab-all-projects').click(function () {
		$('.news__wrap').removeClass('show');
		$('#all-projects').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-all-projects').addClass('tab__active');
	});

	$('#tab-project-1').click(function () {
		$('.news__wrap').removeClass('show');
		$('#project-1').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-project-1').addClass('tab__active');
	});

	$('#tab-project-2').click(function () {
		$('.news__wrap').removeClass('show');
		$('#project-2').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-project-2').addClass('tab__active');
	});

	$('#tab-project-3').click(function () {
		$('.news__wrap').removeClass('show');
		$('#project-3').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-project-3').addClass('tab__active');
	});

	$('#tab-project-4').click(function () {
		$('.news__wrap').removeClass('show');
		$('#project-4').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-project-4').addClass('tab__active');
	});

	$('#tab-project-5').click(function () {
		$('.news__wrap').removeClass('show');
		$('#project-5').addClass('show');

		$('.news__tab').removeClass('tab__active');
		$('#tab-project-5').addClass('tab__active');
	});

	//Переключение избранного

	$('#chosen-all').addClass('show');

	$('#tab-all-chosen').click(function () {
		$('.card__wrap').removeClass('show');
		$('#chosen-all').addClass('show');

		$('.chosen__tab').removeClass('tab__active');
		$('#tab-all-chosen').addClass('tab__active');
	});

	$('#tab-township-chosen').click(function () {
		$('.card__wrap').removeClass('show');
		$('#chosen-township').addClass('show');

		$('.chosen__tab').removeClass('tab__active');
		$('#tab-township-chosen').addClass('tab__active');
	});

	$('#tab-plots-chosen').click(function () {
		$('.card__wrap').removeClass('show');
		$('#chosen-plots').addClass('show');

		$('.chosen__tab').removeClass('tab__active');
		$('#tab-plots-chosen').addClass('tab__active');
	});


	var aboutSwiper = new Swiper('#about-slider', {
		loop: true,
		slidesPerView: 'auto',
		speed: 600,
		navigation: {
			nextEl: '.about-swiper-button-next',
		},
		breakpoints: {
			320: {
				spaceBetween: 10,
			},
			577: {
				spaceBetween: 20,
			},
			993: {
				spaceBetween: 24,
			},
			1201: {
				spaceBetween: 32,
			}
		}
	})

	var tabsSwiper = new Swiper('#tabs-slider', {
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		freeMode: true,
		speed: 600,
		navigation: {
			nextEl: '.tab__button-next',
			prevEl: '.tab__button-prev',
		},
	})

	var tabsSwiperTownship = new Swiper('#tabs-slider-township', {
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		freeMode: true,
		speed: 600,
		navigation: {
			nextEl: '.tab__button-township-next',
			prevEl: '.tab__button-township-prev',
		},
	})

	var tabsSwiperNews = new Swiper('#tabs-slider-news', {
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		freeMode: true,
		speed: 600,
		navigation: {
			nextEl: '.tab__button-news-next',
			prevEl: '.tab__button-news-prev',
		},
	})

	var photoSwiper = new Swiper('#photo-slider', {
		loop: true,
		slidesPerView: 'auto',
		speed: 600,
		centeredSlides: true,
		roundLengths: true,
		navigation: {
			nextEl: '.photo-swiper-button-next',
			prevEl: '.photo-swiper-button-prev',
		},
		breakpoints: {
			320: {
				spaceBetween: 12,
			},
			577: {
				spaceBetween: 20,
			},
			993: {
				spaceBetween: 24,
			},
			1201: {
				spaceBetween: 42,
			},
		}
	})

	var standardSwiper = new Swiper('#standard-slider', {
		loop: true,
		speed: 600,
		navigation: {
			nextEl: '.standard-swiper-button-next',
			prevEl: '.standard-swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			577: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			993: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			1201: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		}
	})

	var progressSwiper = new Swiper('.progress-slider', {
		loop: true,
		speed: 800,
		navigation: {
			nextEl: '.progress-button-next',
			prevEl: '.progress-button-prev',
		},
		pagination: {
			el: '.progress-pagination',
			clickable: true,
		},
		breakpoints: {
			320: {
				spaceBetween: 10,
			},
			577: {
				spaceBetween: 20,
			},
			993: {
				spaceBetween: 24,
			},
			1201: {
				spaceBetween: 32,
			},
		}
	})

	$('.tab__button-next').click(function () {
		tabsSwiper.slideTo(8, 800, true);
	})

	$('.tab__button-prev').click(function () {
		tabsSwiper.slideTo(0, 800, true);
	})

	$('.tab__button-township-next').click(function () {
		tabsSwiperTownship.slideTo(8, 800, true);
	})

	$('.tab__button-township-prev').click(function () {
		tabsSwiperTownship.slideTo(0, 800, true);
	})

	$('.tab__button-news-next').click(function () {
		tabsSwiperNews.slideTo(8, 800, true);
	})

	$('.tab__button-news-prev').click(function () {
		tabsSwiperNews.slideTo(0, 800, true);
	})

	if (!$('.tab__button-next').hasClass("swiper-button-disabled")) {
		$('#tabs-slider .swiper-slide-visible:last').addClass('brighten');
	}

	if (!$('.tab__button-township-next').hasClass("swiper-button-disabled")) {
		$('#tabs-slider-township .swiper-slide-visible:last').addClass('brighten');
	}

	if (!$('.tab__button-news-next').hasClass("swiper-button-disabled")) {
		$('#tabs-slider-news .swiper-slide-visible:last').addClass('brighten');
	}

	var pagingTabs = function () {
		if (!$('.tab__button-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider .swiper-slide').removeClass('brighten');
			$('#tabs-slider .swiper-slide-visible:last').addClass('brighten');
		}

		if (!$('.tab__button-prev').hasClass("swiper-button-disabled")) {
			$('#tabs-slider .swiper-slide').removeClass('brighten');
			$('#tabs-slider .swiper-slide-visible:first').addClass('brighten');
		}

		if (!$('.tab__button-prev').hasClass("swiper-button-disabled") && !$('.tab__button-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider .swiper-slide').removeClass('brighten');
			$('#tabs-slider .swiper-slide-visible:first').addClass('brighten');
			$('#tabs-slider .swiper-slide-visible:last').addClass('brighten');
		}
	}

	var pagingTabsTownship = function () {
		if (!$('.tab__button-township-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-township .swiper-slide').removeClass('brighten');
			$('#tabs-slider-township .swiper-slide-visible:last').addClass('brighten');
		}

		if (!$('.tab__button-township-prev').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-township .swiper-slide').removeClass('brighten');
			$('#tabs-slider-township .swiper-slide-visible:first').addClass('brighten');
		}

		if (!$('.tab__button-township-prev').hasClass("swiper-button-disabled") && !$('.tab__button-township-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-township .swiper-slide').removeClass('brighten');
			$('#tabs-slider-township .swiper-slide-visible:first').addClass('brighten');
			$('#tabs-slider-township .swiper-slide-visible:last').addClass('brighten');
		}
	}

	var pagingTabsNews = function () {
		if (!$('.tab__button-news-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-news .swiper-slide').removeClass('brighten');
			$('#tabs-slider-news .swiper-slide-visible:last').addClass('brighten');
		}

		if (!$('.tab__button-news-prev').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-news .swiper-slide').removeClass('brighten');
			$('#tabs-slider-news .swiper-slide-visible:first').addClass('brighten');
		}

		if (!$('.tab__button-news-prev').hasClass("swiper-button-disabled") && !$('.tab__button-news-next').hasClass("swiper-button-disabled")) {
			$('#tabs-slider-news .swiper-slide').removeClass('brighten');
			$('#tabs-slider-news .swiper-slide-visible:first').addClass('brighten');
			$('#tabs-slider-news .swiper-slide-visible:last').addClass('brighten');
		}
	}

	$('#tabs-slider .swiper-button').on('click', function () {
		pagingTabs();
	})

	tabsSwiper.on('touchMove', function () {
		pagingTabs();
	})

	tabsSwiper.on('slideChange', function () {
		pagingTabs();
	})

	tabsSwiper.on('slideChangeTransitionEnd', function () {
		pagingTabs();
	})

	$('#tabs-slider-township .swiper-button').on('click', function () {
		pagingTabsTownship();
	})

	tabsSwiperTownship.on('touchMove', function () {
		pagingTabsTownship();
	})

	tabsSwiperTownship.on('slideChange', function () {
		pagingTabsTownship();
	})

	tabsSwiperTownship.on('slideChangeTransitionEnd', function () {
		pagingTabsTownship();
	})

	$('#tabs-slider-news .swiper-button').on('click', function () {
		pagingTabsNews();
	})

	tabsSwiperNews.on('touchMove', function () {
		pagingTabsNews();
	})

	tabsSwiperNews.on('slideChange', function () {
		pagingTabsNews();
	})

	tabsSwiperNews.on('slideChangeTransitionEnd', function () {
		pagingTabsNews();
	})

	var mlAbout = $('.container').css('margin-left');
	$('.about').css('margin-left', mlAbout);
	$('.about-swiper-button-next').css('right', mlAbout);
	$('.photo-swiper-button-next').css('right', mlAbout);
	$('.photo-swiper-button-prev').css('left', mlAbout);

	$('.input__tel').mask('+7 (999) 999-99-99');

	$('.employee__item').click(function () {
		var popup_id = $('#' + $(this).attr("rel"));
		$(popup_id).show();
		$('.pop-up__overlay').show();
	})
	$('.pop-up__close').click(function () {
		$('.pop-up__overlay, .pop-up').hide();
	})

	$('.button__write').click(function () {
		var popup_id = $('#' + $(this).attr("rel"));
		$(popup_id).show();
		$('.pop-up__overlay').show();
	})
	$('.pop-up__close').click(function () {
		$('.pop-up__overlay, .pop-up').hide();
	})

	$('.employee__all').click(function () {
		$('.employee__item').show();
		$('.employee__all').hide();
	});

	$('.reviews__more').click(function () {
		$('.reviews__item').show();
		$('.reviews__more').hide();
	})

	$('.news__more').click(function () {
		$('.news__item').show();
		$('.news__more').hide();
	})

	$('.main-header__menu-button').click(function () {
		$('.pop-up__overlay').show();
		$('.main-header__menu-left').toggleClass('active');
	});

	$('.main-header__menu-close').click(function () {
		$('.pop-up__overlay').hide();
		$('.main-header__menu-left').toggleClass('active');
	});

	$('.pop-up__overlay').click(function () {
		$('.pop-up__overlay').hide();
		$('.main-header__menu-left').toggleClass('active');
	});

	$('.card__more').click(function () {
		$('.card__inner').css('display', 'flex');
		$('.card__more').hide();
	});

	$('.card__bottom').mouseover(function () {
		let $card = $(this).parent('.card__inner');
		let $chevron = $(this).next('.chevron');
		$card.addClass('active');
		$chevron.addClass('active');
	});

	$('.card__bottom').mouseout(function () {
		let $card = $(this).parent('.card__inner');
		let $chevron = $(this).next('.chevron');
		$card.removeClass('active');
		$chevron.removeClass('active');
	});

	$('.chevron').mouseover(function () {
		let $card = $(this).parent('.card__inner');
		$card.addClass('active');
	});

	$('.chevron').mouseout(function () {
		let $card = $(this).parent('.card__inner');
		$card.removeClass('active');
	});

	$('#sorting').select2();

	$('#location-select').select2();

	$('#location-select').on('select2:select', function (e) {
		if ($('.select2-selection__rendered').text() == 'Транспортная доступность') {
			$('.location__right').removeClass('show');
			$('#location-transport').addClass('show');
		}
		if ($('.select2-selection__rendered').text() == 'Природа') {
			$('.location__right').removeClass('show');
			$('#location-nature').addClass('show');
		}
		if ($('.select2-selection__rendered').text() == 'Достопримечательности') {
			$('.location__right').removeClass('show');
			$('#location-sight').addClass('show');
		}

	});

	$('.standard__play').click(function () {
		$('.standard__video').get(0).play();
		$('.standard__video').attr('controls', '');
		$('.standard__play').hide();
	});

	if ($(window).width() <= 576) {
		$('.standard__video').attr('poster', 'assets/img/dist/standard-poster-small.jpg')
	}

	lightGallery(document.getElementById("gallery-plan"), {
		speed: 500,
		plugins: [lgZoom, lgHash],
		mobileSettings: {
			controls: true,
			showCloseIcon: true,
			download: true,
		},
	});

	var dynamicsCanvas = $("#dynamicsChart");
	var ctx = document.getElementById("dynamicsChart").getContext("2d");
	Chart.defaults.global.defaultFontFamily = "'PT Root UI', sans-serif";

	if ($(window).width() <= 1200)
		ctx.canvas.height = 363;

	if ($(window).width() <= 992)
		ctx.canvas.height = 470;

	if ($(window).width() <= 576)
		ctx.canvas.height = 1038;

	var dynamicsData = {
		labels: ["", "", "", "июн.2021", "июл.2021", "авг.2021", "сен.2021", "окт.2021", "ноя.2021", "дек.2021", "янв.2022", "фев.2022", "мар.2022", "апр.2022", "май 2022", "июн.2022", "июл.2022", "авг.2022", "сен.2022"],
		datasets: [{
			data: [, , , 265000, 271000, 277000, 280000, 288000, 292000, 296000, 313000, 337000, 352000, 373000, 396000, 400000, 401000, 417000, 422000],
			backgroundColor: 'rgba(255, 255, 255, 0)',
			borderColor: '#DF3F3F',
			borderWidth: 2,
		}]
	};

	if ($(window).width() <= 576) {
		dynamicsData.labels = ["", "", "", "июн.21", "июл.21", "авг.21", "сен.21", "окт.21", "ноя.21", "дек.21", "янв.22", "фев.22", "мар.22", "апр.22", "май 22", "июн.22", "июл.22", "авг.22", "сен.22"];
	}

	var lineChart = new Chart(dynamicsCanvas, {
		type: 'line',
		data: dynamicsData,
		options: {
			plugins: {
				legend: false
			},
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						userCallback: function (item, index) {
							if (!(index % 3)) return item;
						},
						autoSkip: false,
						fontSize: 13,
						fontColor: "#757575",
						padding: 6,
						maxRotation: 0,
						minRotation: 0
					}
				}],
				yAxes: [{
					gridLines: {
						drawBorder: false,
					},
					ticks: {
						fontSize: 15,
						fontColor: "#757575",
						stepSize: 50000,
						padding: 11,
						callback: function (value, index, values) {
							if (parseInt(value) >= 1000) {
								return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
							} else {
								return value;
							}
						},
					}
				}]
			},
			elements: {
				point: {
					radius: 0
				}
			}
		}
	});

	if ($(window).width() <= 992) {
		lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 12;
		lineChart.options.scales.yAxes[0].ticks.minor.fontSize = 13;
		lineChart.options.scales.xAxes[0].ticks.padding = 1;
	}

	if ($(window).width() <= 576) {
		lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 10.5;
		lineChart.options.scales.yAxes[0].ticks.minor.fontSize = 11;
		lineChart.options.scales.yAxes[0].ticks.padding = 5;
		lineChart.options.scales.xAxes[0].ticks.padding = 4;
	}

	if ($(window).width() <= 359)
		lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 9.5;

	if ($(window).width() <= 349)
		lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 8.5;

})