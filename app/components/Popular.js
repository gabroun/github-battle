var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages-tab">
      {languages.map(function(lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: 'red' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  //lifecyle event
  //compoentnDidMount going to be invoked by react when the component shown to the view (mount to the screen)
  //inside this component is gonig to be where you make your ajax requests
  componentDidMount() {
    api.fetchPopularRepos(this.state.selectedLanguage).then(function(repos) {
      console.log(repos);
    });
  }
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

module.exports = Popular;
