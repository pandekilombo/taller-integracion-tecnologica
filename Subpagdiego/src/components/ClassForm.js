// src/components/ClassForm.js
import React, { useState, useEffect } from 'react';
import './ClassForm.css'; // Asegúrate de importar el CSS

const ClassForm = ({ onSave, editClass }) => {
  const [nombreClase, setNombreClase] = useState('');
  const [cupoClase, setCupoClase] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  useEffect(() => {
    if (editClass) {
      setNombreClase(editClass.nombre_clase);
      setCupoClase(editClass.cupo_clase);
      setDescripcion(editClass.descripcion);
      setFecha(editClass.Fecha);
      setHoraInicio(editClass.hora_inicio);
      setHoraFin(editClass.hora_fin);
    } else {
      setNombreClase('');
      setCupoClase('');
      setDescripcion('');
      setFecha('');
      setHoraInicio('');
      setHoraFin('');
    }
  }, [editClass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nombre_clase: nombreClase, cupo_clase: cupoClase, descripcion, Fecha: fecha, hora_inicio: horaInicio, hora_fin: horaFin });
    // Reiniciar el formulario después de guardar
    setNombreClase('');
    setCupoClase('');
    setDescripcion('');
    setFecha('');
    setHoraInicio('');
    setHoraFin('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container"> {/* Añadir clase para centrar */}
      <input
        className="input-field" // Clase CSS añadida
        type="text"
        placeholder="Nombre de la clase"
        value={nombreClase}
        onChange={(e) => setNombreClase(e.target.value)}
        required
      />
      <input
        className="input-field" // Clase CSS añadida
        type="number"
        placeholder="Cupo de la clase"
        value={cupoClase}
        onChange={(e) => setCupoClase(e.target.value)}
        required
      />
      <textarea
        className="input-field" // Clase CSS añadida
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        className="input-field" // Clase CSS añadida
        type="text"
        placeholder="Fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        className="input-field" // Clase CSS añadida
        type="text"
        placeholder="Hora de Inicio"
        value={horaInicio}
        onChange={(e) => setHoraInicio(e.target.value)}
        required
      />
      <input
        className="input-field" // Clase CSS añadida
        type="text"
        placeholder="Hora de Fin"
        value={horaFin}
        onChange={(e) => setHoraFin(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">{editClass ? 'Actualizar Clase' : 'Agregar Clase'}</button> {/* Añadir clase para el botón */}
    </form>
  );
};

export default ClassForm;
