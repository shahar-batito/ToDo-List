import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { deleteTask, fetchTaskById } from "./API";
import { useNavigate } from "react-router-dom";

/**
 * TaskDetails Component
 * 
 * This component is used to display detailed information about a specific task
 * and provides options to delete or edit the task.
 */
const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetch the task details when the component mounts or when the task ID changes.
   */
  useEffect(() => {
    fetchTaskById(id)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => console.error("Failed to fetch task details:", error));

  }, [id]);

  /**
   * Handles the deletion of a task and redirects the user to the home page.
   * @param {string} taskId - The ID of the task to delete.
   */
  const handleDelete = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div>
      <NavigationBar />
      {/* Buttons for task actions */}
      <div className="buttons">
        <button onClick={() => handleDelete(id)}>Delete Task</button>
        <button onClick={() => navigate(`/create/${task.task_id}`)}>Edit Task</button>
      </div>
      {/* Display task details */}
      <div className="task-details">
        {task && ( /* Render the task details if task data is available */
          <article>
            <h1>{task.title}</h1>
            <h2>Description</h2>
            <p>{task.description}</p>
            <h2>Priority</h2>
            <p>{task.priority_id}</p>
            <h2>Status</h2>
            <p>{task.status_id}</p>
            <h2>Creation Date</h2>
            <p>{task.create_date}</p>
            <h2>Last Updated</h2>
            <p>{task.update_date}</p>
            <h2>Due Date</h2>
            <p>{task.due_date}</p>
            <h2>Assigned User By ID</h2>
            <p>{task.assigned_user_id}</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;