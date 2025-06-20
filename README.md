# Splinde Fullstack Coding Challenge

This is a fullstack prototype for the Splinde coding challenge. It includes a Node.js backend serving static demo data and a React + TypeScript frontend that recursively renders and updates nested sections and entries.

## Features

✅ Backend serves demo data via REST API  
✅ Frontend renders nested sections with computed sums  
✅ Edit `sum` (onBlur) and `note` without save button  
✅ Collapse/expand sections  
✅ Add/remove entries and sections  
✅ Docker + Docker Compose support

---

## Tech Stack

- Node.js (Express)
- React + TypeScript + Vite
- Docker & Docker Compose

---

## Running Locally (No Docker)

### 1. Start Backend
```bash
cd server
npm install
npm start
# Runs on http://localhost:4000/api/demo
```

### 2. Start Frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Running with Docker

```bash
docker-compose up --build
```

- Backend: http://localhost:4000/api/demo  
- Frontend: http://localhost:5173

---

## Project Structure

```
splinde-task/
├── client/         # Frontend (React + Vite + TS)
│   ├── components/ # Recursive renderer
│   ├── utils/      # Type defs and helpers
│   └── ...
├── server/         # Backend (Express)
│   └── data/       # Contains demoData JSON
└── docker-compose.yml
```

---

## Notes

- All changes are stored in memory.
- Total and nested computed sums are updated instantly in the frontend.

---

## Done

- [x] Serve static JSON via backend
- [x] Compute and display total sum
- [x] Recursive rendering with live updates
- [x] Styled interface with basic controls
- [x] Full optional features implemented