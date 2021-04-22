import React, { useRef} from 'react'
import { Link } from 'react-router-dom'
import '../css/WiFi.css'
import axios from 'axios'

const Wifi = ({ ip }) => {

    const ssid = useRef(null);
    const password = useRef(null);

    const connect_wifi = (e) => {
        console.log("subiendo datos");
        let a = {
            "ssid": ssid.current.value,
            "password": password.current.value
        };
        const data_send = async (datos) => {
            try {

                await axios.post(`${ip}wifi`, datos)
                    .then(res => {
                        console.log(res.data);
                    });
            }
            catch {
                console.log("error");
            }
        }
        data_send(a);
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/wifi</div>
            <label id="texto_1_wifi">SSID</label>
            <input type="text" className="c_1" name="wifi" ref={ssid} />
            <label id="texto_2_wifi">Contraseña</label>
            <input type="text" className="c_2" id="contrasena" name="contrasena" ref={password} />
            <div id="conectar_1" onClick={connect_wifi}>Conectar</div>
        </>
    )
}

export default Wifi
