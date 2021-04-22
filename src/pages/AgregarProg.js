import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/AgrePro.css'
import axios from 'axios'

const AgregarProg = ({ ip }) => {

    const nombre = useRef(null);

    const [Datos, setDatos] = useState({
        "nombre": ""
    });
    const [Pos, setPos] = useState("A");

    const agrePro = (e) => {
        let a = {nombre: nombre.current.value};
        console.log("Datos:", a);
        const data_send = async (datos) => {
            console.log(datos);
            try {
                await axios.post(`${ip}programa`, datos)
                    .then(res => {
                        console.log("Datos Arriba");
                    });
                console.log("ok");
                setDatos(datos);
                setPos("B");
            }
            catch {
                console.log("error");
            }
        }
        data_send(a);
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
                    <input type="text" ref={nombre} id="n_pro" name="n_pro"/>
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
