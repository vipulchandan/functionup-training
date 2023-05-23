const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const userAuth = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

router.get("/users/:userId", userAuth.auth, userController.getUserData)

router.put("/users/:userId", userAuth.auth, userController.updateUser)

router.delete('/users/:userId', userAuth.auth, userController.deleteUser)

module.exports = router;