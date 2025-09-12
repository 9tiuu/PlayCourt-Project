import React from 'react';
import ReactDOM from 'react-dom/client';

import HomePage from "./pages/HomePage";
import ErrorPage from './pages/ErrPage';
import LoginPage from './pages/LoginPage';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import './styles/styles.css';

const Router = createBrowserRouter([
    { path: '/', element: (
        <ProtectedRoute> 
          <HomePage />
        </ProtectedRoute>
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