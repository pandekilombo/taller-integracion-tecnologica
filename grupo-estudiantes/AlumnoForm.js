import React, { useEffect, useState } from 'react';
import './App.css'; // Importa los estilos CSS

const AlumnoForm = ({ onSubmit, editAlumno, setEditAlumno }) => {
  const [showHealthForm, setShowHealthForm] = useState(false); // Estado para controlar la visualización del formulario de salud

  // Estados para la información del alumno
  const [rut, setRut] = useState(editAlumno.rut || ''); // RUT del alumno
  const [nombre, setNombre] = useState(editAlunpmmno.nombre || ''); // Nombre del alumno
  const [apellido, setApellido] = useState(editAlumno.apellido || ''); // Apellido del alumno
  const [direccion, setDireccion] = useState(editAlumno.direccion || ''); // Dirección del alumno
  const [telefono, setTelefono] = useState(editAlumno.telefono || ''); // Teléfono del alumno
  const [correo, setCorreo] = useState(editAlumno.correo || ''); // Correo electrónico del alumno

  // Estados para la información de salud
  const [peso, setPeso] = useState(editAlumno.peso || ''); // Peso del alumno
  const [altura, setAltura] = useState(editAlumno.altura || ''); // Altura del alumno
  const [objetivo, setObjetivo] = useState(editAlumno.objetivo || ''); // Objetivo del alumno
  const [condicionMedica, setCondicionMedica] = useState(editAlumno.condicionMedica || ''); // Condición médica del alumno

  const [error, setError] = useState(''); // Estado para almacenar mensajes de error

  useEffect(() => {
    // Cargar los datos del alumno en los campos cuando el componente se monta o cuando editAlumno cambia
    setRut(editAlumno.rut || '');
    setNombre(editAlumno.nombre || '');
    setApellido(editAlumno.apellido || '');
    setDireccion(editAlumno.direccion || '');
    setTelefono(editAlumno.telefono || '');
    setCorreo(editAlumno.correo || '');
    
    // Cargar los datos de salud si existen
    setPeso(editAlumno.peso || '');
    setAltura(editAlumno.altura || '');
    setObjetivo(editAlumno.objetivo || '');
    setCondicionMedica(editAlumno.condicionMedica || '');
  }, [editAlumno]); // Dependencia en editAlumno

  // Función para validar el formulario
  const validateForm = () => {
    const rutPattern = /^[0-9]{1,8}-[0-9Kk]$/; // Patrón para validar el formato del RUT
    const phonePattern = /^[0-9]{9,12}$/; // Patrón para validar el formato del teléfono

    if (!rutPattern.test(rut)) {
      setError('El RUT debe tener el formato correcto, ej: 12345678-9'); // Mensaje de error para RUT
      return false;
    }
    if (!phonePattern.test(telefono)) {
      setError('El número de teléfono debe contener solo números y tener entre 9 y 12 dígitos'); // Mensaje de error para teléfono
      return false;
    }
    if (!correo.includes('@')) {
      setError('El correo debe ser válido'); // Mensaje de error para correo
      return false;
    }
    if (!nombre || !apellido || !direccion) {
      setError('Nombre, Apellido y Dirección son obligatorios'); // Mensaje de error para campos obligatorios
      return false;
    }
    if (peso < 0) {
      setError('El peso no puede ser negativo'); // Mensaje de error para peso
      return false;
    }
    if (altura < 0) {
      setError('La altura no puede ser negativa'); // Mensaje de error para altura
      return false;
    }
    
    setError(''); // Resetea el mensaje de error si todo está correcto
    return true; // Retorna true si la validación es exitosa
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (validateForm()) {
      // Enviar todos los datos del alumno y de salud
      onSubmit({
        rut,
        nombre,
        apellido,
        direccion,
        telefono,
        correo,
        peso: peso || '', // Se permite vacío
        altura: altura || '', // Se permite vacío
        objetivo,
        condicionMedica: condicionMedica || '', // Se permite vacío
      });

      // Limpiar los campos
      setEditAlumno({ // Resetea el estado de edición
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
      setShowHealthForm(false); // Oculta el formulario de salud
    }
  };

  const handleNextClick = () => {
    if (validateForm()) {
      setShowHealthForm(true); // Muestra el formulario de salud si la validación es exitosa
    }
  };

  return (
    <div className="form-container">
      <h2>{editAlumno.nombre ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
      {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error si existe */}

      {!showHealthForm ? ( // Si no se está mostrando el formulario de salud
        <form onSubmit={handleSubmit}>
          {/* Campos para la información del alumno */}
          <div className="form-group">
            <label>RUT:</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)} // Actualiza el estado del RUT
              pattern="^[0-9]{1,8}-[0-9Kk]$" // Patrón para el RUT
              title="Formato RUT: 12345678-9"
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Actualiza el estado del nombre
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)} // Actualiza el estado del apellido
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado de la dirección
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado del teléfono
              pattern="[0-9]{9,12}" // Patrón para el teléfono
              title="El número debe contener solo números (9-12 dígitos)"
              required
            />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo
              required
            />
          </div>
          <button type="button" onClick={handleNextClick} className="next-button">
            Siguiente {/* Botón para avanzar al formulario de salud */}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Datos de Salud</h2>
          {/* Campos para la información de salud */}
          <div className="form-group">
            <label>Peso (kg):</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(Math.max(0, e.target.value))} // Asegura que el peso no sea negativo
              min="0" // Previene ingresar números negativos
              required
            />
          </div>
          <div className="form-group">
            <label>Altura (cm):</label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(Math.max(0, e.target.value))} // Asegura que la altura no sea negativa
              min="0" // Previene ingresar números negativos
              required
            />
          </div>
          <div className="form-group">
            <label>Objetivo:</label>
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)} // Actualiza el estado del objetivo
              required
            />
          </div>
          <div className="form-group">
            <label>Condición Médica:</label>
            <input
              type="text"
              value={condicionMedica}
              onChange={(e) => setCondicionMedica(e.target.value)} // Actualiza el estado de la condición médica
            />
          </div>
          <button type="submit">Guardar Alumno</button> {/* Botón para guardar el alumno */}
          <button type="button" onClick={() => setShowHealthForm(false)} className="back-button">
            Volver {/* Botón para regresar al formulario inicial */}
          </button>
        </form>
      )}
    </div>
  );
};

export default AlumnoForm; // Exporta el componente AlumnoForm para usarlo en otras partes de la aplicación
