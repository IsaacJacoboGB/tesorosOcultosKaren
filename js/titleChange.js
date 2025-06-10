document.addEventListener('DOMContentLoaded', function () {
	fetch('/header.html')
		.then((response) => response.text())
		.then((data) => {
			document.getElementById('header-placeholder').innerHTML = data;

			const pathname = window.location.pathname;
			const titleElement = document.querySelector('.titleWelcome h2');

			if (titleElement) {
				const cleanedPathname = pathname.replace('.html', '');

				if (cleanedPathname.includes('coatetelco')) {
					titleElement.textContent = 'Las pirámides de la laguna';
				} else if (cleanedPathname.includes('laspilas')) {
					titleElement.textContent = 'Los que adoraban el agua';
				} else if (cleanedPathname.includes('olintepec')) {
					titleElement.textContent = 'Una pirámide en la carretera';
				} else if (cleanedPathname.includes('yautepec')) {
					titleElement.textContent = 'Un palacio en Yautepec';
				} else {
					titleElement.textContent = '¡Bienvenidos a Morelos!';
				}
			}
		});
});
