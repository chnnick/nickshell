/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      // Semantic tokens backed by the CSS variables in index.css, so the same
      // utilities serve both the light site and the dark terminal.
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        surface: 'var(--surface)',
        overlay: 'var(--overlay)',
      },
      maxWidth: {
        column: '560px',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
