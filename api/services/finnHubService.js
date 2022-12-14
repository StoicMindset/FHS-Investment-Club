var finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const finnHubService = {
  getQuote: async (symbol) => {
    return new Promise((resolve, reject) => {
      finnhubClient.quote(symbol, async (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  },
};

module.exports = finnHubService;
