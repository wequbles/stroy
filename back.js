"use strict";

const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	let errorsFound = false;

	inputs.forEach(input => {
		if (!formFieldCheck(input)) {
			errorsFound = true;
		}
	});

	if (errorsFound) {
		return;
	}

	const formData = new FormData(form);

	const formDataObject = {}; // Инспектирование
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	console.log(formDataObject); //

	try {
		const response = await fetch('server/create.php', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Successful response:', data);
			successMessage('Успешно! Заявка отправлена', form);
		} else {
			const errorData = await response.json();
			console.error('Sending error:', errorData);
		}
	} catch (error) {
		console.error('Request error:', error);
	}
});

function formFieldCheck(input) {
	if ((input.name === 'nameReq' || input.name === 'countryCodeReq' || input.name === 'telReq') && input.value === '') {
		messageCallback('Обязательное поле', 'error', input);
		return false;
	}

	else if (input.name === 'nameReq' && (/\d/.test(input.value))) {
		messageCallback('Имя не должно содержать цифр', 'error', input);
		return false;
	}

	else if (input.name === 'telReq' && input.value.length !== 15) {
		messageCallback('Номер телефона должен содержать 10 цифр', 'error', input);
		return false;
	}

	else {
		messageCallback('', 'hide', input);
		return true;
	}
}