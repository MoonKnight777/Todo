const homepage = (req,res)=>{
    res.render("home");
}

const registerPage = (req,res)=>{
    res.render("register")
}
const loginPage = (req,res)=>{
    res.render("login")
}


module.exports = {homepage, registerPage,loginPage}