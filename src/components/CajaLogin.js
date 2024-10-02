import "./Caja.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import Swal from 'sweetalert2'; // Para mostrar alertas
import logo from '../logo.svg';
import { auth } from "./firebase";
import userLoginAuth from "../Auth/AuthUserMiddleware";

const CajaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const Iniciar = async (e) => {
    e.preventDefault();
    try {
      await userLoginAuth(auth, email, password);
      Swal.fire('Login exitoso', 'Has iniciado sesión correctamente', 'success');
      navigate('/home'); // Redirige a la página de inicio después del login exitoso
    } catch (error) {
      console.error("Error al conectarse con la página", error);
      Swal.fire('Error', 'El correo o la contraseña son incorrectos', 'error');
    }
  };

  return (
    <div className="login">
      <h1>Iniciar Sesión</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <input 
        type="email" 
        placeholder="Correo" 
        required 
        onChange={(ev) => setEmail(ev.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        required 
        onChange={(ev) => setPassword(ev.target.value)} 
      />
      <button onClick={Iniciar} className="btn btn-primary btn-block btn-large">
        Iniciar sesión
      </button>
    </div>
  );
};

export default CajaLogin;
