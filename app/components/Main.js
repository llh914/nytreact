// Include React
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Here we include all of the sub-components
var Search = require("./Search");
var Saved = require("./Saved");

// Create the Parent Component
var Main = React.createClass({

  // Here we set the initial results and saved articles to empty arrays
  getInitialState: function() {
    return {
      results: [],
      saved: []
    };
  },

  onResults: function(results) {
    this.setState({ results: results });
  },

  onDelete: function(deleted) {
    var saved = this.state.saved;
    var index = saved.indexOf(deleted);
    if (index !== -1) {
        saved.splice(index, 1);
        this.setState({ saved });
    }
  },

  //  On load display the saved articles
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

     helpers.getSaved().then((response) => {
        this.setState({saved: response.data})
     })
  },
  // Whenever our component updates, the code inside componentDidUpdate is run
  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");
//
//    // We will check if the click count has changed...
//    if (prevState.clicks !== this.state.clicks) {
//
//      // If it does, then update the clickcount in MongoDB
//      helpers.saveClicks({ clickID: this.state.clickID, clicks: this.state.clicks })
//        .then(function() {
//          console.log("Posted to MongoDB");
//        });
//    }
  },
  // Whenever the button is clicked we'll use setState to add to the clickCounter
  // Note the syntax for setting the state
//  handleClick: function() {
//    this.setState({ clicks: this.state.clicks + 1 });
//  },

  // Whenever the button is clicked we'll use setState to reset the clickCounter
  // This will reset the clicks -- and it will be passed ALL children
//  resetClick: function() {
//    this.setState({ clicks: 0 });
//  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
          <div className="jumbotron text-center">
            <h2>New York Times Search</h2>
            <hr />
            <p>
              <em>Search for New York Times Articles and save them.</em>
            </p>
            <p>
              {/*
                Here we create a button click.
                Note how we have an onClick event associate with our handleClick function.
              */}
              {/*<button
                className="btn btn-primary btn-lg"
                type="button"
                {onClick={this.handleClick}}
              >
                CLICK ME!!!!
              </button>
              */}

              {/* Here we create a button click for resetting the clickCounter */}
             {/* <button
                className="btn btn-danger btn-lg"
                type="button"
                onClick={this.resetClick}
              >
                Reset
              </button>
              */}
            </p>
          </div>
          <Search
            results={this.state.results}
            onResults={this.onResults}
          />
          <Saved
            savedArticles={this.state.saved}
            onDelete={this.onDelete}
          />
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
