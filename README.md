Setup Instructions
1. Clone the Repository to your computer

2. Backend Setup
    Navigate to the backend directory:
        bash
        cd backend
    Install dependencies:
        bash
        npm install
    Start the backend server:
        bash
        node server.js
    The backend server will run at http://localhost:3001.

3. Frontend Setup
    In Bash - Navigate to the frontend directory
    Install dependencies:
        bash
        npm install
    Start the frontend application:
        bash
        npm start
    The frontend application will run at http://localhost:3000.

How to Use
Open a web browser and go to http://localhost:3000.



This project is a simple frontend & backend client for managing tasks. It uses axios for making HTTP requests to a RESTful API hosted at http://localhost:3001/api/tasks. 

Features:

Fetch Tasks: Retrieve a list of all tasks.

Fetch Task by ID: Retrieve detailed information about a specific task using its unique ID.

Add Task: Create a new task by providing a task object.

Update Task: Update an existing task with new data.

Delete Task: Remove a task using its ID.

**for assigned_user_id i used a default value, as there are not active users on the app
