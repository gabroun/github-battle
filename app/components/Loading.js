import React from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  };
  static defaultProps = {
    text: 'loading',
    speed: 300,
  };

  state = {
    text: this.props.text,
  };
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
export default Loading;
