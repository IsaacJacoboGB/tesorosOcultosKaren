document.addEventListener('DOMContentLoaded', function () {
	const pathSegments = window.location.pathname.split('/');
	const currentPage = pathSegments[pathSegments.length - 1].replace(
		'.html',
		''
	);

	const navLinks = document.querySelectorAll('.navbar ul li a');

	navLinks.forEach((link) => {
		if (link.dataset.page === currentPage) {
			link.classList.add('active');
		}
	});
});
