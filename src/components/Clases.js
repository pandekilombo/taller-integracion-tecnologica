import React, { useState } from 'react'; // Importa React y useState para manejar estados
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import ClassForm from './ClassForm'; // Importa el componente del formulario para crear/editar clases
import ClassList from './ClassList'; // Importa el componente para mostrar la lista de clases
import './ClassForm.css'; // Importa los estilos para el formulario

const Clases = () => {
  const [clases, setClases] = useState([]); // Estado que almacena las clases creadas
  const [editClass, setEditClass] = useState(null); // Estado para manejar la clase que se está editando

  // Función para guardar una nueva clase o actualizar una existente
  const handleSaveClass = (newClass) => {
    if (editClass) {
      // Si hay una clase en edición, actualiza la clase existente en la lista
      setClases(clases.map(clase => clase.id_clase === editClass.id_clase ? newClass : clase));
      setEditClass(null); // Resetea la clase en edición después de actualizarla
    } else {
      // Si no hay una clase en edición, agrega una nueva clase a la lista
      setClases([...clases, { ...newClass, id_clase: clases.length + 1 }]); // Genera un id_clase único
    }
  };

  // Función para establecer la clase que se va a editar
  const handleEditClass = (clase) => {
    setEditClass(clase); // Asigna la clase seleccionada para edición
  };

  // Función para eliminar una clase de la lista
  const handleDeleteClass = (id_clase) => {
    setClases(clases.filter(clase => clase.id_clase !== id_clase)); // Elimina la clase cuyo id_clase coincida
  };

  return (
    <div className="page">
      <h1>Clases</h1>
      <p>Aquí puedes ver y gestionar las clases disponibles.</p>
      
      {/* Formulario para agregar o editar clases */}
      <ClassForm onSave={handleSaveClass} editClass={editClass} />
      
      {/* Lista de clases */}
      <ClassList clases={clases} onEdit={handleEditClass} onDelete={handleDeleteClass} />
      
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home</Link> {/* Enlace para navegar a la página principal */}
        <Link to="/estudiantes" className="btn">Estudiantes</Link> {/* Enlace para la página de estudiantes */}
        <Link to="/horarios" className="btn">Horarios</Link> {/* Enlace para la página de horarios */}
      </div>
    </div>
  );
}

export default Clases;
