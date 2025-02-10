import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { WindowFrame } from './components/WindowFrame'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WindowFrame>
      <App />
    </WindowFrame>
  </React.StrictMode>
)
