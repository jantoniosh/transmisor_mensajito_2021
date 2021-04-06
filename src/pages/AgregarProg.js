import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/AgrePro.css'
import axios from 'axios'

const AgregarProg = ({ ip }) => {
    const [Datos, setDatos] = useState({
        "nombre": ""
    });
    const [Pos, setPos] = useState("A");

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
                setPos("B");
            }
            catch {
                console.log("error");
            }
        }
        data_send();
    }

    const volver = () => {
        setPos("A");
        setDatos({ ...Datos, "nombre": "" });
    }
    

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/<Link to="/main"><span>programa</span></Link>/agregar</div>
            {Pos === "A" &&
                <>
                    <label id="texto_1">Nombre del Programa</label>
                    <input type="text" id="n_pro" name="n_pro" value={Datos.nombre} onChange={onChangeNombre} />
                    <div id="nombre_1" onClick={agrePro}>agregar</div>
                </>
            }
            {Pos === "B" &&
                <>
                    <label id="texto_1">Programa Agregado</label>
                    <label id="texto_2">{Datos.nombre}</label>
                    <div id="nombre_1" onClick={volver}>volver</div>
                </>
            }
        </>
    )
}

export default AgregarProg
