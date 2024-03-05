"use strict";

// Калькулятор стоимости
const calcInput = document.getElementById('areaInput');
const calcRange = document.getElementById('areaRange');
const calcResult = document.getElementById('calcResult');

calcInput.addEventListener('change', function() {
	calcRange.value = this.value;
	calcUpdate();
});
calcRange.addEventListener('input', function() {
	calcUpdate();
});

function calcUpdate() {
	calcInput.value = calcRange.value;
	calcResult.textContent = priceCalc();
	updateRangeStyle(calcRange, fillColor, emptyColor);
}
function priceCalc() {
	let squareMeterPrice = 1500;
	return (squareMeterPrice * calcRange.value)
}

document.addEventListener('DOMContentLoaded', function() {
	calcUpdate();
});

//input range
const fillColor = "rgb(0, 91, 255)",
	emptyColor = "rgb(232, 235, 239)";
const rangeInputs = document.querySelectorAll('input[type="range"]');

rangeInputs.forEach(input => {
	updateRangeStyle(input, fillColor, emptyColor);

	input.addEventListener('input', function () {
		updateRangeStyle(this, fillColor, emptyColor);
	});
});

function updateRangeStyle(input, fillColor, emptyColor) {
	let percent = ((input.value - input.min) / (input.max - input.min)) * 100;
	if (percent < 50) {
		percent += 1;
	} else if (percent > 50) {
		percent -= 1;
	}
	input.style.backgroundImage = `linear-gradient(to right, ${fillColor}, ${fillColor} ${percent}%, ${emptyColor} ${percent}%)`;
}


// Отпрака формы
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
	e.preventDefault(); // Предотвращаем стандартное поведение отправки формы

	const formData = new FormData(form); // Создаем объект FormData из данных формы

	const formDataObject = {}; // Инспектирование
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	console.log(formDataObject);

	try {
		const response = await fetch('/submit-url', {
			method: 'POST',
			body: formData // Передаем объект FormData в качестве тела запроса
		});
		
		if (response.ok) {
			const data = await response.json(); // Парсим JSON из ответа, если он есть
			console.log('Успешный ответ от сервера:', data);
		} else {
			console.error('Ошибка при отправке данных на сервер:', response.status);
		}
	} catch (error) {
		console.error('Ошибка при выполнении fetch запроса:', error);
	}
});