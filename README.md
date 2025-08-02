# 🎫 EventEase – Simplifying Event Management and Ticketing

EventEase is a full-stack event management platform that empowers users to discover, register for, and manage events with ease. Designed for scalability and usability, it features a robust backend, dynamic frontend UI, and efficient data handling.

## 🚀 Features

### Frontend (React + Vite)
- 🔍 **Event Discovery**: Search and explore local events using filters.
- 🎟️ **Ticket Booking**: View ticket information and register seamlessly.
- 🗺️ **Interactive Map**: Visualize events on a dynamic map interface.
- 📋 **User Registration**: Simple and responsive user onboarding.

### Backend (Node.js + Express)
- 🧩 **Modular API Structure**: Built using MVC pattern for scalability.
- 📂 **Controllers & DAOs**: Decoupled logic for maintainability.
- 🔐 **Session Management**: Secure handling via SQLite session DB.
- 🗃️ **SQLite Integration**: Lightweight and portable relational storage.

## 🧱 Tech Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Frontend    | React, Vite, JavaScript    |
| Backend     | Node.js, Express (ESM)     |
| Database    | SQLite                     |
| Tooling     | ESLint, Vite, npm          |

## 🔧 Folder Structure

## 📁 Project Folder Structure

```bash
eventease/
│
├── backend/                       # Node.js backend (Express + ESM)
│   ├── controllers/               # Handle business logic for routes
│   │   ├── bookingsController.mjs
│   │   ├── eventsController.mjs
│   │   ├── ticketsController.mjs
│   │   └── userController.mjs
│   ├── daos/                      # Data access objects (DB interactions)
│   │   ├── bookingsDao.mjs
│   │   ├── eventsDao.mjs
│   │   ├── ticketsDao.mjs
│   │   └── usersDao.mjs
│   ├── routes/                    # Express route handlers
│   │   ├── bookingsRoute.mjs
│   │   ├── eventsRoute.mjs
│   │   ├── ticketsRoute.mjs
│   │   └── usersRoute.mjs
│   ├── app.mjs                    # App configuration
│   ├── server.mjs                 # Server entry point
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                      # React frontend (Vite)
│   ├── public/
│   │   └── vite.svg               # Public assets
│   ├── src/
│   │   ├── assets/                # Static assets like images
│   │   │   └── react.svg
│   │   ├── components/            # Reusable UI components
│   │   │   ├── EventBox.jsx
│   │   │   ├── EventSearch.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── TicketInfo.jsx
│   │   ├── App.jsx                # Main application logic
│   │   └── main.jsx               # App bootstrap
│   ├── index.html                 # HTML entry point
│   ├── vite.config.js            # Vite config
│   ├── eslint.config.js          # Linting rules
│   ├── package.json
│   └── package-lock.json
│
├── database/                      # SQLite databases
│   ├── eventease.db
│   └── sessions.db
│
└── README.md                      # Project overview (You’re reading it!)
```


## 🧪 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- SQLite (preinstalled or compatible tool)

### Setup

#### Backend
```bash
cd backend
npm install
node server.mjs
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
- SQLite DBs are preconfigured (\`eventease.db\`, \`sessions.db\`)
- Migration or seed scripts can be added for extensibility

## 📈 Why It Stands Out

- Clean modular codebase following best practices
- Scalable design ready for real-world use cases
- Smooth developer experience using modern tools
- Great foundation for showcasing full-stack development proficiency

## 👤 Author

## 📬 Contact

If you're interested in working together or have questions, feel free to reach out:

📧 **LubiejewskiDaniel@gmail.com**  
🌐 [www.codeconsultingstudio.com](https://www.codeconsultingstudio.com)  

---

🔗 *Thank you for reviewing this project. I look forward to discussing how I can bring value to your team!*
