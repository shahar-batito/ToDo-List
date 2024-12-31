const fs = require("fs");
const path = require("path");

class TaskManager {

    constructor(directoryPath) {
        this.directoryPath = directoryPath;
        // Ensure the directory exists
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        this.freeID = 1;
    }


    /**
     * Reads all the tasks from the database
     * @returns an array of tasks
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
     * Reads a single task from the database
     * @returns the task 
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
     * Writes a single task to the database
     * @param {*} task 
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
     * Adds a new task
     * @param {*} taskData 
     * @returns the newly created task
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
     * Updates an existing task
     * @param {*} taskId 
     * @param {*} updates 
     * @returns the updated task, or null if not found
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
     * Deletes a task by ID
     * @param {*} taskId 
     * @returns true if the task was deleted, false otherwise
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
