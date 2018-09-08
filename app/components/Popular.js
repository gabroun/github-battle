var React = require('react');

class Popular extends React.Component {
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className="languages-tab">
        {languages.map(function(lang) {
          //the reason we add parathesis to return js will add ; automatically to the return which will ignore whats after it
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
    );
  }
}

module.exports = Popular;
