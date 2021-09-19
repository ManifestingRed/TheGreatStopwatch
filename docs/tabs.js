const tabBar = document.querySelector('.tabBar');
document.querySelectorAll('.tabs > .tab').forEach(tab => {
	const title = tab.getAttribute('data-title')
	const barItem = document.createElement('div');
	barItem.className = 'tabBarItem';
	barItem.textContent = title;
	barItem.addEventListener('click', function() {
		const active = document.querySelector('.tabs > .tab.active');
		if (active) active.className = 'tab';
		tab.className = 'tab active';
	});

	tabBar.appendChild(barItem);
});
