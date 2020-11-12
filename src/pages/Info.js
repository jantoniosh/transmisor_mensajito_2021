import React, { useState, useEffect } from 'react'
import '../css/Info.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Info = () => {
    const [Info, setInfo] = useState({
        "ip_eth0": "",
        "mac_eth0": "",
        "ip_wlan0": "",
        "mac_wlan0": "",
        "memoria": ""
    });
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get('http://192.168.100.248:3000/info')
                setInfo({
                    "ip_eth0": response.data.ip_eth0,
                    "mac_eth0": response.data.mac_eth0,
                    "ip_wlan0": response.data.ip_wlan0,
                    "mac_wlan0": response.data.mac_wlan0,
                    "memoria": response.data.memoria
                });
                console.log(response.data);
                setLoad(false);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [load]);

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/info</div>
            <div id="ip_eth0">IP Eth: {Info.ip_eth0}</div>
            <div id="mac_eth0">MAC Eth: {Info.mac_eth0}</div>
            <div id="ip_wlan0">IP WiFi: {Info.ip_wlan0}</div>
            <div id="mac_wlan0">MAC WiFi: {Info.mac_wlan0}</div>
            <div id="memoria">Memoria: {Info.memoria}</div>
            <div id="info_gen"><Link to="/info_gen">Ver más sobre mensajito.mx</Link></div>
        </>
    )
}

export default Info
