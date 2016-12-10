var express = require('express');
var app = express();

app.use(function(req, res, next){
  var d = new Date();
  console.log('Request Received at: ' + d.toString());
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    status: res.status,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

