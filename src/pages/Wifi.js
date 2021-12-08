/* Página WiFi de de la GUI de control para transmisor mensajito.mx */
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/WiFi.css'
import axios from 'axios'

const Wifi = ({ ip }) => {

    const ssid = useRef(null);
    const password = useRef(null);

    const [wifis, setWifis] = useState([]);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState("0");
    const [texto, setTexto] = useState("");

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}get_wifi`);
                setWifis(response.data);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip]);

    useEffect(() => {
        console.log("estatus", status);
        if(status === 1) {
            setTexto("Conectado");
        }
        else if (status === 2) {
            setTexto("Error");
        }
    }, [status]);

    useEffect(() => {
        const conWiFi = (e) => {
            console.log("subiendo datos");
            let a = {
                "ssid": ssid.current.value,
                "password": password.current.value
            };
            const data_send = async (datos) => {
                try {
                    const response = await axios.post(`${ip}wifi`, datos);
                    console.log(response.data);
                    setStatus(response.data);
                }
                catch {
                    console.log("error");
                }
            }
            data_send(a);
        }
        if (load) {
            conWiFi();
            setLoad(false);
        }
    }, [ip, load]);

    const connect_wifi = () => {
        setLoad(true);
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/wifi</div>
            <label id="texto_1_wifi">SSID</label>
            <div>
                <select id="select_wifi" name="archivo" size="4" ref={ssid} multiple>
                    {wifis.map((wifi) => <option key={wifi.bssid} value={wifi.ssid}>{wifi.ssid}</option>)}
                </select>
            </div>
            <label id="texto_2_wifi">Contraseña</label>
            <input type="text" id="contrasena" name="contrasena" ref={password} />
            <div id="conectar_1" onClick={connect_wifi}>Conectar</div>
            <div id="conectado">{texto}</div>
        </>
    )
}

export default Wifi
