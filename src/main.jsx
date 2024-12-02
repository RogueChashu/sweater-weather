import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import './App.css'
import Header from './Header.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
)
