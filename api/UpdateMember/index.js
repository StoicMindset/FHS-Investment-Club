const memberService = require('../services/memberService');

module.exports = async function (context, req) {
  const member = req.body;
  let result = {};

  try {
    result = await memberService.updateMember(member);
  } catch (e) {
    console.log(e);
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: result,
  };
};
