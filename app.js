var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(function(req, res, next){
  var d = new Date();
  console.log('Request Received at: ' + d.toString());
  next();
});

app.get('/', function (req, res) {
  res.render('index', {title: 'A cool Title', message: 'This is a message from space'});
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

