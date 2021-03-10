const UserController = require("../controllers/user.controller");

// authenticate method must be imported from jwt config to authenticate at the correspinding routes.
const {authenticate} = require("../config/jwt.config")

module.exports = app => {
  //Routes that do not require the authenication method found in jwt.config 
  app.post("/api/register" , UserController.register);
  app.post("/api/login" , UserController.login);
  app.post("/api/logout" , UserController.LogOut);


  //authenticate method is ran prior to hitting api, the loggedInUser method should be used to get all of the user data on login (portfolio wallet, tickers tracked etc) 
  //user object can be stored in state for rendering user specific data and should be recalled when updates are made(user transaction, ticker added to watchlist etc)
  app.get("/api/users/",authenticate, UserController.findAllUsers);
  app.get("/api/users/loggedin", authenticate, UserController.getLoggedInUser);

  //used to get a specific coin, useful to store toatl dollars when user opens transaction page on a specific coin 
  app.get("/api/coinInfo/:userId/:coinName", authenticate, UserController.getCoinFromPortfolio);

  //route to add/remove a coin to user watchlist 
  app.put("api/addToWatch/:userId", authenticate, UserController.addCoinToWatchlist);
  app.put("api/removeFromWatchlist/:userId", authenticate, UserController.removeCoinFromWatchList);

  //Routes for inital purchase and selling all of a coin (removing it from the portfolio)
  app.put("/api/firstBuy/:userId", authenticate, UserController.addCoinToPortfolio);
  app.put("/api/sellAll/:userId/:coinName", authenticate, UserController.closeCoinPosition);

  //Route here is used for subsequent transactions (buying more... selling some(not all!))
  app.put("/api/buysell/:userId/:coinId", authenticate, UserController.updateCoinInPortfolio);

  //this method should be called with the coin controllers to update the user wallet on login as well as subsequent trades. 
  app.put("/api/updateUserWallet/:userId/:walletId", authenticate, UserController.updateUserWallet);

  //left here for dev purposes when using postman
  app.get("/api/users/", UserController.findAllUsers);
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.post("/api/users/new", UserController.createNewUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};