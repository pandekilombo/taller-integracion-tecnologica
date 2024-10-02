import React from 'react';
import { Link } from 'react-router-dom';

const Horarios = () => {
  return (
    <div className="page">
      <h1>Horarios</h1>
      <p>Aquí puedes ver y gestionar los horarios de las clases.</p>
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home</Link>
        <Link to="/estudiantes" className="btn">Estudiantes</Link>
        <Link to="/clases" className="btn">Clases</Link>
      </div>
    </div>
  );
}

export default Horarios;
