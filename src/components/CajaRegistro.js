import "./Caja.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import logo from '../logo.svg';
import { auth } from "./firebase";
import userRegisterAuth from "../Auth/AuthRegisterMiddleware";

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializamos useNavigate

  const submit = async (e) => {
    e.preventDefault();
    try {
      // Intentamos registrar al usuario
      await userRegisterAuth(auth, email, password);
      // Redirigimos al usuario a la página de Home tras un registro exitoso
      navigate('/home'); 
    } catch (error) {
      console.log(error);
      alert("Error al registrar en la página");
    }
  }

  return (
    <div className="login">
      <h1>Registrar</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <input 
        type="email" 
        name="u" 
        placeholder="Correo" 
        required="required" 
        onChange={(ev) => setEmail(ev.target.value)} 
      />
      <input 
        type="password" 
        name="p" 
        placeholder="Contraseña" 
        required="required" 
        onChange={(ev) => setPassword(ev.target.value)} 
      />
      <button onClick={submit} className="btn btn-primary btn-block btn-large">
        Registrar
      </button>
    </div>
  );
}
