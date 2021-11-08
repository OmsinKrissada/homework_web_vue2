import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				// primary: '#0c0a30',
				primary: '#282292',
				secondary: '#b0bec5',
				accent: '#8c9eff',
				success: '#3dad64',
				// warning: '#ffc936',
				// error: '#b71c1c',
				error: '#f05b5b',
				scroll_track: '#a9b9ff'
			},
			dark: {
				// 	// primary: '#0c0a30',
				// 	primary: '#282292',
				// 	secondary: '#b0bec5',
				accent: '#2a3952',
				// 	// error: '#b71c1c',
				// 	error: '#f05b5b',
				scroll_track: '#007cd6'
			},
		},
		options: {
			customProperties: true
		}
	},
});
