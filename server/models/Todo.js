import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task text is required.'],
      trim: true,
      maxlength: [500, 'Task text cannot exceed 500 characters.'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Todo', todoSchema);
