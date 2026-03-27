const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    image: String
});

module.exports = mongoose.model("Item", itemSchema);