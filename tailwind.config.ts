
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
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
					DEFAULT: 'hsl(var(--accent))',
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
				},
                brand: {
                    DEFAULT: '#00A67E',
                    50: '#E6F7F3',
                    100: '#CCEFE7',
                    200: '#99DFD0',
                    300: '#66CEB8',
                    400: '#33BEA1',
                    500: '#00A67E',
                    600: '#008568',
                    700: '#006852',
                    800: '#00473A',
                    900: '#002B23',
                }
			},
			fontFamily: {
				body: ["'Outfit'", 'sans-serif'],
				display: ["'Poppins'", 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'blur-in': {
                    '0%': { backdropFilter: 'blur(0px)', opacity: '0' },
                    '100%': { backdropFilter: 'blur(8px)', opacity: '1' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'slide-down': 'slide-down 0.4s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'blur-in': 'blur-in 0.3s ease-out'
			},
            backgroundImage: {
                'hero-pattern': "linear-gradient(120deg, rgba(0, 166, 126, 0.8), rgba(0, 47, 38, 0.9)), url('/lovable-uploads/0007e781-c396-4c79-a5de-4444beb8c384.png')",
                'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
                'green-gradient': 'linear-gradient(120deg, #00A67E, #008568)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
