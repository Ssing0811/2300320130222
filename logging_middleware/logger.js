const axios = require('axios');

const LOGS_API = 'http://4.224.186.213/evaluation-service/logs';
let authToken = null;

function setAuthToken(token) {
  authToken = token;
}

async function Log(stack, level, packageName, message) {
  const validStacks = ['backend', 'frontend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = [
    'api', 'component', 'hook', 'page', 'state', 'style',
    'auth', 'config', 'middleware', 'utils'
  ];

  if (!validStacks.includes(stack)) throw new Error('Invalid stack');
  if (!validLevels.includes(level)) throw new Error('Invalid level');
  if (!validPackages.includes(packageName)) throw new Error('Invalid package');
  if (!message || message.trim() === '') throw new Error('Message required');
  if (!authToken) throw new Error('Auth token missing');

  try {
    const response = await axios.post(
      LOGS_API,
      { stack, level, package: packageName, message },
      { headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' } }
    );
    console.log('Log sent:', response.data);
    return response.data;
  } catch (err) {
    console.error('Log failed:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { Log, setAuthToken };