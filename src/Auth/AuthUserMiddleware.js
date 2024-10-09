import { signInWithEmailAndPassword} from "firebase/auth";

import swal from "sweetalert2"


const userLoginAuth = async (auth, email, password) => {

    try {
        await signInWithEmailAndPassword(auth,email,password);
        const user=auth.currentUser;
        //console.log(user);
        
        console.log("Logeado con exito");
        alert("Logeado con éxito");
    } catch (error) {

        alert("Datos ingresados invalidos");
    }


}


export default userLoginAuth;

