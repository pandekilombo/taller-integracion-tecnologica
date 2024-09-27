import "./CajaLogin.css"
import React, {useState}from 'react'
import logo from '../logo.svg';
import {auth} from "./firebase"
import userRegisterAuth from "../Auth/AuthRegisterMiddleware"

console.log("loading")


export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //para usar firebase en cada modulo lo llamamos



  const submit = async(e) =>{

    e.preventDefault();
    try {
      //con await hacemos esperamos a que se cumpla la linea de codigo
      
      await userRegisterAuth(auth,email,password)
      
  
      
    } catch (error) {
      console.log(error)     
      alert("Error al registrar en la pagina") 
    }
  } 
  
  return (
<div class="login">
	<h1>Registrar</h1>
  
  <img src={logo} className="App-logo" alt="logo" />
    
    	<input type="email" name="u" placeholder="Correo" required="required" onChange={(ev) => setEmail(ev.target.value)} />
      <input type="password" name="p" placeholder="Contraseña" required="required" onChange={(ev) => setPassword(ev.target.value)} />
      <button onClick={submit} class="btn btn-primary btn-block btn-large">Registrar</button>
    
</div>
  )
}