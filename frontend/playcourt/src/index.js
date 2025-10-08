import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import './styles/styles.css';

import HomePage from "./pages/HomePage";
import ErrorPage from './pages/ErrPage';
import LoginPage from './pages/LoginPage';
import UsersView from './pages/usuarios/UsersView';

const Router = createBrowserRouter([
    { path: '/', element: (
        <ProtectedRoute> 
          <HomePage />
        </ProtectedRoute>
      ) 
    },
    
    // Restringir vista: solo acceso con rol de administrador
    { path: '/usuarios', element: (
        <>
          <UsersView />
        </>
      ) 
    },

    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <ErrorPage /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>
);