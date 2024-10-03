import { sendPasswordResetEmail } from "firebase/auth";

import swal from "sweetalert"


const AuthPasswordRecovery = async (auth, email) => {

    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      console.log("Enviado con éxito");
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });


}


export default AuthPasswordRecovery;
