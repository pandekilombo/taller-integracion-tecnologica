import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Instala este paquete con `npm install react-calendar` \\ npm install react-calendar \\ eso 

import 'react-calendar/dist/Calendar.css'; // Asegúrate de importar los estilos

import { Link } from 'react-router-dom';  //   npm install react-router-dom   //   Instala este paquete con

import './Home.css'; // Asegúrate de que esta hoja de estilos esté creada

const Home = () => {
    const [date, setDate] = useState(new Date());
    
    // Simulación de clases en ciertas fechas
    const classes = [
      { date: '2024-09-27', time: '8:00 - 9:30 am', name: 'Spinning', instructor: 'Luis Arriagada' },
      { date: '2024-09-27', time: '10:00 - 11:30 am', name: 'Levantamiento de pesas', instructor: 'Roberto Díaz' }
    ];
  
    const selectedClasses = classes.filter(c => c.date === date.toISOString().split('T')[0]);
  
    return (
      <div className="home">
        <h1>Bienvenido al Sistema de Gestión de Clases</h1>
  
        {/* Botones de navegación */}
        <div className="nav-buttons">
          <Link to="/estudiantes" className="btn">Estudiantes</Link>
          <Link to="/horarios" className="btn">Horarios</Link>
          <Link to="/clases" className="btn">Clases</Link>
        </div>
  
        <h2>Selecciona una fecha y hora</h2>
        <Calendar onChange={setDate} value={date} />
        
        <div className="itinerary">
          {selectedClasses.length > 0 ? (
            selectedClasses.map((classItem, index) => (
              <div key={index} className="class-item">
                <h3>{classItem.time}</h3>
                <p>{classItem.name}, {classItem.instructor}</p>
              </div>
            ))
          ) : (
            <p>No hay clases disponibles para esta fecha.</p>
          )}
        </div>
      </div>
    );
  }
  
  export default Home;