import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/WiFi.css'
import axios from 'axios'

const Wifi = ({ ip }) => {
    const [Datos, setDatos] = useState({
        "ssid": "",
        "password": ""
    });

    const onChangeSSID = (e) => {
        setDatos({ ...Datos, "ssid": e.target.value });
    }

    const onChangePass = (e) => {
        setDatos({ ...Datos, "password": e.target.value });
    }

    const connect_wifi = (e) => {
        console.log("subiendo datos");
        const data_send = async () => {
            try {

                await axios.post(`${ip}wifi`, Datos)
                    .then(res => {
                        console.log(res.data);
                    });
            }
            catch {
                console.log("error");
            }
        }
        data_send();
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/wifi</div>
            <label id="texto_1">SSID</label>
            <input type="text" className="c_1" id="wifi" name="wifi" value={Datos.ssid} onChange={onChangeSSID} />
            <label id="texto_2">Contraseña</label>
            <input type="text" className="c_2" id="contrasena" name="contrasena" value={Datos.password} onChange={onChangePass} />
            <div id="conectar_1" onClick={connect_wifi}>Conectar</div>
        </>
    )
}

export default Wifi
