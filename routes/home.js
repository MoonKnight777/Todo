const { homepage, registerPage, loginPage } = require("../controllers/home.js");
const router = require("express").Router();

router.get("/",homepage);
router.get("/home/register",registerPage);
router.get("/home/login",loginPage);





module.exports = router;