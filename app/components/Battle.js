import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: '',
  };

  handleChange = event => {
    const value = event.target.value;

    this.setState(() => ({ username: value }));
  };

  handleSubmit = event => {
    // as we dont want the form to submit to the server without anything
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  };
  render() {
    const { username } = this.state;
    const { label } = this.props;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        {/* we want to bind the value of our state to the input field  */}
        <input
          id="username"
          placeholder="Github username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  };

  handleSubmit = (id, username) => {
    //as we using this keyword in the function we need to bind in the constructor
    //we want this keyword in the function to always refer to our instance in the constructor which is the component
    //setState will return an object
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`,
    }));
  };

  handleReset = id => {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null,
    }));
  };

  render() {
    var { match } = this.props;
    var {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage,
    } = this.state;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}
          {playerOneImage !== null && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button
                className="reset"
                onClick={() => this.handleReset('playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}
          {playerTwoImage !== null && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button
                className="reset"
                onClick={() => this.handleReset('playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button battle"
              to={{
                pathname: match.url + '/results',
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

export default Battle;
