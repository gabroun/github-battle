var React = require('react');

//navlink to used if you want to dynamically change the style of route if its active
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className="nav">
      <li>
        {/* exact, only apply the active class when the route is exactly the same we specified to */}
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = Nav;
