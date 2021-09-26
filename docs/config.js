const Config = ((configName) => {
	const c = {};
	c.prefix = () => `${Config.localStorageDomain}.${configName}`;
	c.getBoolOpt = name => window.localStorage.getItem(`${c.prefix()}.${name}`);
	c.getBool = name => window.localStorage.getItem(`${c.prefix()}.${name}`) === 'true';
	c.setBool = (name, value) => window.localStorage.setItem(`${c.prefix()}.${name}`, !!value);
	c.getString = name => window.localStorage.getItem(`${c.prefix()}.${name}`);
	c.setString = (name, value) => window.localStorage.setItem(`${c.prefix()}.${name}`, value==null?null:value.toString());
	c.getIntOpt = name => window.localStorage.getItem(`${c.prefix()}.${name}`);
	c.getInt = name => parseInt(window.localStorage.getItem(`${c.prefix()}.${name}`));
	c.setInt = (name, value) => window.localStorage.setItem(`${c.prefix()}.${name}`, parseInt(value));
	c.keys = () => {
		const keys = [];
		const prefix = c.prefix();
		for (let i = 0; i < window.localStorage.length; ++i) {
			const key = window.localStorage.key(i);
			if (key.startsWith(prefix))
				keys.push(key.substring(prefix.length+1));
		}
		return keys;
	}
	c.clear = () => {
		c.keys().forEach(x => window.localStorage.removeItem(`${c.prefix()}.${x}`));
	}
	Config.all.push(c);
	return c;
});
Config.all = [];
Config.clearAll = () => Config.all.forEach(x => x.clear());
Config.localStorageDomain = window.location.toString();
const configs = Config('config');

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
		Config.clearAll();
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
