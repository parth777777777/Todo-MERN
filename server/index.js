import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todos.js';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use((request, response) => {
  response.status(404).json({ message: 'Route not found.' });
});

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ message: error.message });
  }
  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ message: 'Invalid task ID.' });
  }
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ message: 'Request body must be valid JSON.' });
  }

  console.error(error);
  response.status(500).json({ message: 'An unexpected server error occurred.' });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required. Set it in your environment or server/.env.');
  }

  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error(`Unable to start server: ${error.message}`);
  process.exitCode = 1;
});
