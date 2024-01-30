const profilePage = (req,res)=>{
    res.render("profile",{
        username : req.user.username,
        email : req.user.email
    })
}


module.exports= {profilePage};