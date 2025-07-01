// utils/mlLocationCheck.js
const axios = require('axios');

async function checkLocationFraud(lat, lng) {
  try {
    const res = await axios.post('http://localhost:8000/check-location', {
      latitude: lat,
      longitude: lng
    });

    return res.data.isFraud;
  } catch (err) {
    console.error("ML fraud check failed:", err.message);
    return false; // fail-safe
  }
}

module.exports = { checkLocationFraud };
