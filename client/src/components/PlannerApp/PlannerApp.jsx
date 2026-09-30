import { useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, markTaskComplete } from '../../services/taskApi.js';
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage.jsx';
import PlannerOverview from '../PlannerOverview/PlannerOverview.jsx';
import SiteHeader from '../SiteHeader/SiteHeader.jsx';
import TaskForm from '../TaskForm/TaskForm.jsx';
import TaskSection from '../TaskSection/TaskSection.jsx';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner.jsx';
import './PlannerApp.css';

function PlannerApp() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadTasks() {
    setIsLoading(true);
    setError('');
    try {
      setTasks(await getTasks());
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const visibleTasks = tasks.filter((task) => {
    if (statusFilter === 'pending' && task.completed) return false;
    if (statusFilter === 'completed' && !task.completed) return false;
    if (subjectFilter !== 'all' && task.subject !== subjectFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  async function handleCreateTask(taskDetails) {
    setIsSubmitting(true);
    setError('');
    setNotice('');
    try {
      await createTask(taskDetails);
      setStatusFilter('pending');
      setSubjectFilter('all');
      setPriorityFilter('all');
      setNotice('Task added to your study plan.');
      await loadTasks();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCompleteTask(taskId) {
    setUpdatingTaskId(taskId);
    setError('');
    setNotice('');
    try {
      await markTaskComplete(taskId);
      setNotice('Task marked as completed.');
      await loadTasks();
    } catch (updateError) {
      setError(updateError.message);
    } finally {
      setUpdatingTaskId(null);
    }
  }

  async function handleDeleteTask(taskId) {
    setUpdatingTaskId(taskId);
    setError('');
    setNotice('');
    try {
      await deleteTask(taskId);
      setNotice('Task deleted.');
      await loadTasks();
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setUpdatingTaskId(null);
    }
  }

  return (
    <main className="planner-app">
      <SiteHeader />
      <WelcomeBanner />
      <PlannerOverview total={tasks.length} pending={pendingTasks.length} completed={completedTasks.length} />

      <FeedbackMessage message={error} kind="error" onRetry={loadTasks} />
      <FeedbackMessage message={notice} kind="success" />

      <section className="planner-workspace" aria-label="Study tasks">
        <TaskSection
          tasks={visibleTasks}
          statusFilter={statusFilter}
          onChangeStatus={setStatusFilter}
          subjectFilter={subjectFilter}
          onChangeSubject={setSubjectFilter}
          priorityFilter={priorityFilter}
          onChangePriority={setPriorityFilter}
          hasAnyTasks={tasks.length > 0}
          hasError={Boolean(error)}
          pendingCount={pendingTasks.length}
          completedCount={completedTasks.length}
          isLoading={isLoading}
          updatingTaskId={updatingTaskId}
          onRefresh={loadTasks}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskForm onCreateTask={handleCreateTask} isSubmitting={isSubmitting} />
      </section>

      <footer className="planner-footer"><span>One task at a time.</span><span>Made for your next good study session.</span></footer>
    </main>
  );
}

export default PlannerApp;