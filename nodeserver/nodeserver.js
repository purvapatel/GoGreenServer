var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user:user@ds127436.mlab.com:27436/gogreendatabase',['userlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//get all user details
app.get('/allUserlist', function (req, res) {
  console.log('I received a GET request for all user details');
  db.userlist.find({}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get user details for authentication
app.get('/userlist/:email/:password', function (req, res) {
  console.log('I received a GET request for authentication');
  db.userlist.find({"email":req.params.email, "password":req.params.password}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get user details for user display
app.get('/userlist/:name', function (req, res) {
  console.log('I received a GET request');
  db.userlist.find({"name":req.params.name},{"name" : 1,"email" : 1, "mobile" : 1}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get user list with name and id
app.get('/userlist', function (req, res) {
  console.log('I received a GET request');
  db.userlist.find({},{"name" : 1,"_id" : 1}, function (err, docs) {
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

//delete user details
app.delete('/userlist/:name', function (req, res) {
  console.log(req.body);
  db.userlist.remove({name: req.params.name}, function(err, doc) {
    res.json({"success" : "1"});
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
