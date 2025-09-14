# 📸 InstaGram – MERN Stack Social App

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Cloud-iCloud-blue?style=for-the-badge&logo=icloud" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<p align="center">
  <strong>An Instagram-like social media web app with user & food-partner modules, built on the MERN stack.</strong><br/>
  Users can browse reels, like/save/comment, and visit food-partner profiles. Food partners can upload videos and showcase their products.
</p>

---

## 🚀 Features

### 👤 **User Module**
- 🔑 **Register & Login** – Secure user authentication.
- 🎥 **Reel Feed** – Vertical feed with videos, likes, saves, and comments.
- ❤️ **Engagement** – Like, save, and comment on reels.
- 🏪 **Visit Store** – Redirect to food-partner profile page with their products/services.

### 🛍️ **Food Partner Module**
- 🔑 **Partner Registration & Login** – Separate flow for food partners.
- 🖼️ **Profile Page** – Displays all their uploaded videos, descriptions, and items.
- ➕ **Add New Items** – Upload videos/images and update portfolio easily.

---

## 🏗️ Tech Stack

| **Category** | **Technologies Used** |
|--------------|---------------------|
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Storage** | iCloud (for videos/images) |
| **Other** | JWT Authentication, REST API |


## 📂 Project Structure

This project follows an **industry-level folder structure** for scalability and maintainability:

**InstaGram/**
│
├── backend/ # Node.js + Express server
│ ├── controllers/ # API route handlers
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ └── services/ # Business logic & helpers

├── frontend/ # React app
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── context/ # Global state management
│ └── utils/ # Utility functions
│
└── README.md


---

## 🖼️ Screenshots  

wait

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kartikay05/InstaGram.git
---

## Install dependencies

**For backend**
cd backend
npm install

**For Frontend**
cd frontend
npm install
---

---
## Configure environment variables
| Create a .env file inside backend with: |
| MONGO_URI=your_mongo_connection_string |
| JWT_SECRET=your_jwt_secret |
| ICLOUD_CONFIG=your_icloud_config |
| PORT=5000/ |
---

---
## Run the project

Backend:
npm start

Frontend:
npm start

---
