"use strict";

// Калькулятор стоимости
const calcInput = document.getElementById('areaInput');
const calcRange = document.getElementById('areaRange');
const calcResult = document.getElementById('calcResult');
const calcRadio = document.querySelectorAll('.radio_button input[type="radio"]');

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
	let squareMeterPrice;
	calcRadio.forEach(function(input) {
		if (input.checked) {
			squareMeterPrice = input.value;
		}
		input.addEventListener('input', function () {
			squareMeterPrice = input.value;
			calcUpdate();
		});
	});
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

// преобразование номера
const telephone = document.getElementById('tel');
telephone.addEventListener('input', function() {
	this.value = phoneFormat(this.value);
	console.log(this.value.length)
});
function phoneFormat(input) {
	input = input.replace(/\D/g,'');
	let size = input.length;
	if (size>0) {input="("+input}
	if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
	if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
	if (size>8) {input=input.slice(0,12)+"-" +input.slice(12)}
	return input;
}

/* Копирование номера телефона */
const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function(event) {
	event.preventDefault();
	navigator.clipboard.writeText(phoneNumber) // Копируем номер телефона в буфер обмена
		.catch(error => {
			console.error('Ошибка копирования ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства
	if (isMobileDevice) { // Если устройство мобильное, открываем приложение мобильного телефона
		window.location.href = `tel:${phoneNumber}`;
	} else {
		alert('Номер телефона скопирован');
	}
});

const emailAddressBlock = document.getElementById('emailAddress');
const emailAddress = emailAddressBlock.getAttribute('data-email-address');

emailAddressBlock.addEventListener('click', function(event) {
	event.preventDefault();
	const mailtoLink = 'mailto:' + emailAddress;
	window.location.href = mailtoLink;
});