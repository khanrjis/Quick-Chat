import { spawn } from 'child_process'
import process from 'process'

console.log('🚀 Starting ChatApp (Backend + Frontend)...\n')

const PORT = process.env.PORT || 5174

// Start backend server
const backendProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

backendProcess.on('error', (error) => {
  console.error('Backend failed to start:', error)
  process.exit(1)
})

// Wait 2 seconds for backend to start, then start frontend
setTimeout(() => {
  console.log('\n📱 Starting Vite frontend...\n')

  const frontendProcess = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  frontendProcess.on('error', (error) => {
    console.error('Frontend failed to start:', error)
    process.exit(1)
  })

  // Cleanup on exit
  const cleanup = () => {
    if (!backendProcess.killed) backendProcess.kill()
    if (!frontendProcess.killed) frontendProcess.kill()
  }

  process.on('exit', cleanup)
  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
}, 2000)
