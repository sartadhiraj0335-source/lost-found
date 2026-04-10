const express = require("express");
const router = express.Router();

// ✅ Signup route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // simple validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // for now direct success response
        res.status(200).json({
            message: "Signup successful ✅"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// ✅ Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        res.status(200).json({
            message: "Login successful ✅"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;