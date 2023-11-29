"use strict";

const infrastructures = [
	new InfrastructureDTO(
		0,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		0
	),
	new InfrastructureDTO(
		1,
		'transport',
		'7.webp',
		'Остановка Шишкино',
		300,
		0
	),
	new InfrastructureDTO(
		2,
		'nature',
		'3.webp',
		'Парк Борисовские пруды',
		770,
		0
	),
	new InfrastructureDTO(
		3,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		0
	),
	new InfrastructureDTO(
		4,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		0
	),
	new InfrastructureDTO(
		5,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		0
	),
	new InfrastructureDTO(
		6,
		'transport',
		'7.webp',
		'Остановка Шишкино',
		300,
		1
	),
	new InfrastructureDTO(
		7,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		1
	),
	new InfrastructureDTO(
		8,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		1
	),
	new InfrastructureDTO(
		9,
		'nature',
		'4.webp',
		'Парк Коломенское',
		1700,
		1
	),
	new InfrastructureDTO(
		10,
		'sight',
		'5.webp',
		'Церковь Живоначальной Троицы',
		950,
		1
	),
	new InfrastructureDTO(
		11,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		1
	),
	new InfrastructureDTO(
		12,
		'transport',
		'1.webp',
		'Остановка общ. транспорта «Москворечье»',
		800,
		2
	),
	new InfrastructureDTO(
		13,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		2
	),
	new InfrastructureDTO(
		14,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		2
	),
	new InfrastructureDTO(
		15,
		'nature',
		'3.webp',
		'Парк Борисовские пруды',
		770,
		2
	),
	new InfrastructureDTO(
		16,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		2
	),
	new InfrastructureDTO(
		17,
		'sight',
		'5.webp',
		'Церковь Живоначальной Троицы',
		950,
		2
	),
	new InfrastructureDTO(
		18,
		'transport',
		'7.webp',
		'Остановка Шишкино',
		300,
		3
	),
	new InfrastructureDTO(
		19,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		3
	),
	new InfrastructureDTO(
		20,
		'nature',
		'3.webp',
		'Парк Борисовские пруды',
		770,
		3
	),
	new InfrastructureDTO(
		21,
		'nature',
		'4.webp',
		'Парк Коломенское',
		1700,
		3
	),
	new InfrastructureDTO(
		22,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		3
	),
	new InfrastructureDTO(
		23,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		3
	),
	new InfrastructureDTO(
		24,
		'transport',
		'1.webp',
		'Остановка общ. транспорта «Москворечье»',
		800,
		4,
	),
	new InfrastructureDTO(
		25,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		4,
	),
	new InfrastructureDTO(
		26,
		'nature',
		'3.webp',
		'Парк Борисовские пруды',
		770,
		4,
	),
	new InfrastructureDTO(
		27,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		4,
	),
	new InfrastructureDTO(
		28,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		4,
	),
	new InfrastructureDTO(
		29,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		4,
	),
	new InfrastructureDTO(
		30,
		'transport',
		'1.webp',
		'Остановка общ. транспорта «Москворечье»',
		800,
		7,
	),
	new InfrastructureDTO(
		31,
		'transport',
		'7.webp',
		'Остановка Шишкино',
		300,
		7,
	),
	new InfrastructureDTO(
		32,
		'nature',
		'4.webp',
		'Парк Коломенское',
		1700,
		7,
	),
	new InfrastructureDTO(
		33,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		7,
	),
	new InfrastructureDTO(
		34,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		7,
	),
	new InfrastructureDTO(
		35,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		7,
	),
	new InfrastructureDTO(
		36,
		'transport',
		'1.webp',
		'Остановка общ. транспорта «Москворечье»',
		800,
		8,
	),
	new InfrastructureDTO(
		37,
		'transport',
		'2.webp',
		'м. «Кантемировская»',
		1350,
		8,
	),
	new InfrastructureDTO(
		38,
		'nature',
		'3.webp',
		'Парк Борисовские пруды',
		770,
		8,
	),
	new InfrastructureDTO(
		39,
		'nature',
		'8.webp',
		'Река Злодейка',
		250,
		8,
	),
	new InfrastructureDTO(
		40,
		'sight',
		'6.webp',
		'Церковь Николая Чудотворца',
		690,
		8,
	),
	new InfrastructureDTO(
		41,
		'sight',
		'9.webp',
		'Мелихово (музей-заповедник А.П. Чехова)',
		15000,
		8,
	)
];