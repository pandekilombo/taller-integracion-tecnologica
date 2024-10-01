import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Asegúrate de tener la configuración de Firebase aquí
import { ref, set, onValue } from 'firebase/database';
import AlumnoForm from './AlumnoForm'; // Asegúrate de que esta importación sea correcta

function App() {
    const [alumnos, setAlumnos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
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
        const alumnosRef = ref(db, 'Usuarios/');
        onValue(alumnosRef, (snapshot) => {
            const data = snapshot.val();
            const alumnosList = [];

            for (let id in data) {
                alumnosList.push({ id, ...data[id] });
            }
            setAlumnos(alumnosList);
        });
    }, []);

    const handleFormSubmit = (alumno) => {
        const alumnosRef = ref(db, 'Usuarios/');
        set(ref(alumnosRef, alumno.rut), alumno)
            .then(() => {
                console.log('Alumno agregado/actualizado correctamente.');
                resetForm();
            })
            .catch((error) => {
                console.error('Error al agregar el alumno: ', error);
            });
    };

    const resetForm = () => {
        setEditAlumno({
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
                            <p>
                                <strong>Peso:</strong> {alumno.peso} kg, 
                                <strong> Altura:</strong> {alumno.altura} cm, 
                                <strong> Objetivo:</strong> {alumno.objetivo}, 
                                <strong> Condición Médica:</strong> {alumno.condicionMedica}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
