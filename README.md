# Daymark

A small MERN todo app with a React/Vite frontend, an Express API, and MongoDB persistence.

## Run locally

1. Install Node.js and start a local MongoDB instance.
2. Install dependencies from the project root:

   ```sh
   npm install
   ```

3. Copy `server/.env.example` to `server/.env`. Update `MONGO_URI` if your MongoDB instance uses a different connection string.
4. Start the API and frontend in separate terminals from the project root:

   ```sh
   npm run dev:server
   npm run dev:client
   ```

5. Open the Vite URL shown in the frontend terminal (usually `http://localhost:5173`).

The Vite development server proxies `/api` requests to the Express server on port 5000. To create a production frontend bundle, run `npm run build`.
