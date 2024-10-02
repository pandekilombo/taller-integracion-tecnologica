
import React from 'react';
import { Link } from 'react-router-dom';

const Estudiantes = () => {
  return (
    <div className="page">
      <h1>Estudiantes</h1>
      <p>Aquí puedes gestionar la información de los estudiantes.</p>
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home</Link>
        <Link to="/horarios" className="btn">Horarios</Link>
        <Link to="/clases" className="btn">Clases</Link>
      </div>
    </div>
  );
}

export default Estudiantes;
