/**
 * Router for Task Management API
 *
 * This router provides endpoints for managing tasks in the backend.
 * It supports CRUD operations such as creating, reading, updating, and deleting tasks.
 * 
 * Dependencies:
 * - `express`: For creating the router and handling HTTP requests.
 * - `path`: For file path manipulations.
 * - `TaskManager`: Custom class for managing tasks stored in the filesystem.
 */
const express = require("express");
const path = require("path");
const TaskManager = require('./TaskManager');
const router = express.Router();
const taskManager = new TaskManager(path.join(__dirname, "../backend/data"));

/**
 * GET / 
 * Fetch all tasks from the backend.
 *
 * Response:
 * - 200: Returns an array of all tasks.
 * - 500: Returns an error message if tasks cannot be retrieved.
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
 * GET /:id
 * Fetch a specific task by its ID.
 *
 * Params:
 * - id: The ID of the task to retrieve.
 *
 * Response:
 * - 200: Returns the requested task.
 * - 404: Returns an error message if the task is not found.
 * - 500: Returns an error message if there is an issue retrieving the task.
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
 * POST /
 * Add a new task to the backend.
 *
 * Request Body:
 * - A JSON object representing the new task.
 *
 * Response:
 * - 201: Returns the newly created task.
 * - 500: Returns an error message if the task cannot be added.
 */
router.post("/", (req, res) => {
    try {
        const newTask = taskManager.addTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: "Error adding task." });
    }
});

/**
 * PUT /:id
 * Update an existing task by its ID.
 *
 * Params:
 * - id: The ID of the task to update.
 * 
 * Request Body:
 * - A JSON object with the updated task data.
 *
 * Response:
 * - 200: Returns the updated task.
 * - 404: Returns an error message if the task is not found.
 * - 500: Returns an error message if the task cannot be updated.
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
 * DELETE /:id
 * Delete a task by its ID.
 *
 * Params:
 * - id: The ID of the task to delete.
 *
 * Response:
 * - 200: Returns a success message and the remaining tasks.
 * - 500: Returns an error message if the task cannot be deleted.
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

