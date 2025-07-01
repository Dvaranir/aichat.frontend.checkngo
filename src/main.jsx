import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function renderApp(elementId = 'cng_ai_chat') {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with id "${elementId}" not found`)
    return null
  }
  
  const root = createRoot(element)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  return root
}

if (typeof window !== 'undefined') {
  window.renderCngAiChat = renderApp
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderApp())
  } else {
    renderApp()
  }
}

export { renderApp }
