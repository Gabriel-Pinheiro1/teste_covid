import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SharedStateProvider } from './app/contexts/StateContext.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SharedStateProvider>
    <App />
    </SharedStateProvider>
    
  </React.StrictMode>,
)
