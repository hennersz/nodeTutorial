var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded());

app.use(function(req, res, next){
  var d = new Date();
  console.log('Request Received at: ' + d.toString());
  next();
});

app.get('/', function (req, res) {
  res.render('index', {title: 'A cool Title', message: 'This is a message from space'});
});


app.get('/numbers/:number', function(req, res){
  res.send(Math.floor(Math.random() * req.params.number).toString());
});


app.get('/displayUser/:user', function(req,res, next){
  request({
    url:'https://api.github.com/users/' + req.params.user,
    headers: {
      'User-Agent':'hennersz'
    }
  }, function(err, response, body){
    if(!err && response.statusCode === 200){
      obj = JSON.parse(body);
      res.render('displayUser', obj);
    } else {
      next(err);
    }
  })
});

app.get('/form', function(req, res){
  res.render('form');
})

app.post('/form', function(req, res){
  console.log(req.body)
  res.render('form');
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

