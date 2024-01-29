const { profilePage } = require("../controllers/profile");
const isAuthenticated = require("../middleware/auth");
const router = require("express").Router();

router.get("/",isAuthenticated,profilePage);






module.exports = router;