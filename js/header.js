// Función para asegurar que el DOM esté listo
function domReady(fn) {
	if (
		document.readyState === 'complete' ||
		document.readyState === 'interactive'
	) {
		setTimeout(fn, 1);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

// Cargar dinámicamente el header
function loadHeader() {
	fetch('/header.html')
		.then((res) => res.text())
		.then((data) => {
			document.getElementById('header-placeholder').innerHTML = data;
			// Pequeño delay para asegurar que el HTML se renderice
			setTimeout(() => {
				initHeaderMenu();
			}, 100);
		})
		.catch((err) => console.error('Error al cargar el header:', err));
}

// Esta es la función que debes definir para manejar el menú hamburguesa
function initHeaderMenu() {
	const hamburgerBtn = document.querySelector('.hamburger-btn');
	const navbar = document.querySelector('.navbar');
	const body = document.body;

	if (!hamburgerBtn || !navbar) {
		console.error('No se encontraron elementos del header');
		console.log('Elementos encontrados:', {
			hamburgerBtn: !!hamburgerBtn,
			navbar: !!navbar,
		});
		return;
	}

	console.log('Inicializando menú hamburguesa...');

	// Crear overlay si no existe
	let overlay = document.querySelector('.menu-overlay');
	if (!overlay) {
		overlay = document.createElement('div');
		overlay.classList.add('menu-overlay');
		overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        `;
		document.body.appendChild(overlay);
	}

	function toggleMenu() {
		const isActive = navbar.classList.contains('active');
		hamburgerBtn.classList.toggle('active');
		navbar.classList.toggle('active');

		if (!isActive) {
			overlay.style.display = 'block';
			body.style.overflow = 'hidden';
			console.log('Menú abierto');
		} else {
			overlay.style.display = 'none';
			body.style.overflow = 'auto';
			console.log('Menú cerrado');
		}
	}

	function closeMenu() {
		if (navbar.classList.contains('active')) {
			hamburgerBtn.classList.remove('active');
			navbar.classList.remove('active');
			overlay.style.display = 'none';
			body.style.overflow = 'auto';
		}
	}

	// Remover event listeners anteriores para evitar duplicados
	hamburgerBtn.removeEventListener('click', toggleMenu);

	hamburgerBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleMenu();
	});

	overlay.addEventListener('click', closeMenu);

	document.querySelectorAll('.navbar a').forEach((link) => {
		link.addEventListener('click', () => {
			if (window.innerWidth <= 768) {
				closeMenu();
			}
		});
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768 && navbar.classList.contains('active')) {
			closeMenu();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && navbar.classList.contains('active')) {
			closeMenu();
		}
	});

	console.log('Menú hamburguesa inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
domReady(loadHeader);
