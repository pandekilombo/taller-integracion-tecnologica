import { createUserWithEmailAndPassword} from "firebase/auth";

import swal from "sweetalert2"


const userRegisterAuth = async (auth, email, password) =>{
    try {
        await createUserWithEmailAndPassword(auth,email,password);
        alert("Registrado con éxito")
    } catch (error) {
        alert("Error al ingresar los datos")
    }


}

export default userRegisterAuth;