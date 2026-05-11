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
* **AI Video Mock Interviews:** Conduct high-fidelity virtual interviews with a realistic AI interviewer featuring professional Indian-accented voice synthesis and real-time transcription.
* **AI Resume Optimization:** Get instant, intelligent feedback and suggestions to tailor your resume for specific job descriptions, significantly boosting your chances.
* **Dual-Engine AI Brain:** Seamless failover logic between Google Gemini and Groq (Llama 3) to ensure 100% uptime and high-performance inference.
* **Automated Reminders:** Never miss a follow-up, interview, or deadline with smart, customizable notifications.
* **Centralized Tracking:** Manage all job applications in one intuitive dashboard with status visualizations.
---

## Live Demo 🌐 
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
* **Axios & Form-Data:** For handling complex AI API requests and audio stream buffering.
* **Multer:** Handling secure file and audio uploads.

**AI Integration:**
* **AI Video Mock Interview Room:** Conducts interactive technical interviews using **Sarvam AI (Bulbul:v3)** for realistic Indian voice synthesis and **Saaras:v1** for high-accuracy speech-to-text transcription.
* **Multi-Model Intelligence:** Leverages **Google Gemini 2.0 Flash** as the primary brain for resume parsing and question generation, with an automated failover to **Groq (Llama 3.3 70B)** to ensure zero downtime.
* **Intelligent Resume Optimization:** Uses advanced NLP to identify skill gaps and provide actionable feedback to tailor resumes for specific job descriptions.
* **Automated Skill Matching:** Compares candidate profiles against job requirements to assess role compatibility instantly.

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
    MONGO_URI=mongodb://localhost:27017/trackmind_db
    JWT_SECRET=your_strong_secret_key
    GOOGLE_API_KEY=your_gemini_key
    GROQ_API_KEY=your_groq_key
    SARVAM_API_KEY=your_sarvam_key
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
