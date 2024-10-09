import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Asegúrate de importar correctamente
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Importa Firestore
import AlumnoForm from './AlumnoForm';

const App = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [editAlumno, setEditAlumno] = useState({
        rut: '',
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        correo: '',
        peso: '',
        altura: '',
        objetivo: '',
        condicionMedica: '',
    });

    useEffect(() => {
        const fetchAlumnos = async () => {
            const alumnosCollection = collection(db, 'Usuarios'); // Cambia aquí si estás usando otra colección
            const alumnosSnapshot = await getDocs(alumnosCollection);
            const alumnosList = alumnosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAlumnos(alumnosList);
        };

        fetchAlumnos();
    }, []);

    const handleFormSubmit = async (alumno) => {
        try {
            await addDoc(collection(db, 'Usuarios'), alumno);
            console.log('Alumno agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar el alumno: ', error);
        }
    };

    return (
        <div className="App">
            <h1>Registro de Alumnos</h1>
            <AlumnoForm 
                onSubmit={handleFormSubmit} 
                editAlumno={editAlumno} 
                setEditAlumno={setEditAlumno} 
            />
            <h2>Alumnos Registrados</h2>
            <div className="alumnos-list">
                {alumnos.length === 0 ? (
                    <p>No hay alumnos registrados.</p>
                ) : (
                    alumnos.map((alumno) => (
                        <div key={alumno.id} className="alumno-item">
                            <p>
                                <strong>RUT:</strong> {alumno.rut}, 
                                <strong> Nombre:</strong> {alumno.nombre}, 
                                <strong> Apellido:</strong> {alumno.apellido}, 
                                <strong> Dirección:</strong> {alumno.direccion}, 
                                <strong> Teléfono:</strong> {alumno.telefono}, 
                                <strong> Correo:</strong> {alumno.correo}
                            </p>
                            <button onClick={() => setEditAlumno(alumno)}>Editar</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
