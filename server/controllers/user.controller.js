const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


//Routes below all have to do with log/reg  and authenication. For updating a Users specific portfolio and watch list skip to line 88.

//non authenicated controller

module.exports.register = (req, res) => {
  const user = new User(req.body);
  user
  .save()
  .then(()=> {
    res.json({msg: "success" , user: user});
  })
  .catch(err => res.status(400).send(err));
}

//Controller to log in user

module.exports.login = (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user === null) {
        res.status(400).json({msg : "Invalid login attempt"})
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              res. 
              cookie(
                'usertoken',
                jwt.sign({_id: user._id}, process.env.JWT_SECRET),
                {
                  httpOnly: true
                }
              )
              .json({msg: "success!"});
            } else {
              res.status(400).json({msg: "Invalid login attempt"})
            }
          })
          .catch( err => 
            res.status(400).json({msg : "Invalid login attempt"})
          );
      }
    })
    .catch(err => res.json(err));
}
//controller to get the currently logged in user, this should be used and recalled for rendering the info stored in the user object on logins and updates. 
// see user model to see data that user object holds.
module.exports.getLoggedInUser = (req, res) => {
  const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true });
  User.findById(decodedJWT.payload._id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports.LogOut = (req, res) => {
  res
  .cookie("usertoken", jwt.sign({_id:""}, process.env.JWT_SECRET), {
    httpOnly: true,
    maxAge: 0
  })
  .json({msg: "ok"});
}

module.exports.LogOut2 = (req, res) => {
  res.clearCookie("usertoken");
  res.json({ msg: "ok"})
}
//controller to add/remove a coin to the watchlist 
module.exports.addCoinToWatchlist= (req, res) => {
  let userId =  req.params.userId
  User.findOneAndUpdate({_id: userId}, {$addToSet: {coinsTracked: req.body}}, {new: true, useFindAndModify:false, runValidators:true})
    .then(newCoinWatched => {
      res.send(newCoinWatched.coinsTracked)
      }
    )
    .catch( err => {
      console.log(err)
      res.status(401).json(err)
    })
};
module.exports.removeCoinFromWatchList = (req, res) => {
  let userId = req.params.userId
  User.findOneAndUpdate({_id: userId},{$pull: {coinsTracked: {_id: req.body.coinId}}}, {new:true, useFindAndModify:false})
  .then(newUser => {
    res.send(newUser.coinsTracked)
    }
  )
  .catch( err => {
    console.log(err)
    res.status(401).send({err})
  })
};

/// This controller would be used for the inital purchase of a coin. The coin portfolio is an array of objects of individual coins 
//containing info such as avg cost, dollars spent, total coin...
// to make subsequent transations with the same coin (ex. buy or sell more bitcoin after the inital purchase) use the updateCoinInPortfolio method in conjuction
//with the update UserWalletMethod which will actually change the balance in coins/dollars.

module.exports.addCoinToPortfolio= (req, res) => {
  let userId =  req.params.userId
  User.findOneAndUpdate({_id: userId}, {$addToSet: {coinsPortfolio: req.body}}, {new: true, useFindAndModify:false, runValidators:true})
    .then(newUser => {
      res.send(newUser)
      }
    )
    .catch( err => {
      console.log(err)
      res.status(401).json(err)
    })
};
//This method is to close your position in a coin (i.e sell ALL of the coin) it will remove the coin from the coin portfolio array and return a dollar value which can
// be used with the update wallet method to deposit those dollars back into the user acct.
module.exports.closeCoinPosition = (req, res) => {
  let userId = req.params.userId
  User.findOneAndUpdate({_id: userId},{$pull: {coinsPortfolio: req.params.coinName}}, {new:true, useFindAndModify:false})
  .then(newWatchList => {
    res.send({newWatchList})
    }
  )
  .catch( err => {
    console.log(err)
    res.status(401).json(err)
  })
};
//get specific coin info that is in your porfolio (avg cost, number of coins, dollars)
module.exports.getCoinFromPortfolio = (req, res) => {
	User.findOne({ _id: req.params.userId })
  .then(user => res.send(user.coinsPortfolio.id(req.params.coinName)))
  .catch(err => res.status(400).send(err))
}
//Used for updating the coin in portfolio 
//(buying and selling but not closing the total position i.e selling everything which would completely remove from the portfolio)
module.exports.updateCoinInPortfolio= (req, res) => {
  let userId =  req.params.userId
  User.findOneAndUpdate({_id: userId, 'coinsPortfolio.ticker': req.params.coinTicker }, 
    {
      $set: {
        'coinsPortfolio.$.avgCost': req.body.avgCost,
        'coinsPortfolio.$.userDollarsSpent' : req.body.userDollarsSpent,
        'coinsPortfolio.$.numberOfCoins' : req.body.numberOfCoins
      }
    }, {new: true, useFindAndModify:false, runValidators:true})
      .then(newUser => {
        res.send(newUser)
        }
      )
      .catch( err => {
        console.log(err)
        res.status(401).json(err)
      })
};
// this method should be run after each purchase in order to update the users wallet, also ran on intial login to get up to date balance....
//reflecting current coin prices
module.exports.updateUserWallet = (req, res) => {
  let userId = req.params.userId
  User.findOneAndUpdate({_id: userId, 'wallet._id': req.params.walletId }, 
  {
    $set: {
      'wallet.$.coinBalance': req.body.coinBalance,
      'wallet.$.dollarBalance': req.body.dollarBalance
    }
  }, {new:true, useFindAndModify:false})
    .then(newUser => {res.send(newUser)})
    .catch(err => res.send(err))
}


//these methods are left for development purposes
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(oneSingleUser => res.json({ user: oneSingleUser }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
