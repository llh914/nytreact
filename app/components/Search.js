// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
// Here we include all of the sub-components
var Query = require("./Query");
var Results = require("./Results");

var Link = require("react-router").Link;

var Search = React.createClass({

  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Search</h3>
        </div>
        <div className="panel-body">
          <p>
            {/*<Link to="/Child1/GrandChild1"><button className="btn btn-warning btn-sm">Show Grandchild #1</button></Link>
            <Link to="/Child1/GrandChild2"><button className="btn btn-success btn-sm">Show Grandchild #2</button></Link>*/}
          </p>

          {/* This code will allow us to automatically dump the correct GrandChild component {this.props.children}*/ }
          <Query onResults={this.props.onResults}/>
          <Results results={this.props.results}/>

        </div>

      </div>
    );
  }
});

module.exports = Search;