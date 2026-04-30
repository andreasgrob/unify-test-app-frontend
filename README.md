# Unify Test App - Frontend

A React frontend application for the CloudBees Unify test application.

## Features

- Task list display
- Backend health monitoring
- Responsive design
- Component tests with Vitest

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Docker

```bash
# Build image
docker build -t unify-test-app-frontend .

# Run container
docker run -p 80:80 unify-test-app-frontend
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8080)

## Running Full Stack

1. Start the backend on port 8080
2. Start the frontend on port 3000
3. Navigate to http://localhost:3000