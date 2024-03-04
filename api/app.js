var express = require('express');
var cors = require('cors');

var app = express();
const services = require("./services/FileService")
const util = require('./common/utilities')

app.use(cors())

app.get('/', function (req, res) {
  res.send('Toolbox Challenge!');
});

app.get('/files/data', function(req, resp){
  services.getFileContent(req.query).then(response => {
    resp.statusCode = 200;
    resp.send(response);
  }).catch(err => {
      console.error("Error al realizar el consumo del servicio de detalle de archivos: ", err);
      resp.statusCode = 500;
      resp.send(err);
  });
})

app.get('/files/list', function(req, resp){
  util.consume_service(util.URL_FILES).then(response => {
    resp.send(response);
  }).catch(err => {
    console.error("Error al realizar el consumo del servicio lista de archivos: ", err);
      resp.statusCode = 500;
      resp.send(err);
  });
})

app.listen(3001, function () {
  console.log('Toolbox Challenge app listening on port 3000!');
});