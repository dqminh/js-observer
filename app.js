(function() {
  var app, colors, express, fs;

  express = require('express');

  colors = require('colors');

  fs = require('fs');

  app = express.createServer();

  app.use("/assets", express.static("./assets"));

  app.get('/', function(req, res) {
    return fs.createReadStream("./index.html").pipe(res);
  });

  app.get('/log_event', function(req, res) {
    var log_item, logs, _i, _len;
    logs = JSON.parse(req.query.log);
    for (_i = 0, _len = logs.length; _i < _len; _i++) {
      log_item = logs[_i];
      console.log(log_item);
    }
    return res.send(200);
  });

  app.listen('3000');

}).call(this);
