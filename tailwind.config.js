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
				xl: '20rem'
			}
		},
		colors: {
			white: '#eaeaea',
			gray: '#babdc4',
			jetblack: '#141416',
			jetlight: '#1c1c1f',
			jetgray: '#404045',
			blue: '#5292ff',
			darkblue: '#2461c9',
			orange: '#f08d30',
			darkorange: '#c97220',
			yellow: '#eeba30'
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif']
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%'
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
