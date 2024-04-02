"use strict";

const calcRadio = document.querySelectorAll('.radio_button input[type="radio"]');

const calcInput = document.getElementById('areaInput');
const calcRange = document.getElementById('areaRange');
const calcResult = document.getElementById('calcResult');

document.addEventListener('DOMContentLoaded', function() {
	calcUpdate();
});

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


for (let e of document.querySelectorAll('input[type="range"]')) {
	updateRangeStyle(e);
	e.style.setProperty('--min', e.min == '' ? '0' : e.min);
	e.style.setProperty('--max', e.max == '' ? '100' : e.max);
	e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

function updateRangeStyle(e) {
	e.style.setProperty('--value', e.value);
}


const phoneInput = document.getElementById('tel');

phoneInput.addEventListener('input', function() {
	this.value = phoneFormat(this.value);
});

function phoneFormat(input) {
	input = input.replace(/\D/g,'');
	let size = input.length;
	if (size > 0) {input = "(" + input}
	if (size > 3) {input = input.slice(0,4) + ") " + input.slice(4,11)}
	if (size > 6) {input = input.slice(0,9) + "-" + input.slice(9)}
	if (size > 8) {input = input.slice(0,12) + "-" + input.slice(12)}
	return input;
}


const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function(event) {
	event.preventDefault();

	navigator.clipboard.writeText(phoneNumber)
		.catch(error => {
			console.error('Copy error ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (isMobileDevice) {
		window.location.href = `tel:${phoneNumber}`;
	} else {
		alert('Номер телефона скопирован');
	}
});


const emailAddressBlock = document.getElementById('emailAddress');
const emailAddress = emailAddressBlock.getAttribute('data-email-address');

emailAddressBlock.addEventListener('click', function(event) {
	event.preventDefault();

	navigator.clipboard.writeText(emailAddress)
		.catch(error => {
			console.error('Copy error ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (isMobileDevice) {
		window.location.href = `mailto:${emailAddress}`;
	} else {
		alert('Email скопирован');
	}
});


class Message {
	constructor(options) {
		this.options = options;
	}

	render() {
		const { text, type, el } = this.options;
		const mess = document.getElementById('msg_' + el.name);

		if (type === 'hide') {
			messageHide();
			return;
		}

		const messType = messageTypes[type];

		el.setAttribute('data-message', `true`);
		el.style.borderColor = messType.color;
		mess.style.display = 'block';
		mess.textContent = text;
		mess.style.color = messType.color;

		if (el.dataset.timer) {
			clearTimeout(parseInt(el.dataset.timer, 10));
		}

		const timer = setTimeout(messageHide, 3500);
		el.setAttribute('data-timer', timer);

		function messageHide() {
			el.setAttribute('data-message', `false`);
			mess.style.display = 'none';
			mess.textContent = '';
			el.style.borderColor = '';
			el.removeAttribute('data-timer');
		}
	}
}

function messageCallback(text, type, el) {
	const messageInput = new Message({text: text, type: type, el: el});
	messageInput.render();
}

const messageTypes = {
	info: {
		color: '#001a34'
	},
	warn: {
		color: '#F5BD00'
	},
	error: {
		color: '#f91155'
	}
};


function successMessage(text, el) {
	el.textContent = text;
}