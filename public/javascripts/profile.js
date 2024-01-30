const container = document.querySelector(".container");
const logoutbtn = document.querySelector("#logout-btn");
const createTaskForm = document.getElementById('createTask-form');

//fetch Requests
const getTasks = async () => {
    try {
        const tasks = await fetch("/tasks").then(data => data.json());
        return tasks.payload;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}
const createTask = async (task) => {
    try {
        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task })
        }).then(data => data.json());
        return response;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}
const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => data.json());

        return response;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}
const updateTask = async (taskId) => {
    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => data.json());

        return response;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

//functions
const logout = async () => {
    const logoutdata = await fetch("/logout").then(data => data.json());
    if (logoutdata.success) {
        window.location.href = "/"
    }
    else {
        window.location.href = "/profile"
    }
}
const getMyTask = async (container) => {
    const tasks = await getTasks();
    console.log(tasks);
    tasks.forEach(task => {
        const taskContainer = document.createElement("div");
        container.appendChild(taskContainer);
        taskContainer.setAttribute("class", "taskContainer")
        taskContainer.dataset.taskId = task._id;
        const taskelement = document.createElement("li");
        const updatebox = document.createElement("input");
        const deletebtn = document.createElement("button");
        taskelement.innerHTML = `${task.task}`;
        deletebtn.innerHTML = '<i class="fa fa-trash-o" style="font-size:24px"></i>';
        updatebox.setAttribute("type", "checkbox")
        taskContainer.appendChild(taskelement);
        taskContainer.appendChild(updatebox);
        taskContainer.appendChild(deletebtn);
        if (task.isCompleted) {
            updatebox.checked = true;
        } else {
            updatebox.checked = false;
        }
    });
}
const createMyTask = async (e) => {
    e.preventDefault();
    const task = document.querySelector("#task").value;
    const formData = { task }
    console.log(formData)
    const response = await createTask(task);
    const creationmsg = document.createElement("h3")
    if (response.success) {
        creationmsg.innerHTML = "Task Created"
    }
    else {
        creationmsg.innerHTML = "Task Creation failed"
    }
    document.body.appendChild(creationmsg);
    setInterval(() => {
        location.reload();
    }, 3000)
}
const updateMyTask = async (e) => {
    e.preventDefault();
    const updatebox = e.target;
    const taskId = updatebox.parentElement.dataset.taskId;
    const response = await updateTask(taskId);
    if (response.success) {
        updatebox.checked = !(updatebox.checked);
    }
    else {
        console.log(response);
    }
}
const deleteMyTask = async (e) => {
    e.preventDefault();
    const deletebtn = e.target;
    const taskId = deletebtn.parentElement.dataset.taskId;
    const response = await deleteTask(taskId);
    if (response.success) {
        location.reload();
    }
    else {
        console.log(response);
    }
}


//Main Actions
logoutbtn.addEventListener('click', logout);

window.onload = getMyTask(container);

createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createMyTask(e);
});

container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'delete') {
        deleteMyTask(e);
    }
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        updateMyTask(e);
    }
});