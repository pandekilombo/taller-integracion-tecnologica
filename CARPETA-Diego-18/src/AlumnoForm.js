// AlumnoForm.js
import React, { useEffect, useState } from 'react';
import './App.css'; // Importa tus estilos CSS
import { collection, getDocs } from 'firebase/firestore'; // Importa funciones necesarias
import { db } from './firebase.js'; // Importa tu configuración de Firebase

const AlumnoForm = ({ onSubmit, editAlumno, setEditAlumno, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const [alumnoData, setAlumnoData] = useState({
    id: '',
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

  const [error, setError] = useState('');

  useEffect(() => {
    if (editAlumno) {
      setAlumnoData({
        id: editAlumno.id || '',
        rut: editAlumno.rut || '',
        nombre: editAlumno.nombre || '',
        apellido: editAlumno.apellido || '',
        direccion: editAlumno.direccion || '',
        telefono: editAlumno.telefono || '',
        correo: editAlumno.correo || '',
        peso: editAlumno.peso || '',
        altura: editAlumno.altura || '',
        objetivo: editAlumno.objetivo || '',
        condicionMedica: editAlumno.condicionMedica || '',
      });
    } else {
      // Limpia el formulario si no hay alumno para editar
      setAlumnoData({
        id: '',
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
    }
  }, [editAlumno]);

  const validateForm = () => {
    const { rut, telefono, correo, nombre, apellido, direccion, peso, altura } = alumnoData;
    const rutPattern = /^[0-9]{1,8}-[0-9Kk]$/;
    const phonePattern = /^[0-9]{9,12}$/;

    if (!rutPattern.test(rut)) {
      setError('El RUT debe tener el formato correcto, ej: 12345678-9');
      return false;
    }
    if (!phonePattern.test(telefono)) {
      setError('El número de teléfono debe contener solo números y tener entre 9 y 12 dígitos');
      return false;
    }
    if (!correo.includes('@')) {
      setError('El correo debe ser válido');
      return false;
    }
    if (!nombre || !apellido || !direccion) {
      setError('Nombre, Apellido y Dirección son obligatorios');
      return false;
    }
    if (peso < 0 || altura < 0) {
      setError('El peso y la altura no pueden ser negativos');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (validateForm()) {
      setLoading(true);
      try {
        if (!alumnoData.id) {
          // Agregando un nuevo alumno, verifica si el RUT ya existe
          const alumnosCollection = collection(db, 'Usuarios');
          const querySnapshot = await getDocs(alumnosCollection);
          const existingAlumno = querySnapshot.docs.find(doc => doc.data().rut === alumnoData.rut);

          if (existingAlumno) {
            setError('El alumno ya existe con ese RUT.');
            setLoading(false);
            return;
          }
        }
        // Llama a onSubmit y espera el id retornado
        const newId = await onSubmit(alumnoData);

        // Actualiza alumnoData.id con el nuevo id
        setAlumnoData(prevData => ({
          ...prevData,
          id: newId,
        }));

        // Limpia el formulario solo si no estás editando
        if (!editAlumno) {
          setAlumnoData({
            id: '',
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
        }

        setEditAlumno(null);
      } catch (error) {
        console.error('Error al guardar el alumno: ', error);
        setError('Error al guardar el alumno. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para manejar la eliminación del alumno
  const handleDelete = async () => {
    if (loading) return;
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      setLoading(true);
      try {
        await onDelete(alumnoData.id); // Asegúrate de esperar a que la promesa se resuelva
        // Limpia el formulario
        setEditAlumno(null);
        setAlumnoData({
          id: '',
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
      } catch (error) {
        console.error('Error al eliminar el alumno: ', error);
        setError('Error al eliminar el alumno. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumnoData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2>{alumnoData.id ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>RUT:</label>
          <input
            type="text"
            name="rut"
            value={alumnoData.rut}
            onChange={handleChange}
            pattern="^[0-9]{1,8}-[0-9Kk]$"
            title="Formato RUT: 12345678-9"
            required
            disabled={!!alumnoData.id} // Deshabilita el campo RUT al editar
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={alumnoData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={alumnoData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={alumnoData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={alumnoData.telefono}
            onChange={handleChange}
            pattern="[0-9]{9,12}"
            title="El número debe contener solo números (9-12 dígitos)"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={alumnoData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Datos de Salud</h2>
        <div className="form-group">
          <label>Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={alumnoData.peso}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Altura (cm):</label>
          <input
            type="number"
            name="altura"
            value={alumnoData.altura}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Objetivo:</label>
          <input
            type="text"
            name="objetivo"
            value={alumnoData.objetivo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Condición médica:</label>
          <input
            type="text"
            name="condicionMedica"
            value={alumnoData.condicionMedica}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Guardando...' : (alumnoData.id ? 'Actualizar Alumno' : 'Agregar Alumno')}
          </button>
          {alumnoData.id && (
            <button type="button" className="delete-button" onClick={handleDelete} disabled={loading}>
              {loading ? 'Eliminando...' : 'Eliminar Alumno'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AlumnoForm;
