import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Programas.css'

const Programas = () => {
    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/programa</div>
            <div id="texto_1_p">Selecciona</div>
            <div id="texto_2_p">un programa</div>
            <div id="agregar_1"><Link to="/agregar_pro">Agregar Programa</Link></div>
            <div id="eliminar_1"><Link to="/eliminar_pro">Eliminar Programa</Link></div>
            <div>
                <select id="select_1" name="programa" multiple>
                </select>
            </div>
        </>
    )
}

export default Programas
