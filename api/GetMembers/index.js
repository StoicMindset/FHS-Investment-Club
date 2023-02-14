var memberService = require('../services/memberService');

module.exports = async function (context, req) {
  const members = await memberService.getMembers();

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: members,
  };
};
