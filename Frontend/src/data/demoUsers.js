// Demo users for testing - remove in production
export const demoUsers = [
  {
    id: "demo1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    createdAt: "2023-01-01T00:00:00.000Z",
    avatar: null
  },
  {
    id: "demo2", 
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    createdAt: "2023-01-02T00:00:00.000Z",
    avatar: null
  }
]

// Initialize demo users in localStorage if not exists
export const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem('users')
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(demoUsers))
    console.log('Demo users initialized. You can login with:')
    console.log('Email: john@example.com, Password: password123')
    console.log('Email: jane@example.com, Password: password123')
  }
}