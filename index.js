const gutil = require('gulp-util')
const through = require('through2')
const PLUGIN_NAME = 'gulp_plugin'

module.exports = function (input, options = {}) {
  // Init

  // Create a stream channel to let every file through
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
      return
    }

    // let file goto next plugin
    this.push(file)

    cb()
  }, function (cb) {
    const indexFile = new gutil.File({
      path: __dirname,
      contents: new Buffer('1994') // eslint-disable-line
    })

    this.push(indexFile)
    cb()
  })
}
