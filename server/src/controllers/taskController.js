import mongoose from 'mongoose';
import Task from '../models/Task.js';

const allowedPriorities = new Set(['Low', 'Medium', 'High']);
const allowedSubjects = new Set(['DBMS', 'DSA', 'Mathematics', 'AI/ML', 'Web Development', 'Other']);
const isValidTaskId = (id) => /^[a-f\d]{24}$/i.test(id) && mongoose.isValidObjectId(id);

export async function listTasks(req, res) {
  const { priority, subject, completed } = req.query;

  if (priority !== undefined && !allowedPriorities.has(priority)) {
    return res.status(400).json({ message: 'Priority must be Low, Medium, or High.' });
  }
  if (subject !== undefined && !allowedSubjects.has(subject)) {
    return res.status(400).json({ message: 'Subject must be one of the supported study subjects.' });
  }
  if (completed !== undefined && !['true', 'false'].includes(completed)) {
    return res.status(400).json({ message: 'Completed must be true or false.' });
  }

  const filter = {};
  if (priority !== undefined) filter.priority = priority;
  if (subject !== undefined) filter.subject = subject;
  if (completed !== undefined) filter.completed = completed === 'true';
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return res.json({ tasks });
}

export async function createTask(req, res) {
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
  const { title, subject, priority } = body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required.' });
  }
  if (typeof subject !== 'string' || !allowedSubjects.has(subject)) {
    return res.status(400).json({ message: 'Choose a valid subject.' });
  }
  if (typeof priority !== 'string' || !allowedPriorities.has(priority)) {
    return res.status(400).json({ message: 'Priority must be Low, Medium, or High.' });
  }

  const task = await Task.create({ title: title.trim(), subject, priority });
  return res.status(201).json({ message: 'Task created successfully', task });
}

export async function completeTask(req, res) {
  if (!isValidTaskId(req.params.id)) {
    return res.status(400).json({ message: 'Task ID is not valid.' });
  }

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found.' });
  if (task.completed) {
    return res.json({ message: 'Task is already completed', task });
  }

  task.completed = true;
  await task.save();
  return res.json({ message: 'Task marked as completed', task });
}

export async function deleteTask(req, res) {
  if (!isValidTaskId(req.params.id)) {
    return res.status(400).json({ message: 'Task ID is not valid.' });
  }

  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found.' });
  return res.json({ message: 'Task deleted successfully' });
}