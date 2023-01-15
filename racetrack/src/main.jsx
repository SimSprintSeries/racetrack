import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authType='cookie' authName='_auth' cookieDomain='window.location.hostname' cookieSecure='true'>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
