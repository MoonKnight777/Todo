const { homepage, register, login, logout } = require("../controllers/user");
const isAuthenticated = require("../middleware/auth.js");
const router = require("express").Router();

// router.get("/", isAuthenticated ,homepage);
router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);


module.exports = router;