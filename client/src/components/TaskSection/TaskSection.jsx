import { RotateCw } from 'lucide-react';
import EmptyTaskState from '../EmptyTaskState/EmptyTaskState.jsx';
import TaskCard from '../TaskCard/TaskCard.jsx';
import './TaskSection.css';

function TaskSection({
  tasks,
  statusFilter,
  onChangeStatus,
  subjectFilter,
  onChangeSubject,
  priorityFilter,
  onChangePriority,
  hasAnyTasks,
  hasError,
  pendingCount,
  completedCount,
  isLoading,
  updatingTaskId,
  onRefresh,
  onCompleteTask,
  onDeleteTask,
}) {
  const subjects = ['DBMS', 'DSA', 'Mathematics', 'AI/ML', 'Web Development', 'Other'];

  return (
    <section className="task-section" aria-label="Study tasks">
      <div className="task-section__heading">
        <div>
          <p className="eyebrow">THE LIST</p>
          <h2>Your study tasks</h2>
        </div>
        <button className="task-section__refresh" type="button" onClick={onRefresh} disabled={isLoading} aria-label="Refresh tasks" title="Refresh tasks">
          <RotateCw size={17} />
        </button>
      </div>

      <div className="task-section__filters">
        <div className="task-section__tabs" aria-label="Filter by status">
          {[
            ['all', 'All', pendingCount + completedCount],
            ['pending', 'Pending', pendingCount],
            ['completed', 'Completed', completedCount],
          ].map(([value, label, count]) => (
            <button key={value} className={`task-section__tab ${statusFilter === value ? 'is-active' : ''}`} type="button" aria-pressed={statusFilter === value} onClick={() => onChangeStatus(value)}>
              {label} <span>{count}</span>
            </button>
          ))}
        </div>
        <div className="task-section__selects">
          <label className="task-section__filter">
            <span>Subject</span>
            <select value={subjectFilter} onChange={(event) => onChangeSubject(event.target.value)}>
              <option value="all">All subjects</option>
              {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
          </label>
          <label className="task-section__filter">
            <span>Priority</span>
            <select value={priorityFilter} onChange={(event) => onChangePriority(event.target.value)}>
              <option value="all">All priorities</option>
              {['Low', 'Medium', 'High'].map((priority) => <option key={priority} value={priority}>{priority}</option>)}
            </select>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="task-section__loading" role="status"><span /> Loading your tasks...</div>
      ) : tasks.length === 0 && !hasError ? (
        <EmptyTaskState hasAnyTasks={hasAnyTasks} />
      ) : (
        <div className="task-section__list">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} isUpdating={updatingTaskId === task._id} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskSection;