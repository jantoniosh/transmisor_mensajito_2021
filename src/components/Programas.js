import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Programas = ({parentCallback, ip}) => {
    const [programas, setProgramas] = useState([]);

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}programas`);
                setProgramas(response.data);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip]);

    const onChooseProgram = (e) => {
        parentCallback(e.target.value);
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/transmitir</div>
            <div id="texto_1_p">Selecciona un programa</div>
            <div id="agregar_1"><Link to="/agregar_pro">Agregar Programa</Link></div>
            <div id="eliminar_1"><Link to="/eliminar_pro">Eliminar Programa</Link></div>
            <div>
                <select id="select_1" name="programa" onChange={onChooseProgram} multiple>
                    {programas.map((programa) => <option key={programa.nombre} value={programa.nombre}>{programa.nombre}</option>)}
                </select>
            </div>
        </>
    )
}

export default Programas
