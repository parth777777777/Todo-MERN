import { useEffect, useState } from 'react';

async function requestTodos(path, options) {
  const response = await fetch(`/api/todos${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    requestTodos('')
      .then(setTodos)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText || saving) return;

    setSaving(true);
    setError('');
    try {
      const todo = await requestTodos('', {
        method: 'POST',
        body: JSON.stringify({ text: trimmedText }),
      });
      setTodos((currentTodos) => [...currentTodos, todo]);
      setText('');
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTodo(todo) {
    setError('');
    try {
      const updatedTodo = await requestTodos(`/${todo._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: !todo.completed }),
      });
      setTodos((currentTodos) =>
        currentTodos.map((item) => (item._id === updatedTodo._id ? updatedTodo : item)),
      );
    } catch (updateError) {
      setError(updateError.message);
    }
  }

  async function deleteTodo(id) {
    setError('');
    try {
      await requestTodos(`/${id}`, { method: 'DELETE' });
      setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== id));
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="page-shell">
      <div className="page-topline">
        <a className="wordmark" href="/" aria-label="Daymark home">
          <span className="wordmark-mark" aria-hidden="true">d.</span>
          <span>daymark</span>
        </a>
        <span className="topline-note">A clearer day, one thing at a time</span>
      </div>

      <section className="todo-panel" aria-labelledby="page-title">
        <header className="intro">
          <p className="eyebrow">YOUR SPACE TO FOCUS</p>
          <h1 id="page-title">Make room for<br /><span>what matters.</span></h1>
          <p className="intro-copy">Gather your thoughts. Take them one at a time.</p>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <label className="sr-only" htmlFor="new-todo">Add a task</label>
          <input
            id="new-todo"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="What’s on your mind?"
            maxLength={500}
            disabled={saving}
          />
          <button type="submit" disabled={!text.trim() || saving}>
            <span>{saving ? 'Adding…' : 'Add task'}</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
        </form>

        <div className="list-heading">
          <h2>Your list</h2>
          {!loading && todos.length > 0 && (
            <span className="task-count">
              {remaining} {remaining === 1 ? 'task' : 'tasks'} left
            </span>
          )}
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        {loading ? (
          <p className="list-message" role="status">Gathering your tasks…</p>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✳</span>
            <p>Your list is clear.</p>
            <span>Add a task above to get started.</span>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className={`todo-item${todo.completed ? ' is-complete' : ''}`} key={todo._id}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                    aria-label={`${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}: ${todo.text}`}
                  />
                  <span className="custom-checkbox" aria-hidden="true">
                    {todo.completed && <span>✓</span>}
                  </span>
                  <span className="todo-text">{todo.text}</span>
                </label>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                  aria-label={`Delete: ${todo.text}`}
                  title="Delete task"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="panel-footer">
          <span>Small steps still move you forward.</span>
          <span className="footer-spark" aria-hidden="true">✳</span>
        </footer>
      </section>

      <p className="page-caption">A little more clarity, every day.</p>
    </main>
  );
}

export default App;
