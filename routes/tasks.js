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

        const validTasks = tasks.filter(task => 
            mongoose.Types.ObjectId.isValid(task._id) && task.userId.toString() === req.userId
        );        

        if (validTasks.length === 0) {
            console.warn("⚠️ No valid task updates detected.");
            return res.status(400).json({ message: "No valid task updates detected" });
        }

        // Update order in the database
        const updateOps = validTasks.map((task, index) => ({
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

        const updatedTasks = await Task.find({ userId: req.userId }).sort("order");

        res.json({ message: "Task order updated successfully", tasks: updatedTasks });

    } catch (error) {
        console.error(" Error updating task order:", error);
        res.status(500).json({ message: "Error updating task order", error: error.message });
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const { title, description, dueDate, completed } = req.body;

        let updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (dueDate !== undefined) {
            updateFields.dueDate = dueDate ? new Date(dueDate + "T00:00:00.000Z") : null;
        }
        if (completed !== undefined) updateFields.completed = completed; // ✅ Ensures `false` is updated too

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true, runValidators: true } // ✅ Returns the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        console.log(`✅ Task updated: ${updatedTask._id}, Completed: ${updatedTask.completed}`);

        res.json(updatedTask);

    } catch (error) {
        console.error("❌ Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
});

router.patch("/:id/toggle", authenticateToken, async (req, res) => {
    try {
        console.log(` Received toggle request: ${req.params.id}`);

        const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
        
        if (!task) {
            console.warn(`⚠️ Task ${req.params.id} not found.`);
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = !task.completed;

        await task.save();
        console.log(` Task toggled: ${task._id}, Completed: ${task.completed}`);

        res.json(task);

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
