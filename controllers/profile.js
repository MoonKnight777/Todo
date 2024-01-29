const profilePage = (req,res)=>{
    res.render("profile",{
        username : req.user.username
    })
}


module.exports= {profilePage};