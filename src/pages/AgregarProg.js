import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/AgrePro.css'
import axios from 'axios'

const AgregarProg = ({ ip }) => {
    const [Datos, setDatos] = useState({
        "nombre": ""
    });

    const onChangeNombre = (e) => {
        setDatos({ ...Datos, "nombre": e.target.value });
    }

    const agrePro = (e) => {
        console.log("subiendo programa");
        const data_send = async () => {
            try {

                await axios.post(`${ip}programa`, Datos)
                    .then(res => {
                        console.log("Datos Arriba");
                    });
                console.log("ok");
            }
            catch {
                console.log("error");
            }
        }
        data_send();
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/<Link to="programas"><span>programa</span></Link>/agregar</div>
            <label id="texto_1">Nombre del Programa</label>
            <input type="text" id="n_pro" name="n_pro" value={Datos.nombre} onChange={onChangeNombre} />
            <div id="nombre_1" onClick={agrePro}>agregar</div>
        </>
    )
}

export default AgregarProg
