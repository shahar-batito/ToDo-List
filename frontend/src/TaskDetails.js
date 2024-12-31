import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { deleteTask, fetchTaskById } from "./API"; // Import the API function
import { useNavigate } from "react-router-dom";


const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState(null); // State to store task data
  const [error, setError] = useState(null); // State to store any errors
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task data when the component mounts
    fetchTaskById(id)
      .then((response) => {
        setTask(response.data); // Set the task data
        setIsLoading(false); // Mark loading as false
      })
      .catch((err) => {
        setError("Failed to fetch task details."); // Set error message
        setIsLoading(false); // Mark loading as false
      });
  }, [id]); // Dependency array ensures this runs when `id` changes

  // Handler to delete a task and navigate to the home page
  const handleDelete = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        navigate("/"); // Redirect to the home page
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div>
      <NavigationBar />
      <div className="buttons">
        <button onClick={() => handleDelete(id)}>Delete Task</button>
        <button onClick={() => navigate(`/create/${task.task_id}`)}>Edit Task</button>
      </div>
      <div className="task-details">

        {isLoading && <div>Loading...</div>} {/* Show while loading */}
        {error && <div>{error}</div>} {/* Show error if it exists */}
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
