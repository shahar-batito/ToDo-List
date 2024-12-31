const express = require("express");
const path = require("path");
const TaskManager = require('./TaskManager');

const router = express.Router();
const taskManager = new TaskManager(path.join(__dirname, "../backend/data"));

/**
 * GET ALL request to the backend API
 */
router.get("/", (req, res) => {
    try {
        const tasks = taskManager.readTasks();
        res.json(Array.from(tasks.values()));
    } catch (err) {
        res.status(500).json({ message: "Error retrieving tasks." });
    }
});

/**
 * GET by id request to the backend API
 */
router.get("/:id", (req, res) => {
    try {
        const task = taskManager.readTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving task." });
    }
});

/**
 * POST request to the backend API
 */
router.post("/", (req, res) => {
    try {
        const newTask = taskManager.addTask(req.body);
        res.status(201).json(newTask); // Send the newly created task back to the client
    } catch (err) {
        res.status(500).json({ message: "Error adding task." });
    }
});

/**
 * PUT request to the backend API
 */
router.put("/:id", (req, res) => {
    try {
        const updatedTask = taskManager.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." }); // if task id does not exist
        }
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Error updating task." });
    }
});

/**
 * DELETE request to the backend API
 */
router.delete("/:id", (req, res) => {
    try {
        const remainingTasks = taskManager.deleteTask(req.params.id);
        res.json({ message: "Task deleted successfully.", remainingTasks });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task." });
    }
});



module.exports = router;

