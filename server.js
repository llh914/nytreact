// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Click schema
var Article = require("./models/Article.js");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

//var PORT = 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
//ROUTES

// * `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
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

// * `/api/saved` (post) - your components will use this to save an article to the database
 app.post("/api/saved", function(req, res) {
    // Save an empty result object
      var article = {};

      // Add the title and summary of every link, and save them as properties of the result object
      article.title = req.body.headline.main;
      article.date = req.body.pub_date;
      article.url = req.body.web_url

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(article);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        // Or log the doc
        else {
          console.log(doc);
          res.send(doc);
        }
      });

 });

// * `/api/saved` (delete) - your components will use this to delete a saved article in the database
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

// * `*` (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes

// Main "/" Route. This will redirect the user to our rendered React application
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
//
//// This is the route we will send GET requests to retrieve our most recent click data.
//// We will call this route the moment our page gets rendered
//app.get("/api", function(req, res) {
//
//  // This GET request will search for the latest clickCount
//  Click.find({}).exec(function(err, doc) {
//
//    if (err) {
//      console.log(err);
//    }
//    else {
//      res.send(doc);
//    }
//  });
//});
//
//// This is the route we will send POST requests to save each click.
//// We will call this route the moment the "click" or "reset" button is pressed.
//app.post("/api", function(req, res) {
//
//  var clickID = req.body.clickID;
//  var clicks = parseInt(req.body.clicks);
//
//  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
//  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
//  // If included, Mongoose will create a new document matching the description if one is not found
//  Click.findOneAndUpdate({
//    clickID: clickID
//  }, {
//    $set: {
//      clicks: clicks
//    }
//  }, { upsert: true }).exec(function(err) {
//
//    if (err) {
//      console.log(err);
//    }
//    else {
//      res.send("Updated Click Count!");
//    }
//  });
//});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});