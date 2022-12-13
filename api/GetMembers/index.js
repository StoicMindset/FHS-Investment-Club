var members = require('../data/members.json');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
  // loop over each member and ask polygon API for their pick
  try {
    for (const member of members) {
      if (member.pick) {
        console.log(member.pick);
        // get the last two days worth of data for this stock pick
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${member.pick}&interval=5min&apikey=${process.env.API_KEY}`
        );
        const data = await response.json();

        let obj = data['Time Series (5min)'];

        if (obj) {
          member.intraDay = Object.keys(obj).map((k) => obj[k]);
          member.previousClose = member.intraDay[0]['4. close'];
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: members,
  };
};
