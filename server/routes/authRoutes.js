const express = require("express");
const { 
    registerUser, 
    loginUser, 
    googleLogin,
    googleCallback,
startGoogleAuth, } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);

router.get("/google", startGoogleAuth);

router.post("/google/callback", googleCallback);

module.exports = router;
