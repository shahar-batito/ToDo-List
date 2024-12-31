import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="buttons">
                <button onClick={() => navigate("/tasks")}>View Task List</button>
                <button onClick={() => navigate("/create")}>Create New Task</button>
            </div>
        </div>
    );
};

export default Home;
