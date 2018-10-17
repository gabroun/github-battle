import React from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
    };
  }
  componentDidMount() {
    const { text, speed } = this.props;
    var stopper = text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: text }))
        : this.setState(prevState => ({ text: prevState.text + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    //so the above lifecyle method invoked the function when the component mounted but when its unmount (removed from the view) we call componentwillUnmount and clear the interval
    console.log('clear the interval');
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}
Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
Loading.defaultProps = {
  text: 'loading',
  speed: 300,
};

module.exports = Loading;
