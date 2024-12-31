// Connecting the frontend to the backend server

import axios from "axios";

const API_URL = "http://localhost:3001/api/tasks";

/**
 * Fetch all tasks from the API
 * @returns {Promise} A promise that resolves to the list of tasks
 */
export const fetchTasks = () => axios.get(API_URL);

/**
 * Fetch a specific task by its ID from the API
 * @param {string|number} id - The ID of the task to fetch
 * @returns {Promise} A promise that resolves to the task details
 */
export const fetchTaskById = (id) => axios.get(`${API_URL}/${id}`);

/**
 * Add a new task to the API
 * @param {Object} task - The task object to add (e.g., { title: string, description: string })
 * @returns {Promise} A promise that resolves to the created task
 */
export const addTask = (task) => axios.post(API_URL, task);

/**
 * Update an existing task in the API
 * @param {string|number} id - The ID of the task to update
 * @param {Object} updates - The updates to apply to the task (e.g., { title: string, completed: boolean })
 * @returns {Promise} A promise that resolves to the updated task
 */
export const updateTask = (id, updates) => axios.put(`${API_URL}/${id}`, updates);

/**
 * Delete a task from the API
 * @param {string|number} id - The ID of the task to delete
 * @returns {Promise} A promise that resolves when the task is deleted
 */
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
