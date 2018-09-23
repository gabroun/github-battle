var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    console.log(players);
    api
      .battle([players.playerOneName, players.playerTowName])
      .then(function(results) {
        if (results === null) {
          return this.setState(function() {
            return {
              error:
                'looks like there was an error, check both users exist on github',
              loading: false
            };
          });
        }

        this.setState(function() {
          return {
            winner: results[0],
            loser: results[1],
            error: null,
            loading: false
          };
        });
      });
  }
  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;
    return <div>Results</div>;
  }
}

module.exports = Results;
