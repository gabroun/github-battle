import axios from 'axios';

const id = 'your_client_id';
const secret = 'your_secret_id';
const params = `?client_id=${id}&client_secret=${secret}`;

function getProfile(username) {
  //so the following will make a get request to github api and axios return us a promise
  //and with promises the following will return us an object
  return (
    axios
      .get(`https://api.github.com/users/${username}${params}`)
      //when making requestion to external api its not going to return us the response immediately so by using axios we telling the app to asynchronousely to call the api and once its been returned then to invoke the function and pass us whatever the information
      .then(({ data }) => data)
  );
}

function getRepos(username) {
  return axios.get(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
}

function getStars(repos) {
  return repos.data.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore({ followers }, repos) {
  var totalStars = getStars(repos);

  return totalStars * 3 + followers;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  //takes in an array of promises, once they are all resolved then it going to call the function
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos),
    })
  );
}

function sortPlayer(players) {
  return players.sort((a, b) => b.score - a.score);
}

//anytime we going to interact with external api inside this project, we going to have a bunce of methods in this object in order to do that
module.exports = {
  battle(players) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayer)
      .catch(handleError);
  },
  fetchPopularRepos(language) {
    var encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    //this going to return us a promise
    return (
      axios
        .get(encodedURI)
        //this going to be invoked when the request to the specific url has been resolved and finished to be passed the response and then we going to return response.data.items
        .then(({ data }) => data.items)
    );
  },
};
