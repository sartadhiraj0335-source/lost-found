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


app.use(cors());
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

// user routes
app.use("/api/users", userRoutes);

// test route
app.get("/direct", (req, res) => {
    res.send("GET working");
});

// ================= ITEMS ROUTES =================

// ✅ GET all items
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST item with image
app.post("/api/items", upload.single("image"), async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

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

// ✅ DELETE item
app.delete("/api/items/:id", async (req, res) => {
    console.log("🔥 DELETE ROUTE HIT");   // VERY IMPORTANT
    console.log("ID:", req.params.id);

    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Deleted ✅" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
// ================= DATABASE =================
mongoose.connect("mongodb://127.0.0.1:27017/lostfound")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ================= SERVER =================
app.listen(5000, () => {
    console.log("Server running on port 5000");
});