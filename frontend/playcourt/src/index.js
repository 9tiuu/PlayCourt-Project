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
import EmpleadosPage from './pages/empleados/EmpleadosPage';
import HorariosPage from './pages/horarios/HorariosPage';
import ReservasPage from './pages/reservas/ReservasPage';
import FormReservationWebPage from './pages/website/FormReservationWebPage';

import ReservationsWebPage from './pages/website/ReservationsWebPage';


const Router = createBrowserRouter([
    { 
      path: '/system/home', element: (
        <ProtectedRoute> 
          <HomePage />
        </ProtectedRoute>
      ) 
    },
    
    // Restringir vista: solo acceso con rol de administrador
    { 
      path: '/system/usuarios', element: (
        <ProtectedRoute>
          <UsuariosPage />
        </ProtectedRoute>
      ) 
    },

    { 
      path: '/system/canchas', element: (
        <ProtectedRoute>
          <CanchasPage />
        </ProtectedRoute>
      ) 
    },

    { 
      path: '/system/empleados', element: (
        <ProtectedRoute>
          <EmpleadosPage />
        </ProtectedRoute>
      ) 
    },
    
    { 
      path: '/system/horarios', element: (
        <ProtectedRoute>
          <HorariosPage />
        </ProtectedRoute>
      ) 
    },

    { 
      path: '/system/reservas', element: (
        <ProtectedRoute>
          <ReservasPage />
        </ProtectedRoute>
      ) 
    },
    
    { path: '/system/login', element: <LoginPage /> },

    // Website routes
    { path: '/', element: <HomeWebPage /> },
    { path: '/reservas', element: <ReservationsWebPage /> },
    { path: '/reservas/form/:cancha_nombre/:cancha_numero', element: <FormReservationWebPage /> },
    { path: '*', element: <ErrorPage /> },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>
);