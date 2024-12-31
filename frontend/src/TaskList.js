import NavigationBar from "./NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "./API";

// Instruction text stored in a variable
const INSTRUCTION_TEXT =
    "To view the full task description, edit the task, or delete it, click on the task title";


/**
 * TaskList Component
 *
 * This component displays a list of tasks in a table format.
 * Users can click on a task to view more details, edit, or delete it.
 */
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    /**
     * Fetches the list of tasks when the component is mounted.
     */
    useEffect(() => {
        fetchTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    /**
     * Handles a click on a table row and navigates to the task details page.
     * @param {string} taskId - The ID of the clicked task.
     */
    const handleRowClick = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };

    return (
        <div className="task-list">
            <NavigationBar />
            <p className="instruction-text">{INSTRUCTION_TEXT}</p>
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