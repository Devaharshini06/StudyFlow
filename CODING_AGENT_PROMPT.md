# Initial Coding-Agent Prompt

Copy and paste the prompt below into your coding agent to continue developing this project.

---

You are helping a beginner build a study planner. Work in the existing workspace and explain each step in plain language. Keep the solution small and runnable; do not add features beyond the requirements below.

## Requirements

- Use the MERN stack with JavaScript: MongoDB, Express, React, Node.js, and Mongoose. Use Vite for the React client.
- Keep the backend organized using MVC: Mongoose models in `server/src/models/`, request logic in `server/src/controllers/`, and URL mappings in `server/src/routes/`. Keep database setup, Express app setup, server startup, and error middleware in their existing dedicated folders/files.
- Put every React UI component in its own folder under `client/src/components/`. Each component folder must contain its matching `.jsx` and `.css` files. Keep API requests in `client/src/services/` and shared formatting helpers in `client/src/utils/`.
- A student can create a task with a required title, one of the supported subjects, and priority (`Low`, `Medium`, or `High`).
- Subjects are `DBMS`, `DSA`, `Mathematics`, `AI/ML`, `Web Development`, and `Other`.
- A student can filter tasks by status, subject, and priority; mark a task complete; and delete a task.
- This is a single-user MVP: do not add sign-in or task editing.
- Match the data model and REST endpoints in `ARCHITECTURE.md`. A task uses `title`, `subject`, `priority`, and `completed`, plus MongoDB's `_id` and timestamps.
- Validate data in both React and Express/Mongoose. Handle loading, success, empty, and error states; prevent duplicate submissions while a save is in progress.
- Keep MongoDB credentials in environment variables. Provide `.env.example` files with placeholders only, never real secrets.

## Work style

1. Inspect the existing files before changing anything and preserve working user changes.
2. Implement in small, understandable stages: model/controller/routes first, then client components, then connect and verify them.
3. Before each stage, briefly explain what it will do. After each stage, run the narrowest useful check and explain its result.
4. Prefer clear beginner-readable code over abstractions. Add comments only where they explain a genuinely non-obvious decision.
5. Do not claim MongoDB-backed flows work unless you have configured a database and tested them. If database credentials are unavailable, still run the build and API checks that do not require a database, then state exactly what remains to verify.

## Finish

- Update `README.md` with prerequisites, Windows PowerShell setup and run commands, environment-variable setup, and how to test the main task flow.
- Run the available build and test checks. Fix issues caused by your changes.
- Summarize the files changed, commands to start the app, and any setup or verification still needed.

---

The architecture reference is in `ARCHITECTURE.md`.