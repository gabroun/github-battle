const id = 'your_client_id';
const secret = 'your_secret_id';
const params = `?client_id=${id}&client_secret=${secret}`;

async function getProfile(username) {
  //so the following will make a get request to github api and axios return us a promise
  //and with promises the following will return us an object
  const response = await fetch(
    `https://api.github.com/users/${username}${params}`
  );
  //when making requestion to external api its not going to return us the response immediately so by using axios we telling the app to asynchronousely to call the api and once its been returned then to invoke the function and pass us whatever the information
  return response.json;
}

async function getRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
  return response.json();
}

function getStars(repos) {
  console.log(repos);
  return repos.reduce(
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

async function getUserData(player) {
  //takes in an array of promises, once they are all resolved then it going to return object
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ]);

  return {
    profile,
    score: calculateScore(profile, repos),
  };
}

function sortPlayer(players) {
  return players.sort((a, b) => b.score - a.score);
}

//anytime we going to interact with external api inside this project, we going to have a bunch of methods in this object in order to do that
export async function battle(players) {
  const results = await Promise.all(players.map(getUserData)).catch(
    handleError
  );
  return results === null ? results : sortPlayer(results);
}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  //this going to return us a promise
  const response = await fetch(encodedURI).catch(handleError);
  const repos = await response.json();
  //this going to be invoked when the request to the specific url has been resolved and finished to be passed the response and then we going to return response.data.items
  return repos.items;
}
