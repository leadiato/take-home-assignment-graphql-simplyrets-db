const axios = require('axios');
const { SR_PROPERTIES_URI, SR_USR, SR_PWD } = require('./constants');

const headers = {
  "Content-Type": "application/json",
  'Authorization': 'Basic ' + Buffer.from(SR_USR + ":" + SR_PWD).toString('base64')
};

const getListings = async (city) => {
  let queryParams="";
  if (city) {
    queryParams = `?cities=${city}`;
  }
  const response = await axios.get(`${SR_PROPERTIES_URI}${queryParams}`, {
    headers
  });

  if (response.statusText === 'OK') {
    return response.data;
  }
  return [];
};

module.exports = { getListings };