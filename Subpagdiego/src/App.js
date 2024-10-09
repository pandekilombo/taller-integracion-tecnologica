// src/App.js
import React, { useEffect, useState } from 'react';
import ClassForm from './components/ClassForm'; // Componente para el formulario
import ClassList from './components/ClassList'; // Componente para la lista de clases
import './App.css'; // Asegúrate de importar tu archivo CSS

const App = () => {
  const [clases, setClases] = useState([]);
  const [editClass, setEditClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const response = await fetch('http://localhost:5000/clases');
    const data = await response.json();
    setClases(data);
  };

  const saveClass = async (newClass) => {
    if (editClass) {
      // Si estamos editando una clase existente
      await fetch(`http://localhost:5000/clases/${editClass.id_clase}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });
    } else {
      // Si estamos creando una nueva clase
      await fetch('http://localhost:5000/clases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });
    }
    // Una vez guardada la clase, actualizamos la lista de clases
    fetchClasses();
    setEditClass(null); // Limpiamos el estado de edición después de guardar
  };

  const deleteClass = async (id_clase) => {
    try {
      const response = await fetch(`http://localhost:5000/clases/${id_clase}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Si la eliminación es exitosa, actualiza la lista de clases
        fetchClasses();
      } else {
        console.error("Error al eliminar la clase:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };
  
  
  

  return (
    <div className="app-container"> {/* Contenedor para formulario y lista */}
      <div className="form-container"> {/* Contenedor del formulario */}
        <h1>Gestión de Clases</h1>
        <ClassForm onSave={saveClass} editClass={editClass} />
      </div>
      <div className="list-container"> {/* Contenedor de la lista */}
        <ClassList clases={clases} onDelete={deleteClass} onEdit={setEditClass} />
      </div>
    </div>
  );
};

export default App;
