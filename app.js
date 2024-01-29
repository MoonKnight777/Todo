const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.js");
const userRoute = require("./routes/user.js");
const tasksRoute = require("./routes/tasks.js");
const homeRoute = require("./routes/home.js");
const profileRoute = require("./routes/profile.js");


dotenv.config({
    path : "./data/config.env"
});

//Using middlewares
app.use(express.urlencoded({ 
    extended : false,
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//Setting Static files
// app.use('/javascripts', express.static(path.join(__dirname, 'public'), { 'Content-Type': 'application/javascript' }));
app.use(express.static(path.join(__dirname,'public')));

//Setting views folder
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")



//Using Routes
app.use(userRoute);
app.use("/tasks",tasksRoute);
app.use(homeRoute);
app.use("/profile",profileRoute);


//Error Handler
app.use(errorMiddleware);

module.exports = app;