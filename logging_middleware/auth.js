const axios = require('axios');
const BASE_URL = 'http://4.224.186.213/evaluation-service';

async function getAccessToken(email, rollNo, accessCode, clientID, clientSecret, name, githubUsername, mobileNo) {
  try {
    await axios.post(`${BASE_URL}/register`, {
      email, name, mobileNo, githubUsername, rollNo, accessCode
    });
    console.log('Registration successful');
  } catch (err) {
    if (err.response?.status !== 409) throw err;
    console.log('Already registered, continuing...');
  }

  const authRes = await axios.post(`${BASE_URL}/auth`, {
    email, name, rollNo, accessCode, clientID, clientSecret
  });
  return authRes.data.access_token;
}

module.exports = { getAccessToken };