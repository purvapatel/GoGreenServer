var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user:user@ds127436.mlab.com:27436/gogreendatabase',['userlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//get user details
app.get('/userlist/:email/:password', function (req, res) {
  console.log('I received a GET request');
  db.userlist.find({"email":req.params.email, "password":req.params.password}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//insert user details
app.post('/userlist', function (req, res) {
  console.log(req.body);
  db.userlist.insert(req.body, function(err, doc) {
    res.json({"success" : "1"});
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
