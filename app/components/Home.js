import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Battle Github: battle your friends ...</h1>

        {/* to make a route transtion inside the app when button is clicked */}
        <Link className="button" to="/battle">
          Battle
        </Link>
      </div>
    );
  }
}

export default Home;
