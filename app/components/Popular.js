var React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    //the way we set state in a component is by calling this.state = whatever the state in our constructor
    this.state = {
      selectedLanguage: 'All'
    };

    //we know that .bind takes in a context and return a new function with this keyword bound to the context we pass in
    // so in the below line, we saying we want this.updateLanguage to be a function whos this keyword is bound to this keyword we pass in RHS
    // so the goal for the below line is having this referring the context of component itself
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    //whatever this function return is the new state of the component
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
  }
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className="languages-tab">
        {languages.map(function(lang) {
          //the reason we add parathesis to return js will add ; automatically to the return which will ignore whats after it
          return (
            //we want the onClick handler to be function that whenever its invoke the new returned function from .bind to pass the specific lang, the reason the first arg is null as we already bound this in updateLanguage, for the second arg will be what param for updateLanguage
            <li
              style={
                lang === this.state.selectedLanguage ? { color: 'red' } : null
              }
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}
            >
              {lang}
            </li>
          );
          //map allow you to pass as the second argument the specific context that you want this function to be invoked in
        }, this)}
      </ul>
    );
  }
}

module.exports = Popular;
