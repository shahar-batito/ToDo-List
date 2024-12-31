import NavigationBar from "./NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "./API"; // Import the fetchTasks function



const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tasks from the backend
        fetchTasks()
            .then((response) => setTasks(response.data)) // Set the tasks in state
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    const handleRowClick = (taskId) => {
        navigate(`/tasks/${taskId}`); // Navigate to the task description page
    };

    return (
        <div className="task-list">
            <NavigationBar />
            <p className="instruction-text">
                To view the full task description, edit the task, or delete it, click on the task title
            </p>
            <div className="tablecontent">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.task_id} onClick={() => handleRowClick(task.task_id)}>
                                <td>{task.title}</td>
                                <td>{task.status_id}</td>
                                <td>{new Date(task.due_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default TaskList;