# Copilot Instructions

## Project

A small, polished MERN Todo application for a college experiment.

The app is intentionally simple, but the UI should feel thoughtfully designed rather than like a generic Bootstrap CRUD application.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- JavaScript only
- Plain CSS

## Features

- Add a todo
- Mark a todo as completed
- Delete a todo
- Display all todos

## Todo model

- text: String, required
- completed: Boolean, default false

## API

- GET /api/todos
- POST /api/todos
- PATCH /api/todos/:id
- DELETE /api/todos/:id

## UI / Design

- Single-page application.
- Make the interface visually polished and modern.
- Do NOT use Bootstrap or component libraries.
- Use custom CSS.
- Avoid the generic "dashboard/admin panel" aesthetic.
- Use generous spacing and clean typography.
- Keep the color palette restrained.
- Use subtle borders, shadows, hover states and transitions.
- Make completed todos visually distinct but not overly dramatic.
- The todo input and list should be the visual focus.
- Make the page feel intentional and cohesive.
- Keep the design relatively minimal rather than adding unnecessary UI elements.
- It should look good on both desktop and mobile.

## Code Style

- Keep the code beginner-friendly.
- Prefer simple React components.
- Don't create abstractions unless they are actually useful.
- Keep components reasonably small.
- Use semantic HTML where appropriate.
- No unnecessary dependencies.

## Restrictions

- No authentication.
- No React Router.
- No Redux.
- No UI component libraries.
- No TypeScript.
- No unnecessary features.
- Do not add features unless explicitly requested.
