/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},
		},
		colors: {
			primary: {
				DEFAULT: '#C81A0F',
				50: '#fff2f1',
				100: '#ffe2e0',
				200: '#ffc9c6',
				300: '#ffa49e',
				400: '#ff6f66',
				500: '#fd4236',
				600: '#eb2417',
				700: '#c81a0f', // default
				800: '#a41910',
				900: '#871c15',
				950: '#4a0905',
			},

			secondary: {
				DEFAULT: '#ffc300',
				50: '#ffffea',
				100: '#fffcc5',
				200: '#fffa85',
				300: '#fff046',
				400: '#ffe21b',
				500: '#ffc300', // default
				600: '#e29700',
				700: '#bb6b02',
				800: '#985308',
				900: '#7c430b',
				950: '#482300',
			},

			grey: {
				50: '#f6f6f6',
				100: '#e7e7e7',
				200: '#d1d1d1',
				300: '#b0b0b0',
				400: '#888888',
				500: '#6d6d6d',
				600: '#5d5d5d',
				700: '#4f4f4f',
				800: '#454545',
				900: '#3d3d3d',
				950: '#171717',
			},

			white: '#ffffff',
			black: '#000000',
		},
	},
	plugins: [],
};
