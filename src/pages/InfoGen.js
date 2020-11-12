import React from 'react'
import '../css/InfoGen.css'
import { Link } from 'react-router-dom'

const InfoGen = () => {
    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/<Link to="info"><span>info</span></Link>/general</div>
            <div id="mensaje_1">Mensajito, surge de la idea de crear puentes de comunicación libre, una
            opción económica para quienes quieran desarrollar una estación de radio
            por internet o una segunda línea de transmisión para quienes ya hacen
            radio por frecuencia. Busca generar comunidad a partir de
            contenidos auditivos dando la posibilidad de interconectar personas e
            intercambiar información, así como generar espacios libres de reflexión
            sobre tecnología.</div>
        </>
    )
}

export default InfoGen
