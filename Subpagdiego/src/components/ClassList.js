// src/components/ClassList.js
import React from 'react';

const ClassList = ({ clases, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Clases</h2>
      <ul>
        {clases.map((clase) => (
          <li key={clase.id_clase} style={{ marginBottom: '20px' }}>
            <div>
              <strong>{clase.nombre_clase}</strong> - {clase.Fecha} ({clase.hora_inicio} - {clase.hora_fin}) ({clase.cupo_clase} cupos disponibles)
            </div>
            <div style={{ marginTop: '5px' }}>
              <em>{clase.descripcion}</em> {/* Muestra la descripción debajo del nombre de la clase */}
            </div>
            <button onClick={() => onEdit(clase)}>Editar</button>
            <button onClick={() => onDelete(clase.id_clase)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
 