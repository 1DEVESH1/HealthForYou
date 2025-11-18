# 🏥 HealthForYou - Preventive Care Portal

> **Hackathon Submission** | **Team Size:** 4 | **Stack:** MERN

**HealthForYou** is a secure, comprehensive healthcare platform designed to empower patients with preventive care tools while giving healthcare providers real-time insights into patient compliance.

---
## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **DevOps** | GitHub Actions (CI/CD), Environment Variables |

---

## 🚀 Key Features

### 1. 🔐 Secure Authentication
- **Role-Based Access Control (RBAC):** Distinct portals for **Patients** and **Doctors**.
- **JWT Security:** Encrypted session management.
- **Privacy First:** Password hashing and secure data flow.

### 2. 🩺 Patient Dashboard
- **Wellness Tracking:** Real-time visualization of Steps, Sleep, and Active Time.

### 3. 👨‍⚕️ Provider View
- **Patient Monitoring:** List view of assigned patients.
- **Appointment Booking:** Provider can Book a appointment 

### 4. 👤 Profile & Compliance
- **Medical Profile:** Management of allergies, medications, and personal details.
- **Data Privacy:** Built with basic HIPAA compliance considerations (encryption, access logs).

---
## 👥 Team Roles & Responsibilities

### 🧑‍💻 Yash Kumar: Authentication & Identity Lead
**Focus:** Securely signing users in and managing profile data.

* **Backend (`/server`)**
    * `routes/auth.js` & `controllers/authController.js`: Implement Login, Register, and Password Hashing (bcrypt).
    * `middleware/auth.js`: Create middleware to verify JWT tokens.
* **Frontend (`/client`)**
    * `src/pages/Login.jsx` & `src/pages/Register.jsx`: Create Login/Register forms.
    * `src/context/AuthContext.js`: Manage global user state and handle JWT token storage in `localStorage`.

---

### 🩺 Devesh : Patient Wellness Features
**Focus:** Core functionality for patients to track their health metrics.

* **Backend (`/server`)**
    * `models/Log.js`: Mongoose Schema for Water, Steps, and Sleep.
    * `routes/patient.js`: Create endpoints to `POST /log/water` and `GET /dashboard-stats`.
* **Frontend (`/client`)**
    * `src/pages/PatientDashboard.jsx`: Build the main dashboard UI.
    * `src/components/WellnessCard.jsx`: Create reusable UI cards for Water and Steps.

---

### 👨‍⚕️ Sunny : Provider Portal Features
**Focus:** The doctor/provider view for managing and monitoring patients.

* **Backend (`/server`)**
    * `routes/provider.js`:
        * Create endpoint `GET /patients` (Fetch all users with `role='patient'`).
        * Implement logic to calculate "Compliance" (Red/Green flags) based on patient logs.
* **Frontend (`/client`)**
    * `src/pages/ProviderDashboard.jsx`: Main layout for the provider view.
    * `src/components/PatientTable.jsx`: A specific table component listing patients and displaying their compliance status.

---

### 🛡️ Abhishek: Foundation
**Focus:** The "glue" holding the app together, shared components, and deployment.

* **Backend (`/server`)**
    * `server.js` & `config/db.js`: Set up MongoDB connection, CORS configuration, and Helmet security headers.
    * **Deployment:** Configuration files (creating `Procfile` or `vercel.json`).
* **Frontend (`/client`)**
    * `src/components/Navbar.jsx` & `src/App.js`: Create the main layout, responsive navigation bar, and app routing.
    * `src/index.css`: Set up the Tailwind design system (colors, fonts, and utilities).

## 🗄️ MongoDB Database Structure

We utilized an **Embedded Document Pattern** to maximize performance and reduce database lookups. All user-related data resides in a single collection `users`.

-**Collection: `users`**
  - Common For both
    - User id
    - User Email
    - User Password
    - User Role (Patient, Provider)
  - Patient Specific Detail
    - Steps
    - Active Time 
    - Sleep 
  - DoctorID
