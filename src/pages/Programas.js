import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../css/Programas.css'

const Programas = ({ ip }) => {
    const [programas, setProgramas] = useState([]);

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}programas`);
                setProgramas(response.data);
                console.log(response.data);
                setLoad(false);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [load, ip]);

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/programa</div>
            <div id="texto_1_p">Selecciona</div>
            <div id="texto_2_p">un programa</div>
            <div id="agregar_1"><Link to="/agregar_pro">Agregar Programa</Link></div>
            <div id="eliminar_1"><Link to="/eliminar_pro">Eliminar Programa</Link></div>
            <div>
                <select id="select_1" name="programa" multiple>
                    {programas.map((programa) => <option key={programa.nombre} value={programa.nombre}>{programa.nombre}</option>)}
                </select>
            </div>
        </>
    )
}

export default Programas
