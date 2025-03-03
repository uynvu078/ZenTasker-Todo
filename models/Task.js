const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    dueDate: { type: Date, default: null },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "normal", "high"], default: "normal" },
    category: { type: String, enum: ["work", "personal", "other"], default: "work" },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model("Task", TaskSchema);

