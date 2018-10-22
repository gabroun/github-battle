import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview({ avatar, username, children }) {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={avatar} alt={`avatar for ${username}`} />
        <h2 className="username">@{username}</h2>
      </div>
      {children}
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

module.exports = PlayerPreview;
