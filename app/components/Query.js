// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

var Query = React.createClass({
  handleSearch: function(event) {
    event.preventDefault();

    this.props.onResults([])

    var authKey = "b6a2131ede8c45bbab94ff59dc813f48"
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
                         authKey + "&q="
    var searchTerm = this.searchTerm.value
    var queryURL = queryURLBase + searchTerm

    helpers.searchArticles(queryURL).then((results) => {
        this.props.onResults(results.data.response.docs);
    })
  },

  clearResults: function() {
    this.props.onResults([])
  },

  render: function() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Query</h3>
        </div>
        <div className="panel-body">
          <form role="form" onSubmit={this.handleSearch}>

            {/*Here we create the text box for capturing the search term*/}
            <div className="form-group">
              <label htmlFor="search">Search Term:</label>
              <input type="text" className="form-control" ref={(input) => this.searchTerm = input}></input>
            </div>

            {/*Here we capture the number of records that the user wants to retrieve
            <div className="form-group">
              <label htmlFor="pwd">Number of Records to Retrieve:</label>
              <select className="form-control" defaultValue="5">
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
            </div>
            */}

            {/*Here we capture the Start Year Parameter*/}
            <div className="form-group">
              <label htmlFor="start-year">Start Year (Optional):</label>
              <input type="text" className="form-control"></input>
            </div>

            {/*Here we capture the End Year Parameter*/}
            <div className="form-group">
              <label htmlFor="end-year">End Year (Optional):</label>
              <input type="text" className="form-control"></input>
            </div>

            {/*Here we have our final submit button*/}
            <button type="submit" className="btn btn-default" ><i className="fa fa-search"></i> Search</button>
            <button type="button" className="btn btn-default" onClick={this.clearResults}><i className="fa fa-trash"></i> Clear Results</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Query;