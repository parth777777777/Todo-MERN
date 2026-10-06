import { Router } from 'express';
import Todo from '../models/Todo.js';

const router = Router();

router.get('/', async (request, response, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    response.json(todos);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const { text } = request.body;
    if (typeof text !== 'string' || !text.trim()) {
      return response.status(400).json({ message: 'Task text is required.' });
    }

    const todo = await Todo.create({ text });
    response.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (request, response, next) => {
  try {
    const { completed } = request.body;
    if (typeof completed !== 'boolean') {
      return response.status(400).json({ message: 'Completed must be true or false.' });
    }

    const todo = await Todo.findByIdAndUpdate(
      request.params.id,
      { completed },
      { new: true, runValidators: true },
    );
    if (!todo) {
      return response.status(404).json({ message: 'Task not found.' });
    }

    response.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(request.params.id);
    if (!todo) {
      return response.status(404).json({ message: 'Task not found.' });
    }

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
