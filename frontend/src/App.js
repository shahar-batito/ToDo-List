import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "./TaskList";
import Create from "./create";
import TaskDetails from "./TaskDetails";

/**
 * Main App Component
 * This component sets up the routing for the application.
 *
 * Routes:
 * - `/`: Displays the ToDoList component, which shows all tasks.
 * - `/create/:id?`: Displays the Create component for adding a new task or editing an existing one (optional `id` parameter).
 * - `/tasks/:id`: Displays the TaskDetails component for viewing details of a specific task.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/create/:id?" element={<Create />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
