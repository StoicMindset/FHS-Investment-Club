module.exports = async function (context, req) {
  let symbol = req.symbol;
  let today = new Date().toISOString().slice(0, 10);

  // call the Polygon API
  const result = await fetch(
    `https://api.polygon.io/v1/open-close/${symbol}/${today}?adjusted=true&apiKey=${process.API_KEY}`
  );
  const json = await result.json();

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: json,
  };
};
