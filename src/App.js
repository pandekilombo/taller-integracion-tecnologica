//import logo from './logo.svg';
import './App.css';
//import { PrimerComponente } from './components/PrimerComponente';
//import { SegundoComponente } from './components/SegundoComponente';
import CajaLogin from './components/CajaLogin';
import CajaRegistro from './components/CajaRegistro';
//import CajaLogin from './components/CajaLogin';
import React, {useState}from 'react'


function App() {

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
//{currentView === 'recuperacion' && <CajaRecuperacion />}    
//<button onClick={handleRecoverClick} className="boton-registro">Recuperar</button>  


  return (
    <div className="App">
      {currentView === 'login' && <CajaLogin />}
      {currentView === 'registro' && <CajaRegistro />}
      
      
        


      <p></p>
      
      <div class="ContenedorBotonesInicio login">
        
        
        <button onClick={handleLoginClick} className="boton-registro">Iniciar Sesión</button>
        <button onClick={handleRegisterClick} className="boton-registro">Registrar</button>

        
      </div>          
       
      

    </div>
  );
}

export default App;
