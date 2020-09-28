
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const startCountDown = async (countDown = 5) => {
		const contentElement = document.getElementById('index');

		if (countDown <= 0) {
			contentElement.innerHTML = 'Restarting...';

			await sos.management.power.systemReboot();
		} else {
			contentElement.innerHTML = `Restarts in ${countDown}`;

			setTimeout(() => {
				startCountDown(countDown - 1)
			}, 1000);
		}
	};

	const contentElement = document.getElementById('index');
	const restartButton = document.getElementById('restart-btn');

	if (await sos.management.supports('APP_RESTART')) {
		startCountDown();

		restartButton.onclick = async () => {
			contentElement.innerHTML = 'Restarting...';
			await sos.management.power.systemReboot();
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
