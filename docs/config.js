const configs = {};
configs.getBoolOpt = name => window.localStorage.getItem(`config.${name}`);
configs.getBool = name => window.localStorage.getItem(`config.${name}`) === 'true';
configs.setBool = (name, value) => window.localStorage.setItem(`config.${name}`, !!value);
configs.getString = name => window.localStorage.getItem(`config.${name}`);
configs.setString = (name, value) => window.localStorage.setItem(`config.${name}`, value==null?null:value.toString());
configs.getIntOpt = name => window.localStorage.getItem(`config.${name}`);
configs.getInt = name => parseInt(window.localStorage.getItem(`config.${name}`));
configs.setInt = (name, value) => window.localStorage.setItem(`config.${name}`, parseInt(value));

configs.updaters = {
	darkMode: () => {
		const theme = configs.getBool('darkMode')?'theme-dark':'theme-light';
		Array.from(document.documentElement.classList.values())
			.filter(x => x.startsWith('theme-'))
			.forEach(x => document.documentElement.classList.remove(x));
		document.documentElement.classList.add(theme);
	},
	startOnLoad: () => {
	},
	clearLocalStorage: () => {
		if (!window.confirm('Never look back.'))
			return;
		const peaceOfMind = configs.getBool('peaceOfMind');
		window.localStorage.clear();
		if (peaceOfMind)
			window.location.reload();
	}
};

document.querySelectorAll('.tab[data-title=config] .td.value input[type=checkbox]').forEach(config => {
	if (configs.getBoolOpt(config.name) === null) {
		configs.setBool(config.name, config.checked);
	}
	const value = configs.getBool(config.name);
	config.checked = value;
	const updater = configs.updaters[config.name];
	updater && updater();
});
document.querySelectorAll('.tab[data-title=config] .td.value input[type=checkbox]').forEach(config => {
	config.addEventListener('change', function() {
		configs.setBool(config.name, !!config.checked);
		const updater = configs.updaters[config.name];
		updater && updater();
	});
});

document.querySelectorAll('.tab[data-title=config] .td.value input[type=text]').forEach(config => {
	if (configs.getString(config.name) === null) {
		configs.setString(config.name, config.value);
	}
	const value = configs.getString(config.name);
	config.value = value;
	const updater = configs.updaters[config.name];
	updater && updater();
});
document.querySelectorAll('.tab[data-title=config] .td.value input[type=text]').forEach(config => {
	config.addEventListener('change', function() {
		configs.setString(config.name, config.value);
		const updater = configs.updaters[config.name];
		updater && updater();
	});
});

document.querySelectorAll('.tab[data-title=config] .td.value input[type=number]').forEach(config => {
	if (configs.getIntOpt(config.name) === null) {
		configs.setInt(config.name, config.value);
	}
	const value = configs.getInt(config.name);
	config.value = value;
	const updater = configs.updaters[config.name];
	updater && updater();
});
document.querySelectorAll('.tab[data-title=config] .td.value input[type=number]').forEach(config => {
	config.addEventListener('change', function() {
		configs.setInt(config.name, config.value);
		const updater = configs.updaters[config.name];
		updater && updater();
	});
});
document.querySelectorAll('.tab[data-title=config] .td.value button').forEach(config => {
	config.addEventListener('click', function() {
		const updater = configs.updaters[config.name];
		updater && updater();
	});
});
