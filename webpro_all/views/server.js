const express= require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Create a database named "mydb":
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


// use when starting application as docker container
//let mongoUrlDocker = "mongodb://admin:password@mongodb";
app.get('/',(req,res) => {
  res.sendFile('home.html',{ root: __dirname});
})
app.get('/login',(req,res) => {
  res.sendFile('loginpage.html',{ root: __dirname});
}) 
// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "my-db";

app.post('/login', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });
  // Send response
  res.send(userObj);
});

app.get('/login', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
app.listen(8080);



