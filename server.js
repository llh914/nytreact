// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article schema
var Article = require("./models/Article.js");

// Create a new express app
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration
//mongoose.connect("mongodb://localhost/nytreact");
mongoose.connect("mongodb://heroku_rp4f5scx:96k5ld7i9i2uqbqasrh73bob41@ds145292.mlab.com:45292/heroku_rp4f5scx");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
//ROUTES

// Query MongoDB for all saved articles
 app.get("/api/saved", function(req, res) {
     Article.find({}).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
     });
 });

// Save an article to the database
 app.post("/api/saved", function(req, res) {
    // Save an empty result object
      var article = {};

    // Add the title, date, and url of every article, and save them as properties of the article object
      article.title = req.body.headline.main;
      article.date = req.body.pub_date;
      article.url = req.body.web_url

//    Save article to database if it doesn't already exist. If it does, then update the saved article in the database with the new time stamp
    Article.update({
        title: req.body.headline.main
    }, article, { upsert: true, setDefaultOnInsert: true }, function(err) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        else {
          Article.findOne({title: req.body.headline.main}, function(err, doc) {
          console.log(doc)
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
               res.send(doc);
            }
          })
        }
    });
 });

// Delete a saved article from the database
 app.delete("/api/saved/:id", function(req, res) {
    Article.findOneAndRemove({"_id": req.params.id}, function(err, doc) {
        console.log("deleted")
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
            res.send(doc);
        }
    })

 });

// Load single React HTML page.
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});