import React from 'react'
import '../css/Inicio.css';
// import Fondo from '../images/fondo/fondo.png'
import { Link } from 'react-router-dom'

const Inicio = () => {
    return (
        <>
            <img src="http://192.168.100.248/img/fondo.jpg" alt="fondo" />
            <Link to="/main"><div id="btn_inicio" className="btn_circle btn_black">inicio</div></Link>
        </>
    )
}

export default Inicio
