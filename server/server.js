var express = require('express');
var app = express();

app.use('/', express.static('../client/dist'));

app.listen(12000, function () {
  console.log('Example app listening on port 12000!');
});