var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user:user@ds127436.mlab.com:27436/gogreendatabase',['userlist']);
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

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

//get user details for user display using ID
app.get('/userDetail/:id', function (req, res) {
  console.log('I received a GET request');
  db.userlist.find({"_id" : new ObjectId(req.params.id)},{"name" : 1,"email" : 1, "mobile" : 1}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get user details for user display using name
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
  db.userlist.find({"type" : "User"},{"name" : 1,"_id" : 1}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//insert user details
app.post('/userlist', function (req, res) {
  console.log(req.body);
  db.userlist.insert(req.body, function(err, doc) {
    console.log(doc._id);
    res.json({"success" : "1" ,"id" : doc._id});
  });
});

//insert service details
app.post('/servicelist', function (req, res) {
  console.log(req.body);
  db.servicelist.insert(req.body, function(err, doc) {
    res.json({"success" : "1"});
  });
});

//get service details for user display using id
app.get('/servicedetails/:id', function (req, res) {
  console.log('I received a GET request');
  db.servicelist.find({"_id" : new ObjectId(req.params.id)}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//get service details by supplier_name
app.get('/servicelist/:name', function (req, res) {
  console.log('I received a GET request');
  db.servicelist.find({"supplier_name":req.params.name}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//delete service detail by _id
app.delete('/servicelist/:id', function (req, res) {
  console.log(req.body);
  db.servicelist.remove({"_id" : new ObjectId(req.params.id)}, function(err, doc) {
    res.json({"success" : "1"});
  });
});

//delete user details
app.delete('/userlist/:id', function (req, res) {
  console.log(req.body);
  db.userlist.remove({"_id" : new ObjectId(req.params.id)}, function(err, doc) {
    res.json({"success" : "1"});
  });
});

//update service list by ID
app.put('/servicelist/:id', function (req, res) {
  console.log(req.body);
  db.servicelist.update({"_id" : new ObjectId(req.params.id)}, {"name" : req.body.name , "location": req.body.location, "rate": req.body.rate, "supplier_name": req.body.supplier_name, "supplier_id": req.body.supplier_id }, function(err, doc) {
    res.json({"success" : "1"});
  });
});

//get supplier list for customers
app.get('/supplierlist', function (req, res) {
  console.log('I received a GET request');
  db.userlist.find({"type" : "Supplier"}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//list of all services for customer
app.get('/servicelist', function (req, res) {
  console.log('I received a GET request');
  db.servicelist.find({}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//insert user_service details when user wants to buy any service
app.post('/addUserServiceList', function (req, res) {
  console.log(req.body);
  db.userservicelist.insert(req.body, function(err, doc) {
    res.json({"success" : "1"});
  });
});

// get user specific services (my services)
app.get('/findServiceByUserName/:name', function (req, res) {
  console.log('I received a GET request');
  db.userservicelist.find({"user_name":req.params.name}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
