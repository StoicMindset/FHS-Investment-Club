var memberService = require('../services/memberService');
var finnHubService = require('../services/finnHubService');

module.exports = async function (context, req) {
  // get the list of members from the database
  const members = await memberService.getMembers();

  // if the current time is less than 2 minutes from the lastUpdated time, return the members
  if (Math.floor(new Date().getTime() / 1000) - members[0].lastUpdated < 120) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: members,
    };
  }

  // otherwise, update the member's quote from the API
  else {
    try {
      for (const member of members) {
        if (member.pick) {
          let quoteData = await finnHubService.getQuote(member.pick);
          member.quote = quoteData;
        }
        // update the member's last updated time with a unix timestamp
        member.lastUpdated = Math.floor(new Date().getTime() / 1000);
        await memberService.updateMember(member);
      }
    } catch (e) {
      console.log(e);
    }
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: members,
    };
  }
};
