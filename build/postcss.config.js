module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      reduceIdents: false,
      discardComments: {
        removeAll: true
      },
      discardUnused: false
    })
  ]
}
