var dynamicsCanvas = document.getElementById("dynamicsChart");
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