const express = require("express");
const authenticateToken = require("../middleware/authenticateToken"); // ✅ Import JWT middleware
const Task = require("../models/Task");

const router = express.Router();

/** 
 * GET all tasks (Protected)
 */
router.get("/", authenticateToken, async (req, res) => {
    try {
        console.log(" Fetching tasks for user:", req.userId);
        const tasks = await Task.find({ userId: req.userId }).sort({ order: 1 });
        console.log(" Tasks sent to frontend:", tasks);
        res.json(tasks);
    } catch (error) {
        console.error(" Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});



/** 
 * POST Create a new task (Protected)
 */
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { title, description, dueDate, priority, category } = req.body;

        console.log("📥 Received new task:", { title, description, dueDate, priority, category });

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const task = new Task({
            userId: req.userId,
            title,
            description,
            dueDate,
            priority,
            category: category || "other",
        });

        await task.save();
        console.log(" Task saved in database:", task);

        res.status(201).json(task);
    } catch (error) {
        console.error(" Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
    }
});

/** 
 * PUT Update a task (Protected)
 */
router.put("/reorder", authenticateToken, async (req, res) => {
    try {
        const { tasks } = req.body;

        if (!Array.isArray(tasks) || tasks.length === 0) {
            console.warn("⚠️ Invalid task reorder request:", req.body);
            return res.status(400).json({ message: "Invalid data format" });
        }

        console.log(" Reordering Tasks:", tasks);

        // Update order in the database
        const updateOps = tasks.map((task, index) => ({
            updateOne: {
                filter: { _id: task._id, userId: req.userId },
                update: { order: index } 
            }
        }));

        if (updateOps.length === 0) {
            console.warn(" No valid updates detected.");
            return res.status(400).json({ message: "No valid task updates detected" });
        }

        const updateResult = await Task.bulkWrite(updateOps);
        console.log(" Task order updated successfully:", updateResult);

        res.json({ message: "Task order updated successfully" });

    } catch (error) {
        console.error(" Error updating task order:", error);
        res.status(500).json({ message: "Error updating task order", error: error.message });
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { title, description, dueDate, completed } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title !== undefined) {
            task.title = title;
        }
        if (description !== undefined) {
            task.description = description;
        }
        if (dueDate !== undefined) {
            task.dueDate = dueDate ? new Date(dueDate + "T00:00:00.000Z") : null;
        }
        if (completed !== undefined) {
            task.completed = completed;
        }

        await task.save();
        console.log(` Task updated: ${task._id}, Due Date: ${task.dueDate}`);

        res.json({
            _id: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            completed: task.completed
        });

    } catch (error) {
        console.error(" Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
});

router.patch("/:id/toggle", authenticateToken, async (req, res) => {
    try {
        const { completed } = req.body;
        console.log(` Received toggle request: ${req.params.id}, New Completed State: ${completed}`);

        const task = await Task.findById(req.params.id);

        if (!task) {
            console.warn(`⚠️ Task ${req.params.id} not found.`);
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = completed;

        await task.save();
        console.log(` Task toggled: ${task._id}, Completed: ${task.completed}`);

        res.json({ 
            _id: task._id, 
            completed: task.completed 
        });

    } catch (error) {
        console.error(" Error toggling task:", error);
        res.status(500).json({ message: "Error toggling task" });
    }
});

/** 
 * DELETE Remove a task (Protected)
 */
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(` Attempting to delete task: ${id} for user: ${req.userId}`);

        const task = await Task.findOne({ _id: id, userId: req.userId });

        if (!task) {
            return res.status(404).json({ error: "Task not found or unauthorized" });
        }

        await Task.findByIdAndDelete(id);

        console.log(` Task deleted: ${id}`);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(" Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
});



module.exports = router;
