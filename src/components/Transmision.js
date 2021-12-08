// Componente Transmision de la GUI de control para transmisor mensajito.mx
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Transmision = ({ nombre, ip }) => {

    const [datos, setDatos] = useState({
        "estacion": "",
        "ubicacion": "",
        "nombre": nombre
    });

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}config`);
                setDatos({
                    "estacion": response.data.nombre,
                    "ubicacion": response.data.ubicacion,
                    "nombre": nombre
                });
                setLoad(false);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [load, ip, nombre]);
    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/transmitir</div>
            <div id="programa_1">{datos.nombre}</div>
            <div id="ubicacion">{datos.ubicacion}</div>
            <div id="estacion">{datos.estacion}</div>
        </>
    )
}

export default Transmision
