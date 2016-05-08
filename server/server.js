var express = require('express');
var app = express();
var port = 80;

app.use('/', express.static('../client/dist'));
app.use('/menu', express.static('../client/dist'));

app.listen(port, function () {
  console.log('Example app listening on port', port, '!');
});
