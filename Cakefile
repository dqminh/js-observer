exec = require('child_process').exec

task 'watch', 'auto coffeescript to javascript', (options) ->
  exec 'coffee --watch --join assets/js/app.js --compile assets/coffee'
  exec 'coffee --watch --compile app.coffee'
