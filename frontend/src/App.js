import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToDoList from "./TaskList";
import Create from "./create";
import TaskDetails from "./TaskDetails";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<ToDoList />} /> {/* ToDoList page */}
        <Route path="/create/:id?" element={<Create />} />
        <Route path="/tasks/:id" element={<TaskDetails />} /> {/* Task details page */}

      </Routes>
    </Router>
  );
};

export default App;
