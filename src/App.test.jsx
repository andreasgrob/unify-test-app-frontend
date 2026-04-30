import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

global.fetch = vi.fn()

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders the app title', () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy', service: 'backend' })
        })
      }
      if (url.includes('/api/tasks')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      }
    })

    render(<App />)
    expect(screen.getByText('CloudBees Unify Test App')).toBeTruthy()
  })

  it('displays loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {}))

    render(<App />)
    expect(screen.getByText('Loading tasks...')).toBeTruthy()
  })

  it('fetches and displays tasks', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]

    fetch.mockImplementation((url) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy', service: 'backend' })
        })
      }
      if (url.includes('/api/tasks')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTasks)
        })
      }
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeTruthy()
      expect(screen.getByText('Test Description')).toBeTruthy()
    })
  })

  it('displays error when fetch fails', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' })
        })
      }
      if (url.includes('/api/tasks')) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.reject(new Error('Failed to fetch'))
        })
      }
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeTruthy()
    })
  })
})
