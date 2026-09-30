const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Could not reach the planner API. Check that the app is running.');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong. Please try again.');
  }
  return result;
}

export async function getTasks() {
  const result = await request('/tasks');
  return result.tasks;
}

export async function createTask(task) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export async function markTaskComplete(taskId) {
  return request(`/tasks/${taskId}/complete`, { method: 'PUT' });
}

export async function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, { method: 'DELETE' });
}