const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const tasksRoute = require("./routes/tasks.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.js");


dotenv.config({
    path : "./data/config.env"
});

//Using middlewares
app.use(express.urlencoded({ 
    extended : false,
}));
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use(userRoute);
app.use("/tasks",tasksRoute);
app.use(errorMiddleware);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

module.exports = app;