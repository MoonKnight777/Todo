const isAuthenticated = require("../middleware/auth.js");
const { getmyTasks, createTask, updateTask, deleteTask } = require("../controllers/Tasks.js");
const router = require("express").Router();

router.route("/")
.get(isAuthenticated,getmyTasks)
.post(isAuthenticated,createTask)

router.route("/:id")
.put(updateTask)
.delete(deleteTask)


module.exports = router;