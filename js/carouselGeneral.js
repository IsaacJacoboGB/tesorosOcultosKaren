document.addEventListener('DOMContentLoaded', function () {
	new Splide('.splide', {
		type: 'loop',
		perPage: 1,
		height: '550px',
		cover: true,
		gap: '20px',
		autoplay: true,
		interval: 3000,
		pauseOnHover: true,
		pauseOnFocus: true,
		arrows: true,
		pagination: true,
		breakpoints: {
			640: {
				perPage: 1,
				height: '350px', // Ajustamos para móviles
			},
		},
	}).mount();
});
