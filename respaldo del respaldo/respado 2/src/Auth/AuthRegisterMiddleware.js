import { createUserWithEmailAndPassword} from "firebase/auth";

import swal from "sweetalert"


const userRegisterAuth = async (auth, email, password) =>{
    try {
        await createUserWithEmailAndPassword(auth,email,password);
    } catch (error) {
        alert("Error al ingresar los datos")
    }


}

export default userRegisterAuth;