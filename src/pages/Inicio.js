import React, { useEffect, useState } from 'react'
import '../css/Inicio.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Inicio = ({ ip }) => {

    const [img, setImg] = useState(" ");

    useEffect(() => {
        const get_data = async () => {
            try {
                let image = await axios.get(`${ip}get_img`, { responseType: 'arraybuffer' });
                let raw = Buffer.from(image.data).toString('base64');
                let image_base64 = "data:" + image.headers["content-type"] + ";base64," + raw;
                setImg(image_base64);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip, img]);

    return (
        <>
            {/* <img src="http://192.168.100.248/img/fondo.jpg" alt="fondo" /> */}
            <img src={img} alt="fondo" />
            <Link to="/main"><div id="btn_inicio" className="btn_circle btn_black">inicio</div></Link>
        </>
    )
}

export default Inicio
