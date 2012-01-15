(function() {
  var app, express, fs;

  express = require('express');

  fs = require('fs');

  app = express.createServer();

  app.use("/assets", express.static("./assets"));

  app.get('/', function(req, res) {
    return fs.createReadStream("./index.html").pipe(res);
  });

  app.listen('3000');

}).call(this);
