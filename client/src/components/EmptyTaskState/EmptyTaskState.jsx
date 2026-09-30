import { BookOpen, CheckCircle2 } from 'lucide-react';
import './EmptyTaskState.css';

function EmptyTaskState({ hasAnyTasks }) {
  const Icon = hasAnyTasks ? CheckCircle2 : BookOpen;

  return (
    <div className="empty-task-state">
      <span className="empty-task-state__icon"><Icon size={22} /></span>
      <h3>{hasAnyTasks ? 'No matching tasks.' : 'No tasks yet.'}</h3>
      <p>{hasAnyTasks ? 'Try changing your filters.' : 'Add your first study task.'}</p>
    </div>
  );
}

export default EmptyTaskState;