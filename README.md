# StudyFlow

Study Task & Assignment Planner. Create and organize study tasks by subject and priority, filter the list, mark work complete, and delete tasks.

## Prerequisites

- Node.js 20 or newer and npm.
- MongoDB Atlas or a local MongoDB Community Server.

## Configure environment

In PowerShell, create local environment files from the examples:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

Set `MONGODB_URI` in `server/.env` to your MongoDB Atlas connection string. Mongoose explicitly selects the `study_planner` database, so no database path needs to be added to the URI. `PORT` defaults to `5000`. The optional `CLIENT_ORIGIN` sets the allowed browser origin; it defaults to Vite's usual local ports 5173 and 5174. Set `VITE_API_URL` in `client/.env` to the API base URL, including `/api`. Never commit `.env` files or expose database credentials.

## Install and run

From the project root:

```powershell
npm install
npm run dev
```

The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000`. Press `Ctrl+C` to stop both. To run the services separately, use `npm run dev --workspace server` and `npm run dev --workspace client` in separate terminals. The backend production entry point is `server/src/server.js`, started with `npm start` from `server` or `npm start --workspace server` from the project root.

## API

- `GET /api/health` checks server availability.
- `GET /api/tasks` lists tasks. Optional filters: `priority=High`, `subject=DBMS`, and `completed=true|false`; filters can be combined.
- `POST /api/tasks` creates a task from `{ "title", "subject", "priority" }`.
- `PUT /api/tasks/:id/complete` marks a task complete.
- `DELETE /api/tasks/:id` deletes a task.

Subjects are DBMS, DSA, Mathematics, AI/ML, Web Development, and Other. Priorities are Low, Medium, and High.

## Verify

```powershell
npm run build
npm run start --workspace server
Invoke-RestMethod http://localhost:5000/api/health
Invoke-RestMethod http://localhost:5000/api/tasks
```

With MongoDB configured, create a task in the browser, filter it, mark it complete, and delete it. The task list should be empty afterward.

## Render deployment

Create two services. For the backend, select the `server` root directory, use `npm install` as the build command and `npm start` as the start command, then set `MONGODB_URI`, `PORT` (Render provides this), and `CLIENT_ORIGIN` to the deployed frontend origin. For the frontend, select the `client` root directory, use `npm install && npm run build`, publish `dist`, and set `VITE_API_URL` to the backend URL ending in `/api`. The frontend API address is supplied at build time; do not use localhost for the deployed value. React Router is not used, so no SPA rewrite is needed.

## Project map

- `client/src/components/` contains the React UI; API requests live in `client/src/services/`.
- `server/src/models/`, `controllers/`, and `routes/` contain the Mongoose model and REST API.
- `server/src/config/`, `app.js`, and `server.js` configure MongoDB and Express.
- `ARCHITECTURE.md` documents the data model and request flow.