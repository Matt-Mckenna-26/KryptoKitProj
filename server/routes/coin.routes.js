const CoinController = require("../controllers/coin.controller");


//routes to get raw data about a specific coin 
module.exports = app => {
    app.get("/api/coin/:coinName", CoinController.FindACoinData);
};

module.exports = app => {
    app.get('api/coinChart/:coinName/:days', CoinController.GetCoinChart)
}

module.exports = app => {
    app.get('api/coinPricesInPortfolio/:coinNames', CoinController.GetCoinPortfolioPrices)
}

module.exports = app => {
    app.get(`api/coinDetailedData/:coinName`, CoinController.GetCoinDetailedData)
}