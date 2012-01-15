express = require 'express'
colors = require 'colors'
fs = require 'fs'

app = express.createServer()
app.use "/assets", express.static("./assets")

app.get '/', (req, res) ->
  fs.createReadStream("./index.html")
    .pipe(res)

app.get '/log_event', (req, res) ->
  logs = JSON.parse req.query.log
  console.log log_item for log_item in logs
  res.send(200)


app.listen '3000'
