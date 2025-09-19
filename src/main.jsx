import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import  App from './App/App';
import './index.css';
import { LoadingProvider } from './components/Loading/LoadingContext';
import { AuthProvider } from './services/authContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>  
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)