$(window).on('load', function () {

	//При клике на элемент с классом first__down плавно скроллить к блоку с id="townships"
	$('.first__down').click(function () {
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top + 50
		}, 1000);
		return false;
	});

	let idTownship = location.hash.replace(/#/, '');

	//При клике на кнопку "Каталог участков" скроллить к блоку с id="plots"
	$('.banner__button').click(function () {
		$("html, body").animate({
			scrollTop: $('#plots').offset().top + 50
		}, 0, function () {
			window.location.hash = idTownship;
		});
	});

	//Создадим маску для поля ввода телефона
	$('.input__tel').mask('+7 (999) 999-99-99');
});