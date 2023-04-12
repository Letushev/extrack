/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFFFF',
      'blue': '#0491FF',
      'red': '#FF4900',
      'green': '#009A58',
      'orange': '#E18100',
      'grey': '#7C8BA1',
      'black': '#031019',
      'bright-grey': '#E4EBEF',
      'ghost-white': '#F5F9FC',
      'light-silver': '#D2D8DF',
      'honolulu-blue': '#0366B3',
      'bubbles': '#E6F4FF',
      'mahogany': '#B33300',
      'linen': '#FFEDE6',
      'metal': '#636F81',
      'flash-white': '#F2F3F6',
    },
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
