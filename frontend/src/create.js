import NavigationBar from "./NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask, fetchTaskById } from "./API";

const Create = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const [name, setTitle] = useState('');
    const [pageTitle, setPageTitle] = useState('Add a New Task');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [userID] = useState('1');
    const [priorityID, setPriority] = useState('1-Low');
    const [statusID, setStatus] = useState('1-Draft');
    const [isEditMode, setIsEditMode] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {
            title: name, description: description, due_date: dueDate,
            assigned_user_id: userID, priority_id: priorityID, status_id: statusID
        };

        if (isEditMode) {
            updateTask(id, task).then(() => navigate('/tasks'));
        } else {
            addTask(task).then(() => navigate('/tasks'));
        }
    }

    useEffect(() => {
        if (id) {
            setIsEditMode(true); // Switch to edit mode if ID is provided
            fetchTaskById(id)
                .then((response) => {
                    const task = response.data;
                    setTitle(task.title);
                    setDescription(task.description);
                    setDueDate(task.due_date);
                    setPriority(task.priority_id);
                    setStatus(task.status_id);
                    setPageTitle('Edit an Existing Task')
                })
                .catch((error) => console.error("Error fetching task details:", error));
        }
    }, [id]);

    return (
        <div className="create">
            <NavigationBar />
            <h2>{pageTitle}</h2>
            <form onSubmit={handleSubmit}>
                <label>Task title:</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Task Description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Priority:</label>
                <select
                    value={priorityID}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="1-Low">1-Low</option>
                    <option value="2-Medium">2-Medium</option>
                    <option value="3-High">3-High</option>
                    <option value="4-Urgent">4-Urgent</option>
                </select>
                <label>Due Date:</label>
                <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <label>Status:</label>
                <select
                    value={statusID}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="1-Draft">1-Draft</option>
                    <option value="2-In Progress">2-In Progress</option>
                    <option value="3-On Hold">3-On Hold</option>
                    <option value="4-Completed">4-Completed</option>
                    <option value="5-Deleted">5-Deleted</option>
                </select>
                <button>Save</button>
            </form>
        </div>
    );
}

export default Create;