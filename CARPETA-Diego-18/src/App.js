// App.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Importa tu configuración de Firebase
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Importa funciones de Firestore
import AlumnoForm from './AlumnoForm';
import './App.css'; // Asegúrate de importar tus estilos CSS

const App = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [editAlumno, setEditAlumno] = useState(null);

  // Función para obtener la lista de alumnos desde Firestore
  const fetchAlumnos = async () => {
    try {
      const alumnosCollection = collection(db, 'Usuarios');
      const alumnosSnapshot = await getDocs(alumnosCollection);
      const alumnosList = alumnosSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id, // Asegura que el id de Firestore sobrescriba cualquier id en los datos
      }));
      setAlumnos(alumnosList);
    } catch (error) {
      console.error('Error al obtener los alumnos: ', error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  // Función para agregar o actualizar un alumno
  const handleFormSubmit = async (alumno) => {
    try {
      let newId = alumno.id; // Inicializa con el id existente, si lo hay

      if (alumno.id) {
        // Si el alumno tiene un id, es una actualización
        const alumnoRef = doc(db, 'Usuarios', alumno.id);
        const { id, ...alumnoData } = alumno; // Excluye el id de los datos
        await updateDoc(alumnoRef, alumnoData);
        console.log('Alumno actualizado correctamente.');
      } else {
        // Si no tiene id, es un nuevo alumno
        const { id, ...alumnoData } = alumno; // Excluye el id de los datos
        const docRef = await addDoc(collection(db, 'Usuarios'), alumnoData);
        console.log('Alumno agregado correctamente.');
        newId = docRef.id; // Asigna el id generado al alumno
      }

      // Actualiza la lista de alumnos
      await fetchAlumnos();

      // Retorna el id para que pueda ser utilizado en AlumnoForm
      return newId;
    } catch (error) {
      console.error('Error al agregar o actualizar el alumno: ', error);
      throw error; // Propaga el error para que pueda ser manejado en AlumnoForm
    }
  };

  // Función para eliminar un alumno
  const handleDeleteAlumno = async (alumnoId) => {
    try {
      await deleteDoc(doc(db, 'Usuarios', alumnoId));
      console.log('Alumno eliminado correctamente.');
      // Actualiza la lista de alumnos
      await fetchAlumnos();

      // Limpia el formulario si se estaba editando el alumno eliminado
      if (editAlumno && editAlumno.id === alumnoId) {
        setEditAlumno(null);
      }
    } catch (error) {
      console.error('Error al eliminar el alumno: ', error);
      throw error; // Propaga el error para que pueda ser manejado en AlumnoForm
    }
  };

  return (
    <div className="App">
      <h1>Registro de Alumnos</h1>
      <AlumnoForm
        onSubmit={handleFormSubmit}
        editAlumno={editAlumno}
        setEditAlumno={setEditAlumno}
        onDelete={handleDeleteAlumno}
      />
      <h2>Alumnos Registrados</h2>
      <div className="alumnos-list">
        {alumnos.length === 0 ? (
          <p>No hay alumnos registrados.</p>
        ) : (
          alumnos.map((alumno) => (
            <div key={alumno.id} className="alumno-item">
              <div className="alumno-data">
                <div><strong>RUT:</strong> {alumno.rut}</div>
                <div><strong>Nombre:</strong> {alumno.nombre}</div>
                <div><strong>Apellido:</strong> {alumno.apellido}</div>
                <div><strong>Dirección:</strong> {alumno.direccion}</div>
                <div><strong>Teléfono:</strong> {alumno.telefono}</div>
                <div><strong>Correo:</strong> {alumno.correo}</div>
                <div><strong>Peso (kg):</strong> {alumno.peso}</div>
                <div><strong>Altura (cm):</strong> {alumno.altura}</div>
                <div><strong>Objetivo:</strong> {alumno.objetivo}</div>
                <div><strong>Condición Médica:</strong> {alumno.condicionMedica}</div>
              </div>
              <div className="alumno-actions">
                <button onClick={() => setEditAlumno(alumno)}>Editar</button>
                <button onClick={() => handleDeleteAlumno(alumno.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
