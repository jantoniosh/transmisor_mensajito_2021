import axios from 'axios';
import React from 'react'
import teclado from '../images/logos/teclado.png'

const Teclado = ({ ip }) => {

    const openTeclado = async () => {
        try {
            await axios.post(`${ip}teclado`);
        }
        catch {
            console.log("error");
        }
    }

    return (
        <>
            <img className="teclado" src={teclado} alt={teclado} onClick={openTeclado}></img>
        </>
    )
}

export default Teclado
