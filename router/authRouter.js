const express = require("express")
const  userController = require("../controller/authController")
const router = express.Router();

// router.get("/users", userController.getUserREgister )
router.post("/register", userController.userRegister )
router.post("/login", userController.userLogin )
router.post("/forgetpassword", userController.Forgetpassword )
router.post("/reset-password", userController.resetpassword )



module.exports = router;