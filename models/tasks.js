const mongoose = require("mongoose");

const schema = mongoose.Schema({
    task :{
        type:String,
        required:true
    },
    isCompleted:{
        type: Boolean,
        default:false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    timeLimit : {
        type : Date,
        default : new Date(Date.now()+10*24*60*60*1000)
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Tasks = mongoose.model("Tasks", schema);

module.exports = Tasks;

