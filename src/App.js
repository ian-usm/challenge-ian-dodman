// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Crud from './crud';
function App() {
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/crud"
          element={isAuthenticated() ? <Crud /> : <Navigate to="/login" />}
        />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
