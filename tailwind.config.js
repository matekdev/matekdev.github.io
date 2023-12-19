/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '0rem',
				md: '2rem',
				lg: '10rem',
				xl: '20rem',
			  },
		},
		colors: {
			white: '#eaeaea',
			gray: '#babdc4',
			jetblack: '#141416',
			blue: '#5292ff',
			darkblue: '#2461c9'
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif']
			}
		}
	},
	plugins: []
};
