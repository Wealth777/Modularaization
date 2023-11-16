const express = require("express")
const router = express.Router()
const {userWelcome, userLogin, userSignup, userDashboard} = require("../Controllers/user.controller")

router.get("/welcome", userWelcome);

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/dashboard", userDashboard);

module.exports = router