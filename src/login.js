import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5146/api/auth/login', loginData);
 
      const { user, token } = response.data;

      if (token) {
        // Almacenar el token 
        localStorage.setItem('token', token);

        // Establecer el estado de loggedIn a true
        setLoggedIn(true);

        console.log('Inicio de sesión exitoso. Usuario:', user);
      } else {
        console.error('La respuesta de la API no contiene un token.');

        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setShowErrorModal(true);
    }
  };

  // Si loggedIn es true, redirige a la ruta /crud
  if (loggedIn) {
    return <Navigate to="/crud" />;
  }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, magenta, cyan)' }}>
      <div className="login-box bg-dark rounded p-4 text-center bg-opacity-75 border border-light-subtle ">
        <h1 className="text-white">Administrador</h1>
        <form className="text-center mx-auto">
          <div>
            <div className="input-group mt-4">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleInputChange}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <br />
            <div className="input-group mb-2 mt-1">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <br />
            <button type="button" onClick={handleLogin} className="login-button">
              <span> Iniciar Sesión</span>
            </button>
          </div>
        </form>
      </div>
      {/* Modal de Error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error en el Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo nuevamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
