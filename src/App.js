import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CajaLogin from './components/CajaLogin';
import CajaRegistro from './components/CajaRegistro';
import CajaRecuperacion from './components/CajaRecuperacion';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Horarios from './components/Horarios';
import Clases from './components/Clases';
import { auth } from './components/firebase'; // Asegúrate de tener la autenticación correctamente importada

function App() {
  const [user, setUser] = useState(null); // Estado para manejar el usuario autenticado

    // Estado para controlar qué componente mostrar
    const [currentView, setCurrentView] = useState('login');

  const handleRegisterClick = () => {
    setCurrentView('registro'); // Cambia a CajaRegistro
  };

  const handleRecoverClick = () => {
    setCurrentView('recuperacion'); // Cambia a CajaRecuperacion
  };

  const handleLoginClick = () => {
    setCurrentView('login'); // Regresa a CajaLogin
  };

     
//<button onClick={handleRecoverClick} className="boton-registro">Recuperar</button>  

    return () => unsubscribe(); // Limpia la suscripción cuando se desmonta el componente
  }, []);

  return (
    <div className="App">
      {currentView === 'login' && <CajaLogin />}
      {currentView === 'registro' && <CajaRegistro />}
      {currentView === 'recuperacion' && <CajaRecuperacion />} 
      
        


      <p></p>
      
      <div class="ContenedorBotonesInicio login">
        
        
        <button onClick={handleLoginClick} className="boton-registro">Iniciar Sesión</button>
        <button onClick={handleRegisterClick} className="boton-registro">Registrarse</button>
        <button onClick={handleRecoverClick} className="boton-registro">Recuperar contraseña</button>  

        
      </div>          
       
      

    </div>
  );
}

export default App;
