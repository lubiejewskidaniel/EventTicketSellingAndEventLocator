# Full-Stack Event Booking Application

This project is a full-stack web application built with Node.js, Express, SQLite, and React with Vite.
It supports user registration, login with session-based authentication, and ticket booking for various events.
Actually it is an app to look up for events including Map lokalization of them via leaflet package.

All installations have to be done to run ap properly.

---

## Project Structure

├── backend/ → Node.js + Express API
├── frontend/ → React + Vite frontend
├── database/ → SQLite databases (events, sessions)

## How to Run This App

1 - Make sure you have nodeJS installed on your machine
2 - If you are using Windows make sure PowerShell not blocking scripts if so
open PowerShell as an admin and type in command "Set-ExecutionPolicy RemoteSigned" and confirm by Y and enter.
3 - Make sure PM2 is installed globally as I would like to run backend by PM2 and typical local installation packages
located in package.json might be not enough, use command "npm install -g pm2"
4: now you are good to go:
After unzipping the project folder named 10278366 open this folder in VisualStudioCode:

### 1. Start the Backend Server

1. Open a terminal and go to the backend directory:

   cd backend

2. Install dependencies:

   npm install

3. Start the backend server using PM2:

   pm2 start server.mjs --name daniel --watch

### 2. Run the Frontend

1. In a new terminal, go to the frontend directory:

   cd frontend

2. Install dependencies:

   npm install

3. Start the frontend with Vite:

   npm run dev

### 3. Login

Of course you can register new user.
However:

- if you would like to login as a regular user - username: daniel + password: daniel123
- if you would like to login as an admin - username: dan + password: dan123

remeber! Username and Password are case-sensitive

## Features

- User authentication with session cookies
- Event browsing and ticket booking
- Role distinction (admin vs regular user)
- SQLite database for users, events, bookings, and sessions
- Organized backend structure (controllers, routes, DAOs)
- Modern frontend using React + Vite

## Security Notes

- Passwords are hashed using bcrypt
- Session data is stored in a dedicated SQLite database
- CORS and cookie handling are configured in the backend
- parametrized SQL queries

## Author Notes

This project was a great learning experience, especially since it was my first time working with React and session-based authentication. Even though it was quite challenging at times, I really enjoyed building this application and I’m excited to keep learning more.

I’m aware that the frontend is not properly structured or divided according to best practices. Unfortunately, I simply ran out of time to clean it up and organize everything the way I wanted. Not everything in the project is fully complete, and I still don’t fully understand all parts of it, but I’m actively searching for information and doing my best to improve. React is really interesting to me, and I believe with more practice I’ll be able to learn a lot more.

I’m also not completely confident about my report. I didn’t have the chance to present it during class because I had to travel to Poland for my son’s First Holy Communion. Because of that, I had to rely on information from classmates, which was sometimes very mixed or unclear — so in the end, I just decided to do it my own way.

One part I struggled with was adding buttons to the map marker popups to allow users to buy tickets directly. It was too complicated for me at this stage. I tried a few things, but when I added buttons inside the popups, they disappeared from the map, so I decided to skip that feature for now and keep looking for a proper solution.
