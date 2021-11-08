
module.exports = {
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'HW Tracker';
				return args;
			});
	},

	// publicPath: "/minecraft/"
	publicPath: '/homework',

	assetsDir: 'assets',

	transpileDependencies: [
		'vuetify'
	],
	pwa: {
		name: 'HW Tracker',
		themeColor: '#0c0a30',
	}
};
