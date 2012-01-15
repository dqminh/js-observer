express = require 'express'
fs = require 'fs'

app = express.createServer()
app.use "/assets", express.static("./assets")

app.get '/', (req, res) ->
  fs.createReadStream("./index.html")
    .pipe(res)

app.listen '3000'
