var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser')

app.use(bodyParser());





mongo.connect('mongodb://localhost:27017/meow', function(err, db) {
  global.db = db;
});



//-----------------------------------

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/home', function (req, res) {
  res.render('./home.ejs', {name: "Roy Schuyler"});
});

//----------------------------------------------------
app.get('/post', function (req, res) {
  res.render('post.ejs');
});

app.post('/post', function(req, res) {
  var collection = global.db.collection('meow')
  collection.save(req.body)
  res.redirect('/display')
  });

//------------------------------------

//----------------------------------------------------
app.get('/display', function (req, res) {
  var collection = global.db.collection("meow")
  collection.find().toArray(function(err, meows) {
    newMeows = meows.map(function(meow) {
      return {
        _id: meow._id,
        name: meow.name,
      };
    });
    res.render('display.ejs', {meows: newMeows});
  });
});


//--------------------------------------------------
app.get('/nameDisplay/:name', function (req,res) {
    renderName = req.params.name
    console.log(renderName)
    res.render('nameDisplay.ejs', {name: renderName});
   });


app.post('/nameDisplay/:name', function(req, res) {
  // renderName = req.params.name;
  // console.log(req.body);
  console.log(renderName);
  var collection = global.db.collection('meow');
  collection.update({name: renderName}, {$set: req.body}  )
  res.redirect('/display');
  });
























var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
