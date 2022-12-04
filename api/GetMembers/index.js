var members = require('../data/members.json');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
  // loop over each member and ask polygon API for their pick
  try {
    for (const member of members) {
      if (member.pick) {
        console.log(member.pick);
        // call the Polygon API
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${member.pick}&apikey=${process.env.API_KEY}`
        );
        const data = await response.json();

        member.previousClose = data['Global Quote']['08. previous close'];
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
