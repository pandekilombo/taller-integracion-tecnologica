import "./CajaLogin.css"
import React, {useState}from 'react'
import logo from '../logo.svg';
export const CajaLogin = () => {
  return (
<div class="login">
	<h1>Login</h1>
  
  <img src={logo} className="App-logo" alt="logo" />
    <form method="post">
    	<input type="text" name="u" placeholder="Usuario" required="required" />
        <input type="password" name="p" placeholder="Contraseña" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large">Iniciar Sesión</button>
    </form>
</div>
  )
}
