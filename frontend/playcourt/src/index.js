import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import './styles/styles.css';

import HomePage from "./pages/HomePage";
import ErrorPage from './pages/ErrPage';
import LoginPage from './pages/LoginPage';
import UsuariosPage from './pages/usuarios/UsuariosPage';
import CanchasPage from './pages/canchas/CanchasPage';
import HomeWebPage from './pages/website/HomeWebPage';
import ReservationsWebPage from './pages/website/ReservationsWebPage';

const Router = createBrowserRouter([
    { path: '/system/home', element: (
        <ProtectedRoute> 
          <HomePage />
        </ProtectedRoute>
      ) 
    },
    
    // Restringir vista: solo acceso con rol de administrador
    { path: '/system/usuarios', element: (
        <ProtectedRoute>
          <UsuariosPage />
        </ProtectedRoute>
      ) 
    },

    { path: '/system/canchas', element: (
        <ProtectedRoute>
          <CanchasPage />
        </ProtectedRoute>
      ) 
    },
    
    { path: '/system/login', element: <LoginPage /> },
    { path: '/', element: <HomeWebPage /> },
    { path: '/reservas', element: <ReservationsWebPage /> },
    { path: '*', element: <ErrorPage /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>
);