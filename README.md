# Mini Social App

A modern, responsive social media web app inspired by TaskPlanet. Users can **signup/login**, create posts with text and images, **like, comment, and share** posts, and toggle between **light and dark themes**. Fully deployed with a clean UI and real-time post updates.

---

## **Live Demo**

- **Frontend:** [https://mini-social-app-ashy.vercel.app/](https://mini-social-app-ashy.vercel.app/)  
- **Backend API:** [https://mini-social-app-vd1k.onrender.com/](https://mini-social-app-vd1k.onrender.com/)  

---

## **Features**

- **Authentication**
  - Signup / Login with JWT-based authentication
  - Password hashing using bcrypt

- **Posts**
  - Create posts with **text** and **images**
  - Live feed updates every 5 seconds
  - Past posts show username, timestamp, text, and image

- **Social Features**
  - **Like** posts
  - **Comment** on posts
  - **Share** posts (copy link functionality)
  - Real-time UI updates

- **Theme**
  - Toggle between **Light** and **Dark** mode

- **Responsive UI**
  - Optimized for mobile, tablet, and desktop
  - Clean card-based layout inspired by TaskPlanet

---

## **Project Structure**

mini-social-app/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── pages/
│ │ │ └── Social.jsx
│ │ └── App.js
│ ├── package.json
│ └── public/
├── backend/ # Express backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
└── README.md


---

## **Tech Stack**

- **Frontend:** React, Axios, Material-UI
- **Backend:** Node.js, Express, MongoDB Atlas
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Database:** MongoDB Atlas

---

## **Setup Instructions**

### **Backend**

1. Navigate to backend folder:

```bash
cd backend
Install dependencies:

npm install
Create .env file:

PORT=5000
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=SECRET_KEY
Run backend:

node server.js
Backend will run on http://localhost:5000.

Frontend
Navigate to frontend folder:

cd frontend
Install dependencies:

npm install
Create .env file:

REACT_APP_API_URL=http://localhost:5000
Run frontend:

npm start
Frontend will run on http://localhost:3000.





Deployment
Frontend: Deployed on Vercel

Backend: Deployed on Render

Database: MongoDB Atlas