const axios = require('axios').default;
require('dotenv').config();


module.exports.FindACoinData = (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.coinName}`)
    .then(axResp => {
        res.send(axResp.data)
    })
    .catch(err => {
        res.status(400).send({err})
    })
}
module.exports.GetCoinChart = (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.coinName}/market_chart?vs_currency=usd&days=1${req.params.days}`)
    .then(axResp => {
        res.send(axResp.data)
    })
    .catch(err => {
        res.status(400).send({err})
    })
}
module.exports.GetCoinPortfolioPrices = (req, res) => {
    //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cdogecoin%2Clitecoin&vs_currencies=usd example
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${req.params.coinNames}vs_currencies=usd`)
    .then(axResp => {
        res.send(axResp.data)
    })
    .catch(err => {
        res.status(400).send({err})
    })
}

