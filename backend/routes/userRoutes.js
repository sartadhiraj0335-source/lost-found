const express = require("express");
const router = express.Router();

// ✅ test route
router.get("/", (req, res) => {
    res.send("User route working ✅");
});

// ✅ signup
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    res.status(200).json({
        message: "Signup successful ✅",
        user: { name, email }
    });
});

// ✅ login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    res.status(200).json({
        message: "Login successful ✅",
        email
    });
});

module.exports = router;