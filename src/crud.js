import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './Crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function Crud() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setLoggedOut(true);
          return;
        }

        const response = await axios.get('http://localhost:5146/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmployees();
  }, [loggedOut]);

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department) {
      setShowErrorModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post('http://localhost:5146/api/employee', newEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees([...employees, response.data]);
        setNewEmployee({
          name: '',
          email: '',
          department: '',
        });
      } else {
        console.error('No se encontró el token de autenticación.');
      }
    } catch (error) {
      console.error('Error al agregar empleado:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployee({ ...employee });
  };

  const handleCancelEdit = () => {
    setEditEmployee(null);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put(`http://localhost:5146/api/employee/${editEmployee.id}`, editEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedEmployees = employees.map((employee) =>
          employee.id === editEmployee.id ? editEmployee : employee
        );
        setEmployees(updatedEmployees);
        setEditEmployee(null);
      } else {
        console.error('No se encontró el token de autenticación.');
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (!confirmDelete) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(`http://localhost:5146/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
      } else {
        console.error('No se encontró el token de autenticación.');
      }
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/login" />;
  }
  const handleEditInputChange = (e, field) => {
    setEditEmployee({
      ...editEmployee,
      [field]: e.target.value,
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, magenta, cyan)' }}>
      <div className="crud-container text-light text-center">
        <button type="button" onClick={handleLogout} className="cerrar-button mb-3">
          Cerrar Sesión
        </button>
        <div className="form-container bg-dark rounded p-4 text-center bg-opacity-75 border border-light-subtle text-light">
          <h2>Agregar Nuevo Empleado</h2>
          <form className="d-flex flex-column align-items-center">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={newEmployee.name}
                onChange={(e) => handleInputChange(e)}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => handleInputChange(e)}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa fa-building"></i>
              </span>
              <input
                type="text"
                name="department"
                placeholder="Departamento"
                value={newEmployee.department}
                onChange={(e) => handleInputChange(e)}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <button type="button" onClick={handleAddEmployee} className="agregar-button mt-3">
              <span> Agregar Empleado</span>
            </button>
          </form>
        </div>
        {/* Lista de empleados */}
        <table className="employee-table" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  {editEmployee && editEmployee.id === employee.id ? (
                    <div className="d-flex align-items-center justify-content-center" >
                      <div className="input-group" style={{ maxWidth: '150px' }}>
                        <span className="input-group-text">
                          <i className="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Nombre empleado"
                          value={editEmployee.name}
                          onChange={(e) => handleEditInputChange(e, 'name')}
                          className="form-control"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  ) : (
                    employee.name
                  )}
                </td>
                <td>
                  {editEmployee && editEmployee.id === employee.id ? (
                    <div className="input-group" style={{ maxWidth: '200px' }}>
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        name="email"
                        value={editEmployee.email}
                        onChange={(e) => handleEditInputChange(e, 'email')}
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editEmployee && editEmployee.id === employee.id ? (
                    <div className="input-group" style={{ maxWidth: '130px' }}>
                      <span className="input-group-text">
                        <i className="fa fa-building"></i>
                      </span>
                      <input
                        type="text"
                        name="department"
                        value={editEmployee.department}
                        onChange={(e) => handleEditInputChange(e, 'department')}
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    employee.department || 'N/A'
                  )}
                </td>
                <td>
                  {editEmployee && editEmployee.id === employee.id ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="button" onClick={handleSaveEdit} className="guardar-button">
                        <i className="fa fa-save"></i>
                      </button>
                      <button type="button" onClick={handleCancelEdit} className="cancelar-button">
                        <i className="fa fa-ban"></i>
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => handleEditEmployee(employee)} className="editar-button">
                      <i className="fa fa-pencil"></i>
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => handleDeleteEmployee(employee.id)} className="eliminar-button">
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal de Error */}
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error al Agregar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Todos los campos son obligatorios. Por favor, complete todos los campos.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Crud;