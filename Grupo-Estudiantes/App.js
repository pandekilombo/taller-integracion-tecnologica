import React, { useState } from 'react';
import AlumnoForm from './AlumnoForm'; // Importa el formulario para agregar o editar alumnos
import './App.css'; // Importa los estilos CSS

function App() {
  // Define el estado para almacenar la lista de alumnos
  const [alumnos, setAlumnos] = useState([]);
  
  // Estado para saber si se está editando un alumno (almacena el índice)
  const [editIndex, setEditIndex] = useState(null);
  
  // Estado para almacenar los datos del alumno que se está editando o creando
  const [editAlumno, setEditAlumno] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    correo: '',
    peso: '',
    altura: '',
    objetivo: '',
    condicionMedica: '',
  });

  // Maneja el envío del formulario
  const handleFormSubmit = (alumno) => {
    // Si se está editando un alumno
    if (editIndex !== null) {
      // Actualiza la lista de alumnos
      const updatedAlumnos = alumnos.map((a, index) =>
        index === editIndex ? alumno : a // Reemplaza el alumno editado
      );
      setAlumnos(updatedAlumnos); // Actualiza el estado con la nueva lista
      setEditIndex(null); // Resetea el índice de edición
    } else {
      // Si se está agregando un nuevo alumno
      setAlumnos([...alumnos, alumno]); // Añade el nuevo alumno a la lista
    }

    // Resetea el formulario a sus valores iniciales
    setEditAlumno({
      rut: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      correo: '',
      peso: '',
      altura: '',
      objetivo: '',
      condicionMedica: '',
    });
  };

  // Maneja el clic en el botón de editar
  const handleEditClick = (index) => {
    // Establece los datos del alumno seleccionado para editar
    setEditAlumno(alumnos[index]);
    setEditIndex(index); // Establece el índice del alumno que se está editando
  };

  // Maneja el clic en el botón de eliminar
  const handleDeleteClick = (index) => {
    // Filtra el alumno que se quiere eliminar de la lista
    const updatedAlumnos = alumnos.filter((_, i) => i !== index);
    setAlumnos(updatedAlumnos); // Actualiza el estado con la nueva lista
  };

  return (
    <div className="App">
      <h1>Registro de Alumnos</h1>
      {/* Componente del formulario para agregar o editar alumnos */}
      <AlumnoForm
        onSubmit={handleFormSubmit} // Prop para manejar el envío del formulario
        editAlumno={editAlumno} // Prop para los datos del alumno en edición
        setEditAlumno={setEditAlumno} // Prop para actualizar los datos del alumno
      />
      <h2>Alumnos Registrados</h2>
      <div className="alumnos-list">
        {/* Muestra un mensaje si no hay alumnos registrados */}
        {alumnos.length === 0 ? (
          <p>No hay alumnos registrados.</p>
        ) : (
          // Mapea sobre la lista de alumnos para mostrar cada uno
          alumnos.map((alumno, index) => (
            <div key={index} className="alumno-item">
              <p>
                <strong>RUT:</strong> {alumno.rut}, 
                <strong> Nombre:</strong> {alumno.nombre}, 
                <strong> Apellido:</strong> {alumno.apellido}, 
                <strong> Dirección:</strong> {alumno.direccion}, 
                <strong> Teléfono:</strong> {alumno.telefono}, 
                <strong> Correo:</strong> {alumno.correo}
              </p>
              <p>
                <strong>Peso:</strong> {alumno.peso} kg, 
                <strong> Altura:</strong> {alumno.altura} cm, 
                <strong> Objetivo:</strong> {alumno.objetivo}, 
                <strong> Condición Médica:</strong> {alumno.condicionMedica}
              </p>
              <div className="alumno-buttons">
                {/* Botón para editar el alumno */}
                <button className="edit" onClick={() => handleEditClick(index)}>Editar</button>
                {/* Botón para eliminar el alumno */}
                <button className="delete" onClick={() => handleDeleteClick(index)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App; // Exporta el componente App para usarlo en otras partes de la aplicación
