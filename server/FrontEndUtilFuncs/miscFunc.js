const { default: axios } = require("axios")


//example user object
const loggedInUser = {
    "_id": "6037bfdf8fa3286844cc1623",
    "username": "myacct",
    "email": "myacct",
    "password": "$2b$10$Y6nYCcf.mFnZqWmbmK44leckxutOj7aehCY4OguE03CAZUuVMkcnG",
    "wallet": [
        {
            "dollarBalance": 1000,
            "coinBalance": 0,
            "_id": "6037bfdf8fa3286844cc1624"
        }
    ],
    "coinsTracked": [],
    "coinsPortfolio": [
        {
            "_id": "603a7a622bbcf877686461da",
            "name": "bitcoin",
            "userDollarsSpent": 100,
            "avgCost": 100,
            "numberOfCoins": .05
        },
        {
            "_id": "603a7a622bbcf877686461da",
            "name": "dogecoin",
            "userDollarsSpent": 100,
            "avgCost": 100,
            "numberOfCoins": 2000
        },
        {
            "_id": "603a7a622bbcf877686461da",
            "name": "litecoin",
            "userDollarsSpent": 100,
            "avgCost": 100,
            "numberOfCoins": 3
        }
    ],
    "createdAt": "2021-02-25T15:18:55.078Z",
    "updatedAt": "2021-02-27T16:59:14.910Z",
    "__v": 0
}

// run this function after any buy and sells to update the dollars in the userwallet 
const updateUserWalletDollarsSpent = (loggedInUser) => {
    // /api/updateUserWallet/:userId/:walletId
    axios.put(`/api/updateUserWallet/${loggedInUser._id}/${loggedInUser.wallet._id}`,
    {dollarBalance : dollarsSpent || sellValue}) //dollarsSpent on buys, sellValue on sell alls and sells 
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

//Function to update the user wallet coin value upon logins and subsequent transactions.
const getTotalWalletCoinValue = (loggedInUser) => {
    let totalCoinValue = 0 
    let currentCoinPrices = {} 
    let queryParam = ''
    loggedInUser.coinsPortfolio.map((coin,idx) => {
        queryParam += `${coin.coinName.replace(/\s+/g, '')}%2C`
    }) 
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
                )
                .then(res => {
                    currentCoinPrices = res.data
                        loggedInUser.coinsPortfolio.map((coin, idx) => {
                            let coinValue = coin.numberOfCoins * currentCoinPrices[`${coin.name}`].usd
                            //store totalCoin Value in state to pass in req.body 
                            totalCoinValue += coinValue;
                            //can add line here to setTotalCoinValue(totalCoinValue)
                        })
                        console.log(totalCoinValue)
                        // /api/updateUserWallet/:userId/:walletId
                        axios.put(`http://localhost:8000/api/updateUserWallet/${loggedInUser._id}/${loggedInUser.wallet._id}`,
                        //store totalCoinValue in state to pass in req.body to update user coinBalance 
                            {coinBalance : totalCoinValue})
                            .then(res => console.log(res))
                            .catch(err => console.log(`error updating the user wallets coin value`))
                    })
                .catch(err =>{console.log(`error fetching up to date prices`)
                                console.log(queryParam)
            })
        }


// function for first buy of a coin and update the user portfolio 
        const firstBuyOfACoin = (loggedInUser) => {
            let currentCoinPrice = 0;
            let dollarsSpent = 100; // this would come from the req.body which would be a form field  
            let coinName = 'ethereum' // this would also come from req.body but would just be stored in state as the coin clicked on to buy 
            //get the coins current price before saving to wallet 
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`)
                .then(res => {
                    currentCoinPrice = res.data[coinName].usd
                        axios.put(`/api/firstBuy/${loggedInUser._id}`,
                            {coinName: coinName,
                            avgCost: currentCoinPrice,
                            dollarsSpent: dollarsSpent,
                            numberOfCoins: currentCoinPrice/dollarsSpent} )
                            })
                                .then(res => console.log(res.data))
                                .catch(err => console.log('Error Purchasing Coin'))
                .catch(err => console.log(err))
        }

// use this function to get the user specific portfolio info for a coin this shopuld be ran before any of the 'edit' actions (buy addtl of a coin in portfolio, sell all of a coin in portfolio
// sell some of a coin in portfolio)
        const getCoinInfoOfCoinInPortfolio = (loggedInUser) => {
            ///api/coinInfo/:userId/:coinName
            axios.get(`/api/coinInfo/${loggedInUser._id}/${coinName}`)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
//function to sell all of a specific coin in the user coin portfolio 
        const sellAllOfACoin = (loggedInUser) => {
            let sellValue = 0
            let currentCoinPrice =0 ;
            let coinName ='ethereum' //this would come from req.params, think of it as an edit of a coin already in portfolio
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`)
                .then(res => {
                    currentCoinPrice = res.data[coinName].usd
                    sellValue = currentCoinPrice * //numOfCoins .... from the getCoinInfoOfCoinInPortfolio 
                    axios.put(`/api/sellAll/${loggedInUser._id}/${coinName}`)
                                .then(res => console.log(res.data))
                                .catch(err => console.log('Error Selling all of Coin'))
                })
                .catch(err => console.log(err))
        }

        const buyOrSellSomeCoinInPortfolio = (loggedInUser) => {
            // /api/buysell/:userId/:coinName
            let currentCoinPrice = 0; //used to store a var 
            let coinName = 'ethereum' //this would come from req.params, think of it as an edit of a coin already in portfolio
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`)
                .then(res => {
                    currentCoinPrice = res.data[coinName].usd
                        axios.put(`/api/buysell/${loggedInUser._id}/${coinName}`,
                        {userDollarsSpent: dollarsSpent + thisTransactionDollars,
                        numberOfCoins: currentCoinPrice/(dollarsSpent + thisTransactionDollars),
                        avgCost: numberOfCoins/(dollarsSpent + thisTransactionDollars) })
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                        })
                .catch(err => console.log(err))
            }
