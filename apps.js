"use strict";

async function getApps() {
	try {
		const response = await fetch('server/output.php');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Request error:', error);
		return [];
	}
}

// async function displayApps() {
// 	const apps = await getApps();

// 	console.log(apps)

// 	const appsCont = document.getElementById('appsCont');
// 	appsCont.textContent = '';

// 	apps.forEach(app => {
// 		const readyAppComp = createAppComp(app);
// 		appsCont.appendChild(readyAppComp);
// 	});
// }

// function createAppComp(appData) {
// 	const appComp = document.createElement('li');
// 	appComp.classList.add('app');
// 	addElementsToComp(appComp, appData);
// 	return appComp;
// }

// function addElementsToComp(comp, compData) {
// 	const el1 = createAppInfo(compData);
// 	const el2 = createDeleteBtn();

// 	comp.appendChild(el1);
// 	comp.appendChild(el2);
// }

// function createAppInfo(obj) {
// 	const appInfo = document.createElement('ul');
// 	appInfo.classList.add('app__info');

// 	Object.keys(obj).forEach(key => {
// 		if (key !== 'id') {
// 			const infoField = document.createElement('li');
// 			infoField.classList.add('app__info__field');
// 			infoField.textContent = obj[key];
// 			appInfo.appendChild(infoField);
// 		}
// 	});
// 	return appInfo;
// }

// function createDeleteBtn() {
// 	const deleteBtn = document.createElement('div');
// 	deleteBtn.textContent = 'скуф';
// 	return deleteBtn;
// }

// displayApps();

class AppInfo {
	constructor(obj) {
		this.data = obj;
	}

	render() {
		const appInfo = document.createElement('ul');
		appInfo.classList.add('app__info');
		Object.keys(this.data).forEach(key => {
			if (key !== 'id') {
				const infoField = document.createElement('li');
				infoField.classList.add('app__info__field');
				infoField.textContent = this.data[key];
				appInfo.appendChild(infoField);
			}
		});
		return appInfo;
	}
}

class AppManage {
	constructor() {
		this.comps = [
			{func: 'delete', type: 'button'}
		];
	}

	render() {
		const appManage = document.createElement('div');
		appManage.classList.add('app__manage');
		this.comps.forEach(comp => {
			const manageComp = document.createElement(comp.type);
			manageComp.textContent = comp.func;
			manageComp.addEventListener('click', () => {
				this[comp.func]();
			});
			appManage.appendChild(manageComp);
		});
		return appManage;
	}

	delete() {
		console.log('Удалил!')
	}
}

class AppItem {
	constructor(app) {
		this.app = app;
		this.comps = [
			new AppInfo(app),
			new AppManage()
		];
	}

	render() {
		const appItem = document.createElement('li');
		appItem.classList.add('app');
		this.comps.forEach(comp => {
			appItem.appendChild(comp.render());
		});
		return appItem;
	}
}

class AppsList {
	constructor(list) {
		this.list = list;
	}

	render() {
		const appsList = document.createElement('ul');
		appsList.id = appsList;
		this.list.forEach(app => {
			const appItem = new AppItem(app);
			appsList.appendChild(appItem.render());
		});
		return appsList;
	}
}

async function renderAppsList() {
	const appsData = await getApps();
	const appsList = new AppsList(appsData);
	document.querySelector('.content').appendChild(appsList.render());
}

renderAppsList();
