const mongoose = require("mongoose");


const connectDB = () => {

    mongoose.connect(`${process.env.MONGO_DB_URL}`)
        .then((c) => {
            console.log(`Database Connected via ${c.connection.host}`);
        }).catch((err) => {
            console.log(`Error connecting database. Error  : ${err}`)
        })

}


module.exports = connectDB;