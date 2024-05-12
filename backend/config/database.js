const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {console.log('DB connected successfully')})
    .catch((error) => {
        console.error("DB connection issues", error);
        process.exit(1);
    })
}