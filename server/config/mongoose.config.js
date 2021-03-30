const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/kryptoKit", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Did not connect. error Code", err ));
