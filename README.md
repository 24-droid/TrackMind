# TrackMind 🚀
**Your AI-Powered Job Application Co-Pilot**


## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [The TrackMind Experience](#the-trackmind-experience)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Status](#project-status)
- [License](#license)
- [Contact](#contact)

---

## Overview ✨
Born from the chaos of my own job search, **TrackMind** is an intuitive, AI-powered platform to manage all your job applications. It's designed to eliminate the stress of scattered spreadsheets, missed follow-ups, and the tedious process of tailoring resumes. TrackMind brings clarity, organization, and intelligent assistance to your job hunt, empowering you to move from overwhelming stress to focused progress.

This project is a testament to the #BuildInPublic ethos – solving real-world problems by building impactful solutions.

## Key Features 🎯
* **Centralized Application Tracking:** Manage all job applications in one intuitive dashboard.
* **AI Resume Optimization:** Get instant, intelligent feedback and suggestions to tailor your resume for specific job descriptions, significantly boosting your chances.
* **Automated Reminders:** Never miss a follow-up, interview, or deadline with smart, customizable notifications.
* **Application Status Management:** Easily update and visualize the progress of each application (Applied, Interviewing, Offer, Rejected, etc.).
* **Secure Authentication:** Robust user authentication ensuring your data is safe.
---

## Live Demo 🌐 <--- NEW SECTION
Experience TrackMind in action right in your browser!
[**Try TrackMind Now!**](https://trackmind.vercel.app) 
---


## The TrackMind Experience 🚶‍♀️
Imagine your job search transformed. With TrackMind, you simply log in to a clean, organized dashboard. Adding a new application takes moments, instantly updating your personalized timeline. Before you send your resume, you can leverage TrackMind's AI to get tailored suggestions, ensuring your application stands out. Automated reminders keep you on top of every deadline and follow-up, freeing your mind to focus on preparation, not perspiration. TrackMind is about empowering you to navigate the job market with confidence and control.

## Tech Stack 🛠️
TrackMind is built using the MERN stack with additional powerful libraries:

**Frontend:**
* **Vite:** Building the dynamic user interface.
* **React Router DOM:** Handling client-side routing.
* **Axios:** For efficient API communication.
* **Tailwind CSS:** Utility-first CSS for rapid, responsive styling.
* **React Toastify:** Providing elegant user notifications.

**Backend:**
* **Node.js & Express.js:** Powering the robust server-side logic and API.
* **MongoDB (with Mongoose):** A flexible NoSQL database for managing application data.
* **jsonwebtoken (JWT) & bcryptjs:** Ensuring secure user authentication and password hashing.
* **cookie-parser & CORS:** For handling HTTP-only cookies and enabling cross-origin requests.

**AI Integration:**
* **Intelligent Resume Analysis & Optimization:** Leverages advanced Natural Language Processing (NLP) to parse your resume and job descriptions. It identifies key skills and requirements, providing actionable feedback to tailor your resume, highlight relevant experience, and increase alignment with target roles.
* **Automated Skill Matching:** Compares your profile's skills against job requirements, helping you quickly assess your fit for new opportunities.
* **Content Generation Assistance (Future):** Planned features include AI assistance for drafting personalized cover letter snippets or follow-up emails based on application context and company details.

---

## Getting Started ⚙️

To run TrackMind on your local machine:

### Prerequisites
* Node.js (LTS) & npm/Yarn
* MongoDB

### Backend Setup
1.  Clone repo: `git clone https://github.com/[Your-GitHub-Username]/TrackMind.git`
2.  `cd TrackMind/Backend`
3.  Install: `npm install`
4.  Create `.env`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/trackmind_db # Or your MongoDB Atlas URI
    JWT_SECRET=your_strong_secret_key # Use a strong, random string
    # GOOGLE_CLIENT_ID=... (if applicable)
    # GOOGLE_CLIENT_SECRET=... (if applicable)
    ```
5.  Start: `npm run dev`

### Frontend Setup
1.  `cd ../Frontend`
2.  Install: `npm install`
3.  Create `.env`:
    ```env
    VITE_BACKEND_API_URL=http://localhost:5000/api
    # VITE_GOOGLE_CLIENT_ID=... (if applicable)
    ```
4.  Start: `npm run dev`

---

## Project Status 🏗️
TrackMind is currently `in active development`. I'm committed to building this project openly and transparently as part of my #BuildInPublic journey!

---

## License 📄
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact 👋
* **GitHub:** [https://github.com/24-droid](https://github.com/24-droid)
* **Email:** [omworks341@gmail.com](mailto:omworks341@gmail.com)

---
