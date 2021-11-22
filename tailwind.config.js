module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: []
}
