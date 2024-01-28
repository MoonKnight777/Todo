const mongoose = require("mongoose");


const connectDB = () => {

    mongoose.connect("mongodb://127.0.0.1:27017/Todo")
        .then((c) => {
            console.log(`Database Connected via ${c.connection.host}`);
        }).catch((err) => {
            console.log(`Error connecting database. Error  : ${err}`)
        })

}


module.exports = connectDB;