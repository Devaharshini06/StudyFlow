import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 1 },
    subject: {
      type: String,
      required: true,
      enum: ['DBMS', 'DSA', 'Mathematics', 'AI/ML', 'Web Development', 'Other'],
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);