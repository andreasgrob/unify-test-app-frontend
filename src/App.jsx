import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetchHealth()
    fetchTasks()
  }, [])

  const fetchHealth = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      const response = await fetch(`${apiUrl}/health`)
      const data = await response.json()
      setHealth(data)
    } catch (err) {
      console.error('Health check failed:', err)
    }
  }

  const fetchTasks = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      const response = await fetch(`${apiUrl}/api/tasks`)
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const data = await response.json()
      setTasks(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container">Loading tasks...</div>
  }

  if (error) {
    return <div className="container error">Error: {error}</div>
  }

  return (
    <div className="container">
      <header>
        <h1>CloudBees Unify Test App</h1>
        {health && (
          <div className="health-status">
            Backend Status: <span className="status-healthy">{health.status}</span>
          </div>
        )}
      </header>

      <main>
        <h2>Task List</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className="status">
                  {task.completed ? '✓ Completed' : '○ In Progress'}
                </span>
                <span className="date">
                  {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
