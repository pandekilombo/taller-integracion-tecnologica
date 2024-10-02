import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CajaLogin from './components/CajaLogin';
import CajaRegistro from './components/CajaRegistro';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Horarios from './components/Horarios';
import Clases from './components/Clases';
import { auth } from './components/firebase'; // Asegúrate de tener la autenticación correctamente importada

function App() {
  const [user, setUser] = useState(null); // Estado para manejar el usuario autenticado

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

  return (
    <Router>
      <div className="App">
        {/* Define las rutas */}
        <Routes>
          <Route path="/" element={<CajaLogin />} />
          <Route path="/registro" element={<CajaRegistro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/clases" element={<Clases />} />
        </Routes>

        {/* Muestra los botones de inicio de sesión y registro solo si el usuario no está autenticado */}
        {!user && (
          <div className="ContenedorBotonesInicio">
            <Link to="/" className="boton-registro">Iniciar Sesión</Link>
            <Link to="/registro" className="boton-registro">Registrar</Link>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
