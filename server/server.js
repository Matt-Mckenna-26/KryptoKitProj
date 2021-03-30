const express = require("express");
const app = express();
const path = require('path');
const mongoose =require("mongoose");
const cors =require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const connection = 'database connection here'


app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin:true}))
app.use(cookieParser());

// This is where we import the users routes function from our user.routes.js file
const AllMyUserRoutes = require("./routes/user.routes");
const AllMyCoinRoutes = require("./routes/coin.routes")
AllMyUserRoutes(app);
AllMyCoinRoutes(app);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("../client/build"));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

// This will fire our mongoose.connect statement to initialize our database connection
mongoose.connect(process.env.MONGODB_URI || connection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`Established a connection to the  database`))
	.catch(err => console.log("Something went wrong when connecting to the database", err));

const port = 8000 || process.env.PORT


app.listen(port, () => console.log("The server is all fired up on " + port + ""));
