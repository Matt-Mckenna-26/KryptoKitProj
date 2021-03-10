const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//define all Schemas nested inside a User document including coinTracked, Wallet, Account******
const coinsTrackedSchema = new mongoose.Schema({
	name: {
		type: String,
		maxlength: 20,
		minlength: 2
	},
	ticker : {
		type: String, 
		maxlength: 5,
		minlength:2
	}
})
const coinTransactionSchema = new mongoose.Schema({
	coinId: {
		type: String,
		required: [true, 'must include coin ticker to make a transaction']
	},
	coinName: {
		type: String
	},
	coinLogo : {
		type: String
	},
	avgCost : {
		type: Number, 
		required: [true]
	},
	userDollarsSpent: {
		type:Number,
		required:[true]
	},
	numberOfCoins:{
		type: Number
	} 
}, {timestamps:true})

const walletSchema = new mongoose.Schema({
	dollarBalance: {
		type: Number,
		default: 5000
	},
	coinBalance : {
		type:Number,
		default: 0
	}
},)


// Defines the User Schema containing nested schemas (tasks, meetings etc) to create the Users document
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"]
	},
	email : {
		type: String ,
		required: [true, 'Email address is required']
	},
	password : {
		type: String ,
		required : [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characters"]
	},
	coinsTracked : [
		coinsTrackedSchema
	], 

	coinsPortfolio: [
		coinTransactionSchema
	],

	wallet: [walletSchema]
	},{timestamps: true}
);

//Creates a 'virtual' fiel in the user schema for confirm password and validate that this matches the password field
UserSchema.virtual("confirmPassword")
	.get(() => this._confirmPassword)
	.set(value => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
	if (this.password !== this.confirmPassword) {
		this.invalidate("confirmPassword", "Password must match confirm password!")
	}
	next();
});


//Will use bcrypt to hash the password bfore saving it to the database

UserSchema.pre("save" , function(next) {
	bcrypt
	.hash(this.password, 10)
	.then(hash => {
		this.password = hash;
		next();
	})
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
