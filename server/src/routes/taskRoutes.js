import { Router } from 'express';
import { completeTask, createTask, deleteTask, listTasks } from '../controllers/taskController.js';

const router = Router();

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id/complete', completeTask);
router.delete('/:id', deleteTask);

export default router;