const Tasks = require("../models/tasks.js");
const Errorhandler = require("../utils/errorhandler.js");
const respond = require("../utils/jsonresponse.js");

const getmyTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const userTasks = await Tasks.find({ userId });
        if (!userTasks) return next(new Errorhandler("No tasks created yet.",400))
        return respond(res, 200, "Task found successfully",userTasks);
    } catch (error) {
        next(error);
    }
}

const createTask = async (req, res,next) => {
    try {
        const { task } = req.body;
        const userId = req.user._id;
        const taskCheck = await Tasks.findOne({ task });
        if (taskCheck) return next(new Errorhandler("Task Alreay exists, you can modify it", 400));
        const newTask = await new Tasks({ task, userId });
        await newTask.save();
        respond(res, 201, "Task created.");
    } catch (error) {
        next(error);
    }
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    try {
        const tasktoupdate = await Tasks.findById(id);
        if (!tasktoupdate) return next(new Errorhandler("No Tasks found.", 404));
        tasktoupdate.isCompleted = !(tasktoupdate.isCompleted);
        await tasktoupdate.save();
        respond(res, 200, "Task Updated.");
    } catch (error) {
        next(error);
    }
}

const deleteTask = async (req, res,next) => {
    const id = req.params.id;
    try {
        const tasktodelete = await Tasks.findByIdAndDelete(id);
        if (!tasktodelete) return next(new Errorhandler("No Tasks found.", 404));
        respond(res, 200, "Task deleted.");
    } catch (error) {
        next(error);
    }
}


module.exports = { getmyTasks, createTask, updateTask, deleteTask };