# PSQUARE_ASSIGNMENT
---------------------------------
for frontend
----------------
Features:
--------
Features

1. Authentication and Authorization

User Login with JWT Tokens: Sessions are valid for only 2 hours.

2. Candidate Management

CRUD operations for candidate profiles.

Download candidate resumes as PDFs.

Move selected candidates to the employee list with intact details.

Optimized search and filter options for candidates.

3. Employee Management

Manage employee details (add, delete) and assign roles.

Search and filter employees based on attributes like name, department, or role.

4. Attendance Management

Manage employees' attendance, tasks, and their status.

Search and filter attendance records by employee name, department, or role.

5. Leaves Management

Create and update leave statuses.

Display only approved leaves in the leave calendar..
update leaves with pending rejection done.
Search and filter leave requests by attributes like name.

--------
step1:
------
make folder Psquare
  then make react app using command:
  npx create-react-app frontend
  ----------------------
  step 2:
  folder Structure:
  frontend/
|-- public/
|-- src/
    |-- components/
    |   |-- Authentication/
    |   |-- Candidate/
    |   |-- Employee/
    |   |-- Attendance/
    |   |-- Leave/
        |--Login/
        |--Registration/
        |--Sidebar/
        |--Navbar/
    |-- pages/
         |--Attendences.js
        |--Candidates.js
        |--Leaves.js
        |--ProtectedRoutes.js
    |
    |-- App.js
    |-- index.js

step 3:
---------
tech Used:rectjs Bootstrap and Css
step 4:
---------
run command:
npm run start
--------------------------------------
Backend :
---------------------
Folder structure:
-------------------
Backend/
|-- db,js
|-- controllers/
|-- middlewares/
|-- models/
|-- routes/
|-- utils/
|-- server.js
-------------------------
step 1:
------
craete backend:
-------
command:npm init
-----------
above folder srtucture mention
---------------------
step2:
-------
connect database mongodb with node.
----------
step3:
----
command for run:npm start

-------------------------------------------
Live Link:https://psquare-assignment-b54c.vercel.app/
login credential:email:admin@gmail.com
                  password:12345
                  u can login with credentials or also register yourself.

                  ------------------------------
                  thanks
