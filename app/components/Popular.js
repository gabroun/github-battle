import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage({ selectedLanguage, onSelect }) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages-tab">
      {languages.map(lang => {
        return (
          <li
            style={lang === selectedLanguage ? { color: 'red' } : null}
            onClick={() => onSelect(lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

function RepoGrid({ repos }) {
  return (
    <ul className="popular-list">
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => {
        return (
          <li key={name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={owner.avatar_url}
                  alt={'Avatar for ' + owner.login}
                />
              </li>
              <li>
                <a href={html_url}>{name}</a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
  };
  //lifecyle event
  //componentDidMount going to be invoked by react when the component shown to the view (mount to the screen)
  //inside this component is gonig to be where you make your ajax requests
  componentDidMount() {
    //invoke the update langauge method and pass it whatever the selected language
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage = async lang => {
    this.setState(() => ({ selectedLanguage: lang }));

    const repos = await fetchPopularRepos(lang);

    //we creating a new function here, so the this keyword is going to be different and thus we need to bind it to make sure the context is consistent
    this.setState(() => ({ repos }));
  };
  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {/* we rendering the component even before the request responded to fix that we can add a condition */}
        {!repos ? (
          <Loading text="Loading" speed={350} />
        ) : (
          <RepoGrid repos={repos} />
        )}
      </div>
    );
  }
}

export default Popular;
