import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

    // State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // State de validación del Form
    const [error, actualizarError] = useState(false);

    // Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);
        
        // Asignar un ID
        cita.id= uuidv4();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    value={mascota}
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    value={propietario}
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    value={fecha}
                    className="u-full-width"
                    onChange={actualizarState}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    value={hora}
                    className="u-full-width"
                    onChange={actualizarState}
                />

                <label>Síntomas</label>
                <textarea 
                    className="u-full-width"
                    name="sintomas"
                    value={sintomas}
                    onChange={actualizarState}
                ></textarea>

                <button 
                    type="submit" 
                    className="u-full-width button-primary"
                >
                Agregar Cita
                </button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;