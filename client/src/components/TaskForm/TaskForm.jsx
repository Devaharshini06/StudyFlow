import { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import './TaskForm.css';

const emptyForm = {
  title: '',
  subject: '',
  priority: 'Medium',
};
const subjects = ['DBMS', 'DSA', 'Mathematics', 'AI/ML', 'Web Development', 'Other'];
const priorities = ['Low', 'Medium', 'High'];

function TaskForm({ onCreateTask, isSubmitting }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const title = form.title.trim();
    if (!title) {
      setError('Enter a task title before saving.');
      return;
    }
    if (!subjects.includes(form.subject)) {
      setError('Choose a subject before saving.');
      return;
    }
    if (!priorities.includes(form.priority)) {
      setError('Choose a valid priority before saving.');
      return;
    }

    try {
      await onCreateTask({ title, subject: form.subject, priority: form.priority });
      setForm(emptyForm);
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  return (
    <aside className="task-form-panel">
      <div className="task-form-panel__heading">
        <span className="task-form-panel__icon"><Plus size={18} /></span>
        <div>
          <p className="eyebrow">MAKE A PLAN</p>
          <h2>Add a task</h2>
        </div>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label className="task-form__field">
          <span>Task title</span>
          <input name="title" value={form.title} onChange={updateField} placeholder="e.g. Complete DBMS assignment" required />
        </label>
        <div className="task-form__field-pair">
          <label className="task-form__field">
            <span>Subject</span>
            <select name="subject" value={form.subject} onChange={updateField} required>
              <option value="" disabled>Select a subject</option>
              {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
          </label>
          <label className="task-form__field">
            <span>Priority</span>
            <select name="priority" value={form.priority} onChange={updateField}>
              {priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
            </select>
          </label>
        </div>
        {error && <p className="task-form__error" role="alert">{error}</p>}
        <button className="task-form__submit" type="submit" disabled={isSubmitting}>
          <Plus size={17} /> {isSubmitting ? 'Adding task...' : 'Add Task'}
        </button>
      </form>
      <p className="task-form-panel__footnote"><CheckCircle2 size={14} /> Small steps count. You can do this.</p>
    </aside>
  );
}

export default TaskForm;