const loginform = document.getElementById('login-form');

loginform.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const formData = {
        "email": email,
        "password": password
    }
    console.log(formData)
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(data => data.json())


        if (response.success) {
            window.location.href = "/profile";
        } else {
            window.location.href = "/home/login";
        }
    } catch (error) {
        console.error('Error:', error);
        window.location.href = "/home/login";
    }
})