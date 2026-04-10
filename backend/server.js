const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("User route working ✅");
});

// Signup route
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    res.status(200).json({
        message: "Signup successful ✅",
        user: { name, email }
    });
});

// Login route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    res.status(200).json({
        message: "Login successful ✅",
        email
    });
});

module.exports = router;