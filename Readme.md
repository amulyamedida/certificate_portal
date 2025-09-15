# LMS Micro-Certification Portal

A mini-certification platform built with **MERN stack** where students can attempt quizzes (MCQs), view instant results, and download certificates. This project is designed as a micro-version of a certification engine, ready to integrate into an LMS.

---

## Features

- User **registration and login** with JWT authentication.
- **Quiz interface** displaying MCQs one by one.
- **Instant results** with pass/fail status after submission.
- **PDF certificate generation** with student name, course title, status, and date.
- All data (users, questions, results) stored in **MongoDB**.
- Fully **deployed and functional** (frontend + backend).

---

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **PDF Generation:** PDFKit  
- **Authentication:** JWT  

---

---

## How to Use this Portal

1. **Open the portal** in your browser:
   - Frontend: `http://localhost:5173` (if running locally via Vite)
   - Backend API: `http://localhost:5000`

2. **Register or Login**:
   - Click **Register** to create a new account with your name, email, and password.
   - Click **Login** if you already have an account.

3. **Start the Quiz**:
   - After login, go to the **Quiz** page.
   - Questions will appear **one by one**.
   - Select an option for each question.
   - Use **Next** and **Previous** buttons to navigate between questions.

4. **Submit the Quiz**:
   - Once you reach the last question, click **Submit Quiz**.
   - Your **score** and **Pass/Fail status** will be displayed instantly.

5. **Download the Certificate**:
   - Click **Download Certificate** on the result page.
   - The certificate will show your name, course title (MERN Fullstack Test), **Pass/Fail**, and **date**.

6. **Re-Attempt Prevention**:
   - If a user tries to take the same quiz again, the app will display:
     > "You have already completed this quiz."
   - A link will allow the user to **download their certificate**.

## Screenshots

### Register Page
![Register Page](screenshots/register.png)

### Login Page
![Login Page](screenshots/login.png)

### Quiz Page
![Quiz Page](screenshots/quiz.png)

### Result Page
![Result Page](screenshots/result.png)

### Certificate PDF
![Certificate](screenshots/certificate.png)

