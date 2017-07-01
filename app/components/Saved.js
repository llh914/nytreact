// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

var Saved = React.createClass({
  renderSaved: function(article) {
    return (
      <div className ="well" key={article._id}>
        <h3><strong>{article.title}</strong></h3>
        <h5>{article.date}</h5>
        <h5><a href={article.url} target="_blank">{article.url}</a></h5>
        <button type="button" className="btn btn-danger delete" onClick={() => this.deleteArticle(article)}>Delete</button>
    </div>
    );
  },

  renderSavedArticles: function() {
    var articles = this.props.savedArticles;
    return articles.map(this.renderSaved)

  },

  deleteArticle: function(article) {
    helpers.deleteArticle(article).then((res) => {
        this.props.onDelete(article)
    })
  },

  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Saved</h3>
        </div>
        <div className="panel-body">
          {this.renderSavedArticles()}
        </div>
      </div>
    );
  }
});

module.exports = Saved;