const cors = require("cors");
const express = require("express");
const path = require("path");
const taskRoutes = require("./tasks"); // Import the task router
//const { router: taskRoutes, getAllTasks } = require("./tasks");


const app = express();
app.use(cors());

const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve task-related routes
app.use("/api/tasks", taskRoutes);

// Default route for testing
app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

