import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/common.css'
import App from './App.jsx'
import ThemeProvider from './styles/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render( 
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
