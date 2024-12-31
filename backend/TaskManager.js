const fs = require("fs");
const path = require("path");

/**
 * TaskManager
 * 
 * A class responsible for managing tasks stored in the filesystem. Tasks are stored as JSON files, 
 * with each task represented by a separate file.
 */
class TaskManager {

    /**
     * Constructor for TaskManager
     * @param {string} directoryPath - The path to the directory where task files are stored.
     */
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
        // Ensure the directory exists
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        this.freeID = 1;
    }


    /**
     * Reads all tasks from the storage directory.
     * @returns {Map} A Map of tasks with `task_id` as the key.
     */
    readTasks() {
        try {
            const files = fs.readdirSync(this.directoryPath);
            const tasks = new Map();
            files.forEach((file) => {
                const filePath = path.join(this.directoryPath, file);
                const data = fs.readFileSync(filePath, "utf8"); // Read each file
                const task = JSON.parse(data); // Parse the JSON content
                tasks.set(task.task_id, task); // Add task to the Map with task_id as the key
            });

            return tasks;
        } catch (err) {
            console.error("Error reading tasks:", err);
            return new Map(); // Return an empty Map on error
        }
    }

    /**
     * Reads a single task by its ID.
     * @param {number} taskId - The ID of the task to read.
     * @returns {Object|null} The task object if found, or null if not found or on error.
     */
    readTaskById(taskId) {
        try {
            const filePath = path.join(this.directoryPath, `${taskId}.json`);
            const data = fs.readFileSync(filePath, "utf8"); // Read the file (filename == task id)
            return JSON.parse(data);
        } catch (err) {
            console.error(`Error reading task with ID ${taskId}:`, err); // File not exist or error opening file
            return null;
        }
    }

    /**
     * Writes a task to the storage directory.
     * @param {Object} task - The task object to write.
     */
    writeTask(task) {
        try {
            const filePath = path.join(this.directoryPath, `${task.task_id}.json`);
            fs.writeFileSync(filePath, JSON.stringify(task, null, 2)); // Write the task to its file
        } catch (err) {
            console.error(`Error writing task with ID ${task.task_id}:`, err);
        }
    }


    /**
     * Adds a new task.
     * @param {Object} taskData - Data for the new task.
     * @returns {Object} The newly created task object.
     */
    addTask(taskData) {
        const newTaskId = this.freeID;
        const newTask = {
            ...taskData,
            task_id: newTaskId,
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString(),
        };
        this.writeTask(newTask); // Save the new task as a file
        this.freeID += 1;
        return newTask;
    }

    /**
     * Updates an existing task.
     * @param {number} taskId - The ID of the task to update.
     * @param {Object} updates - Data to update the task with.
     * @returns {Object|null} The updated task object, or null if the task is not found.
     */
    updateTask(taskId, updates) {
        const task = this.readTaskById(taskId);
        if (!task) {
            return null; // Task not found
        }
        const updatedTask = {
            ...updates,
            task_id: taskId,
            create_date: task.create_date,
            update_date: new Date().toISOString(), // Update the timestamp
        };
        this.writeTask(updatedTask); // Save the updated task
        return updatedTask;
    }

    /**
    * Deletes a task by its ID.
    * @param {number} taskId - The ID of the task to delete.
    * @returns {boolean} True if the task was deleted, false otherwise.
    */
    deleteTask(taskId) {
        try {
            const filePath = path.join(this.directoryPath, `${taskId}.json`);
            fs.unlinkSync(filePath); // Delete the task file
            return true;
        } catch (err) {
            console.error(`Error deleting task with ID ${taskId}:`, err);
            return false;
        }
    }
}

module.exports = TaskManager;
