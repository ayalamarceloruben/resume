const axios = require('axios');

const GITHUB_TOKEN = 'your_github_token';
const USERNAME = 'your_username'; 

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`
};

const getGithubUserData = async (endpoint) => {
  try {
    const url = `https://api.github.com${endpoint}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.response ? error.response.data : error.message);
    return [];
  }
};

const getFollowing = async (username) => {
  return await getGithubUserData(`/users/${username}/following`);
};

const getFollowers = async (username) => {
  return await getGithubUserData(`/users/${username}/followers`);
};

const main = async () => {
  const following = await getFollowing(USERNAME);
  const followers = await getFollowers(USERNAME);

  const followingUsernames = new Set(following.map(user => user.login));
  const followerUsernames = new Set(followers.map(user => user.login));

  const notFollowingBack = [...followingUsernames].filter(username => !followerUsernames.has(username));

  if (notFollowingBack.length) {
    console.log("Usuarios que no te siguen de vuelta:");
    notFollowingBack.forEach(user => console.log(user));
  } else {
    console.log("Todos los usuarios a los que sigues te siguen de vuelta.");
  }
};

main();