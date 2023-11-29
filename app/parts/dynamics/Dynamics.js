(function () {
	"use strict";

	/**
	 * Класс для отрисовки динамики цен в поселке
	 */
	class Dynamics {
		constructor() {
			this.dynamicsCanvas = document.getElementById("dynamicsChart");
		}

		/**
		 * Метод инициализирует управление динамикой цен в поселке
		 */
		init() {
			Chart.defaults.global.defaultFontFamily = "'PT Root UI', sans-serif";

			this.setHeightField();

			let dynamicsData = {
				labels: ["", "", "", "июн.2021", "июл.2021", "авг.2021", "сен.2021", "окт.2021", "ноя.2021", "дек.2021", "янв.2022", "фев.2022", "мар.2022", "апр.2022", "май 2022", "июн.2022", "июл.2022", "авг.2022", "сен.2022"],
				datasets: [{
					data: [, , , 265000, 271000, 277000, 280000, 288000, 292000, 296000, 313000, 337000, 352000, 373000, 396000, 400000, 401000, 417000, 422000],
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderColor: '#DD3636',
					borderWidth: 2,
				}]
			};

			this.setLabelsData(dynamicsData);

			let lineChart = this.createGraph(dynamicsData);

			this.controlScale(lineChart);

			this.addWindowResizeListener(lineChart, dynamicsData);
		}

		/**
		 * Метод добавляет слушатель изменения ширины экрана браузера
		 * @param {Object} lineChart линейная диаграмма
		 * @param {Object} dynamicsData набор данных
		 */
		addWindowResizeListener(lineChart, dynamicsData) {
			window.addEventListener('resize', () => {
				lineChart.destroy();

				this.setHeightField();

				this.setLabelsData(dynamicsData);

				lineChart = this.createGraph(dynamicsData);

				this.controlScale(lineChart);
			});
		}

		/**
		 * Метод создает график
		 * @param {Object} dynamicsData набор данных
		 */
		createGraph(dynamicsData) {
			return new Chart(this.dynamicsCanvas, {
				type: 'line',
				data: dynamicsData,
				options: {
					plugins: {
						legend: false,
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
					},
				}
			});
		}

		/**
		 * Метод устанавливает высоту области в зависимости от ширины экрана
		 */
		setHeightField() {
			let ctx = document.getElementById("dynamicsChart").getContext("2d");

			if (window.innerWidth > 1200) {
				ctx.canvas.height = 257;
			}

			if (window.innerWidth <= 1200) {
				ctx.canvas.height = 363;
			}


			if (window.innerWidth <= 992) {
				ctx.canvas.height = 470;
			}


			if (window.innerWidth <= 576) {
				ctx.canvas.height = 1038;
			}
		}

		/**
		 * Метод устанавливает метки данных
		 * @param {Object} dynamicsData набор данных
		 */
		setLabelsData(dynamicsData) {
			if (window.innerWidth <= 576) {
				dynamicsData.labels = ["", "", "", "июн.21", "июл.21", "авг.21", "сен.21", "окт.21", "ноя.21", "дек.21", "янв.22", "фев.22", "мар.22", "апр.22", "май 22", "июн.22", "июл.22", "авг.22", "сен.22"];
			} else {
				dynamicsData.labels = ["", "", "", "июн.2021", "июл.2021", "авг.2021", "сен.2021", "окт.2021", "ноя.2021", "дек.2021", "янв.2022", "фев.2022", "мар.2022", "апр.2022", "май 2022", "июн.2022", "июл.2022", "авг.2022", "сен.2022"];
			}
		}

		/**
		 * Метод управляет шкалой
		 * @param {Object} lineChart линейная диаграмма
		 */
		controlScale(lineChart) {
			if (window.innerWidth <= 992) {
				lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 12;
				lineChart.options.scales.yAxes[0].ticks.minor.fontSize = 13;
				lineChart.options.scales.xAxes[0].ticks.padding = 1;
			}

			if (window.innerWidth <= 576) {
				lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 10.5;
				lineChart.options.scales.yAxes[0].ticks.minor.fontSize = 11;
				lineChart.options.scales.yAxes[0].ticks.padding = 5;
				lineChart.options.scales.xAxes[0].ticks.padding = 4;
			}

			if (window.innerWidth <= 359) {
				lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 9.5;
			}


			if (window.innerWidth <= 349) {
				lineChart.options.scales.xAxes[0].ticks.minor.fontSize = 8.5;
			}
		}
	}


	window.addEventListener('load', () => {
		let dynamics = new Dynamics();
		dynamics.init();
	});
})();