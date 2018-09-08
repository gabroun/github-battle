var React = require('react');
var Popular = require('./Popular');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    );
  }
}

//because we are requiring app in the index.js file we need to export our app component so that file will be usable
// this is called common js
module.exports = App;
