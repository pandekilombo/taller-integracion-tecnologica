import "./Caja.css"
import React, {useState}from 'react'
import logo from '../logo.svg';
import {auth} from "./firebase"
import userLoginAuth from "../Auth/AuthUserMiddleware"



export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //para usar firebase en cada modulo lo llamamos


  

 
  const Iniciar = async(e) =>{

    e.preventDefault();
    try {
      //con await hacemos esperamos a que se cumpla la linea de codigo
      await userLoginAuth(auth,email,password);
      
      
    } catch (error) {
      console.log(error)      
      console.log("Error al conectarse con la pagina")
    }
  } 
  
  return (
<div class="login">
	<h1>Iniciar Sesión</h1>
  
  <img src={logo} className="App-logo" alt="logo" />
    
    	<input type="email" name="u" placeholder="Correo" required="required" onChange={(ev) => setEmail(ev.target.value)} />
        <input type="password" name="p" placeholder="Contraseña" required="required" onChange={(ev) => setPassword(ev.target.value)} />
        <button onClick={Iniciar} class="btn btn-primary btn-block btn-large">Iniciar Sesión</button>
        <p></p>
      
        
</div>
  )
}