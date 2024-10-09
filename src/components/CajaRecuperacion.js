import "./Caja.css"
import React, {useState}from 'react'
import logo from '../logo.svg';
import {auth} from "./firebase"
import AuthPasswordRecovery from "../Auth/AuthPasswordRecovery"

console.log("loading")


export default (props) => {
  const [email, setEmail] = useState('');

  
  //para usar firebase en cada modulo lo llamamos



  const Recuperar = async(e) =>{

    e.preventDefault();
    try {
      //con await hacemos esperamos a que se cumpla la linea de codigo
      
      await AuthPasswordRecovery(auth,email)
      
  
      
    } catch (error) {
      console.log(error)     
      alert("Error al enviar correo de recuperación") 
    }
  } 
  
  return (
<div class="login">
	<h1>Recuperar Contraseña</h1>
  
  <img src={logo} className="App-logo" alt="logo" />
      <h3 className="textoplano">Se enviará a su correo una confirmación para cambiar su contraseña</h3>


    	<input type="email" name="u" placeholder="Correo" required="required" onChange={(ev) => setEmail(ev.target.value)} />
      <button onClick={Recuperar} class="btn btn-primary btn-block btn-large">Recuperar contraseña</button>
      <p></p>

    
</div>
  )
}