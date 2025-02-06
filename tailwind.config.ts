/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
	  container: {
		center: true,
		padding: '2rem',
		screens: {
		  '2xl': '1400px'
		}
	  },
	  extend: {
		colors: {
		  'primary-green': '#008577',
		  'pastel-green': '#d6eadf',
		  'light-green': '#b8e0d2',
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  background: '#ffffff', // Changed to white
		  foreground: '#000000', // Changed to black for contrast
		  primary: {
			DEFAULT: '#008577',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: '#d6eadf',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: '#b8e0d2',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		  }
		},
		keyframes: {
		  'slide-in': {
			'0%': {
			  transform: 'translateX(-100%)'
			},
			'100%': {
			  transform: 'translateX(0)'
			}
		  },
		  'fade-in': {
			'0%': {
			  opacity: '0'
			},
			'100%': {
			  opacity: '1'
			}
		  }
		},
		animation: {
		  'slide-in': 'slide-in 0.3s ease-out',
		  'fade-in': 'fade-in 0.5s ease-out'
		}
	  }
	},
  }