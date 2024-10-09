import React from 'react';
import { Link } from 'react-router-dom';

const Clases = () => {

  
  return (
    <div className="page">
      <h1>Clases</h1>
      <p>Aquí puedes ver y gestionar las clases disponibles.</p>
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home</Link>
        <Link to="/estudiantes" className="btn">Estudiantes</Link>
        <Link to="/horarios" className="btn">Horarios</Link>
      </div>
    </div>
  );
}

export default Clases;
