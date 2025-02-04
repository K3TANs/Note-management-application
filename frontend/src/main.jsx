import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
