/* Página Inicio de de la GUI de control para transmisor mensajito.mx */
import React, { useEffect, useState } from 'react'
import '../css/Inicio.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Inicio = ({ ip }) => {

    const [img, setImg] = useState(" ");
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const get_img = async () => {
            try {
                let image = await axios.get(`${ip}get_img`, { responseType: 'arraybuffer' });
                let raw = Buffer.from(image.data).toString('base64');
                let image_base64 = "data:" + image.headers["content-type"] + ";base64," + raw;
                setImg(image_base64);
                setLoad(true);
            }
            catch {
                console.log("error");
            }
        }
        if (!load) {
            get_img();
        }
    }, [ip, img, load]);

    return (
        <>  
            {load ? <><img className="image" src={img} alt="fondo" /></> : <></>}
            <Link to="/main"><div id="btn_inicio" className="btn_circle btn_black">inicio</div></Link>
        </>
    )
}

export default Inicio
