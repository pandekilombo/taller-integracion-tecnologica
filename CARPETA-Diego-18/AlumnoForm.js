import React, { useEffect, useState } from 'react';
import './App.css'; // Importa los estilos CSS
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; // Importa las funciones necesarias de Firestore
import { db } from './firebase.js'; // Asegúrate de importar tu configuración de Firebase

const AlumnoForm = ({ onSubmit, editAlumno, setEditAlumno }) => {
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false); // Estado para deshabilitar el botón Siguiente

  const [rut, setRut] = useState(editAlumno.rut || '');
  const [nombre, setNombre] = useState(editAlumno.nombre || '');
  const [apellido, setApellido] = useState(editAlumno.apellido || '');
  const [direccion, setDireccion] = useState(editAlumno.direccion || '');
  const [telefono, setTelefono] = useState(editAlumno.telefono || '');
  const [correo, setCorreo] = useState(editAlumno.correo || '');

  const [peso, setPeso] = useState(editAlumno.peso || '');
  const [altura, setAltura] = useState(editAlumno.altura || '');
  const [objetivo, setObjetivo] = useState(editAlumno.objetivo || '');
  const [condicionMedica, setCondicionMedica] = useState(editAlumno.condicionMedica || '');

  const [error, setError] = useState('');

  useEffect(() => {
    setRut(editAlumno.rut || '');
    setNombre(editAlumno.nombre || '');
    setApellido(editAlumno.apellido || '');
    setDireccion(editAlumno.direccion || '');
    setTelefono(editAlumno.telefono || '');
    setCorreo(editAlumno.correo || '');
    
    setPeso(editAlumno.peso || '');
    setAltura(editAlumno.altura || '');
    setObjetivo(editAlumno.objetivo || '');
    setCondicionMedica(editAlumno.condicionMedica || '');
  }, [editAlumno]);

  const validateForm = () => {
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

  const handleNextClick = () => {
    if (validateForm()) {
      setNextDisabled(true); // Deshabilita el botón "Siguiente"
      setShowHealthForm(true); // Muestra el formulario de salud
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Evita el envío si ya se está procesando

    if (validateForm()) {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Usuarios"));
        const existingAlumno = querySnapshot.docs.find(doc => doc.data().rut === rut);
        
        if (existingAlumno) {
          setError('El alumno ya existe con ese RUT.');
          setLoading(false);
          return;
        }

        const docRef = doc(db, "Usuarios", rut);

        await setDoc(docRef, {
          rut,
          nombre,
          apellido,
          direccion,
          telefono,
          correo,
          peso: peso || '',
          altura: altura || '',
          objetivo,
          condicionMedica: condicionMedica || '',
        });

        console.log("Documento escrito con ID: ", rut);

        onSubmit({
          rut,
          nombre,
          apellido,
          direccion,
          telefono,
          correo,
          peso,
          altura,
          objetivo,
          condicionMedica,
        });

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
        setShowHealthForm(false);
      } catch (error) {
        console.error("Error al añadir el documento: ", error);
        setError("Error al guardar el alumno. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{editAlumno.nombre ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
      {error && <div className="error-message">{error}</div>}

      {!showHealthForm ? (
        <form>
          <div className="form-group">
            <label>RUT:</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              pattern="^[0-9]{1,8}-[0-9Kk]$"
              title="Formato RUT: 12345678-9"
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              pattern="[0-9]{9,12}"
              title="El número debe contener solo números (9-12 dígitos)"
              required
            />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleNextClick} className="next-button" disabled={nextDisabled}>
            Siguiente
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Datos de Salud</h2>
          <div className="form-group">
            <label>Peso (kg):</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(Math.max(0, e.target.value))}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Altura (cm):</label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(Math.max(0, e.target.value))}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Objetivo:</label>
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Condición médica:</label>
            <input
              type="text"
              value={condicionMedica}
              onChange={(e) => setCondicionMedica(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Guardando...' : (editAlumno.nombre ? 'Actualizar Alumno' : 'Agregar Alumno')}
          </button>
        </form>
      )}
    </div>
  );
};

export default AlumnoForm;
