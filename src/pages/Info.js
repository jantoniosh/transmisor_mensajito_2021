/* Página Info de de la GUI de control para transmisor mensajito.mx */
import React, { useState, useEffect } from 'react'
import '../css/Info.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Info = ({ ip }) => {
    const [Info, setInfo] = useState({
        "ip_eth0": "",
        "mac_eth0": "",
        "ip_wlan0": "",
        "mac_wlan0": "",
        "link": "",
        "memoria": ""
    });

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}info`);
                setInfo({
                    "ip_eth0": response.data.ip_eth0,
                    "mac_eth0": response.data.mac_eth0,
                    "ip_wlan0": response.data.ip_wlan0,
                    "mac_wlan0": response.data.mac_wlan0,
                    "link": response.data.link,
                    "memoria": response.data.memoria
                });
                console.log(response.data);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip]);

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/info</div>
            <div id="ip_eth0">IP Eth: {Info.ip_eth0}</div>
            <div id="mac_eth0">MAC Eth: {Info.mac_eth0}</div>
            <div id="ip_wlan0">IP WiFi: {Info.ip_wlan0}</div>
            <div id="mac_wlan0">MAC WiFi: {Info.mac_wlan0}</div>
            <div id="link_titulo">Link de Transmisión:</div>
            <div id="link">{Info.link}</div>
            <div id="memoria">Memoria: {Info.memoria}</div>
            <div id="info_gen"><Link to="/info_gen">Ver más sobre mensajito.mx</Link></div>
        </>
    )
}

export default Info
