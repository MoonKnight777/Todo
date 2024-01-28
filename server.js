const connectDB = require("./data/database");
const app = require("./app.js");

//Connecting Database
connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});