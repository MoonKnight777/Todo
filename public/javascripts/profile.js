const logoutbtn = document.querySelector("#logout-btn")

logoutbtn.addEventListener('click', async () => {
    const logoutdata = await fetch("/logout").then(data => data.json());

    if (logoutdata.success) {
        window.location.href = "/"
    }
    else {
        window.location.href = "/profile"
    }
})

const getMyTask = async (res, req) => {
    const tasks = await fetch("/tasks").then(data => data.json());
    console.log(tasks);
    for (let i = 0; i < tasks.payload.length; i++) {
        const taskelement = document.createElement("li");
        const deletebtn = document.createElement("button");
        const tasksContainer = document.querySelector(".taskscontainer");
        taskelement.innerHTML = `${tasks.payload[i].task}`;
        deletebtn.innerText = `delete`
        tasksContainer.appendChild(taskelement);
        tasksContainer.appendChild(deletebtn);
        console.log(i)
    }
}

const createTask = document.getElementById('createTask-form');

createTask.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = document.querySelector("#task").value;
    const formData = { task }
    console.log(formData)
    const response = await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(data => data.json())   
    const creationmsg = document.createElement("h3")
    if (response.success) {
        creationmsg.innerHTML = "Task Created"
    }
    else {
        creationmsg.innerHTML = "Task Creation failed"
    }
    document.body.appendChild(creationmsg);   
    setInterval(()=>{
        location.reload();
    },5000)
});


window.onload = getMyTask();


