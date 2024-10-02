/*rafc */

import React, {useState} from 'react'

export const PrimerComponente = () => {
    //let Nombre= "Miguel";
    let Apellido= "El Papeador"

    const [Nombre,setNombre] = useState("Miguel");



    let Juegos=[
        'Gears of War',
        'God of war',
        'Call of Duty',
        'Return To Castle Wolfenstein'

    ]

    const cambiarNombre = (nuevoNombre) =>{

        setNombre(nuevoNombre);

    }

  return (
    <div>
        <h1>Presentación</h1>
        <p>Mi nombre es {Nombre}</p>
        <p>Mi apellido es {Apellido}</p>
        
        <button onClick={e => cambiarNombre("Miwel")}>Cambiar nombre</button>

        <h2>Lista de Juegos:</h2>

        

        <ul>
            { /* Iteración de la lista */
                Juegos.map((Juegos, indice) => {
                    return (<li key={indice}>{Juegos}</li>)


                })


            }

        </ul>



        </div>
  )
}
