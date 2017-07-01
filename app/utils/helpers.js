var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {
//  // Returns a promise object we can .then() off inside our Parent component
//  getClicks: function() {
//    return axios.get("/api");
//  },
//  // Also returns a promise object we can .then() off inside our Parent component
//  // This method takes in an argument for what to post to the database
//  saveClicks: function(clickData) {
//    return axios.post("/api", clickData);
//  }

    searchArticles: function(queryURL) {
        return axios.get(queryURL)

    },

    saveArticle: function(article) {
        return axios.post("/api/saved", article)
    },

    getSaved: function() {
        return axios.get("/api/saved")
    },

    deleteArticle: function(article) {
        return axios.delete("/api/saved/" + article._id)
    }
};