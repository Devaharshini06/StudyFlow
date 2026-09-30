import { Check, CheckCircle2, Clock3, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/taskFormatters.js';
import './TaskCard.css';

function TaskCard({ task, isUpdating, onComplete, onDelete }) {
  return (
    <article className={`task-card ${task.completed ? 'task-card--completed' : ''}`}>
      <div className="task-card__main">
        <div className="task-card__title-row">
          <h3>{task.title}</h3>
          <span className={`task-card__priority task-card__priority--${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>
        <p className="task-card__course">{task.subject}</p>
        <div className="task-card__meta">
          <span><Clock3 size={14} /> {task.completed ? 'Completed' : 'Pending'}</span>
          <span>Added {formatDate(task.createdAt)}</span>
        </div>
      </div>
      <div className="task-card__actions">
        {!task.completed && (
          <button className="task-card__complete" type="button" onClick={() => onComplete(task._id)} disabled={isUpdating}>
            <Check size={16} /> {isUpdating ? 'Saving' : 'Mark Complete'}
          </button>
        )}
        {task.completed && <span className="task-card__done"><CheckCircle2 size={19} /> Completed</span>}
        <button className="task-card__delete" type="button" onClick={() => onDelete(task._id)} disabled={isUpdating} aria-label={`Delete ${task.title}`} title="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default TaskCard;