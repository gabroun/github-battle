var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            {/* so what switch do instead of running all of the route that are active switch will only render one specific route  */}
            <Route exact path="/" component={Home} />
            {/* the reason we add exact here is if you add anything after string key like /battle/anything the UI will be active which we dont want that to happen so we add the exact property */}
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

//because we are requiring app in the index.js file we need to export our app component so that file will be usable
// this is called common js
module.exports = App;
