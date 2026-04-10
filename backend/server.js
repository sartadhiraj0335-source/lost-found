console.log("🚀 NEW SERVER FILE RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const Item = require("./models/Item");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
    origin: "*"
}));

app.use(express.json());

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// serve uploaded images
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// ================= ITEMS ROUTES =================

// GET all items
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST item with image
app.post("/api/items", upload.single("image"), async (req, res) => {
    try {
        const { title, description, location } = req.body;

        const item = new Item({
            title,
            description,
            location,
            image: req.file ? req.file.filename : null
        });

        await item.save();

        res.json({ message: "Item added successfully ✅" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE item
app.delete("/api/items/:id", async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Deleted ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= DATABASE + SERVER START =================
console.log("Mongo URI check:", process.env.MONGO_URI ? "Present ✅" : "Missing ❌");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected ✅");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT} 🚀`);
        });
    })
    .catch((err) => {
        console.log("MongoDB Connection Error ❌");
        console.log(err);
    });