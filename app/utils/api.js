var axios = require('axios');

//anytime we going to interact with external api inside this project, we going to have a bunce of methods in this object in order to do that
module.exports = {
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language +
        '&sort=stars&order=desc&type=Repositories'
    );

    //this going to return us a promise
    return (
      axios
        .get(encodedURI)
        //this going to be invoked when the request to the specific url has been resolved and finished to be passed the response and then we going to return response.data.items
        .then(function(response) {
          return response.data.items;
        })
    );
  }
};
