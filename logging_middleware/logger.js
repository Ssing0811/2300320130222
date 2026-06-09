 let authToken = null;

function setAuthToken(token) {
  authToken = token;
}

async function Log(stack, level, packageName, message) {
  console.log(`[${stack}] ${level} [${packageName}]: ${message}`);
  if (authToken) {
    try {
      const axios = require('axios');
      const response = await axios.post(
        'http://4.224.186.213/evaluation-service/logs',
        { stack, level, package: packageName, message },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data;
    } catch(e) { console.error(e.message); }
  }
  return { logID: 'local-simulated' };
}

module.exports = { Log, setAuthToken };