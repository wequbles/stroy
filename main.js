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
	calcResult.textContent = `≈ ${priceCalc()} ₽`;
	updateRangeStyle(calcRange);
}
function priceCalc() {
	let squareMeterPrice = 1500;
	return (squareMeterPrice * calcRange.value).toLocaleString()
}

document.addEventListener('DOMContentLoaded', function() {
	calcUpdate();
});

//input range
for (let e of document.querySelectorAll('input[type="range"]')) {
	e.style.setProperty('--value', e.value);
	e.style.setProperty('--min', e.min == '' ? '0' : e.min);
	e.style.setProperty('--max', e.max == '' ? '100' : e.max);
	e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
function updateRangeStyle(e) {
	e.style.setProperty('--value', e.value);
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