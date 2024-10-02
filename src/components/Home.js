import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Instala este paquete con `npm install react-calendar`
import 'react-calendar/dist/Calendar.css'; // Asegúrate de importar los estilos
import Swal from 'sweetalert2'; // Para las alertas    npm install sweetalert2

import { Link, useNavigate } from 'react-router-dom';  // Agrega useNavigate a la importación
import { auth } from './firebase'; // Asegúrate de tener la autenticación configurada con Firebase
import './Home.css'; // Asegúrate de que esta hoja de estilos esté creada

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null); // Estado para manejar el usuario autenticado
  const navigate = useNavigate(); // Hook para redirigir después del logout

  // useEffect para escuchar el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Si el usuario está autenticado, guardamos el usuario
      } else {
        setUser(null); // Si no está autenticado, el usuario es null
      }
    });

    return () => unsubscribe(); // Limpia la suscripción cuando se desmonta el componente
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/'); // Redirige a la página de login después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <div className="home">
      <h1>Bienvenido al Sistema de Gestión de Clases</h1>

      {/* Botón de Cerrar Sesión */}
      {user && (
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      )}

      {/* Botones de navegación */}
      <div className="nav-buttons">
        <Link to="/estudiantes" className="btn">Estudiantes</Link>
        <Link to="/horarios" className="btn">Horarios</Link>
        <Link to="/clases" className="btn">Clases</Link>
      </div>

      <h2>Selecciona una fecha y hora</h2>
      <Calendar onChange={setDate} value={date} />

      <div className="itinerary">
        <p>No hay clases disponibles para esta fecha.</p>
      </div>

      {/* Solo muestra los botones de Iniciar Sesión y Registrar si el usuario NO está autenticado */}
      {!user && (
        <div className="ContenedorBotonesInicio">
          <Link to="/login" className="btn">Iniciar Sesión</Link>
          <Link to="/registro" className="btn">Registrar</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
