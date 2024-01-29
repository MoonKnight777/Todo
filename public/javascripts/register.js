const registerForm =   document.getElementById('register-form');

registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const formData = {
      username,email,password
    }
    console.log(formData)
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then(data => data.json())
      
      if (response.success) {
        window.location.href = "/profile";
      } else {
        window.location.href = "/home/register";
      }
    } catch (error) {
      console.error('Error:', error);
      window.location.href = "/home/register";
    }
  }
 );