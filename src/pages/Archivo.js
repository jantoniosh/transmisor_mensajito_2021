import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Archivo.css'

const Archivo = ({ ip, socket }) => {
    const [Accion, setAccion] = useState('');
    const [Pos, setPos] = useState("A");
    const [Audio, setAudio] = useState({
        nombre: "",
        tipo: Accion
    });

    const [envio, setEnvio] = useState(false);

    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        const get_data = async () => {
            try {
                if (Pos === 'B') {
                    const response = await axios.get(`${ip}usb_files_audio`);
                    setArchivos(response.data);
                }
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [Accion, Pos, ip]);

    useEffect(() => {
        const send_socket = async () => {
            if (envio) {
                try {
                    await axios.post(`${ip}audio`, Audio)
                    setEnvio(false);
                }
                catch {
                    console.log("error");
                }
            }
        }
        send_socket();
    }, [ip, envio, Audio]);

    const selectDescargar = () => {
        setPos("B");
        setAccion('Descargar');
    }

    const selectEliminar = () => {
        setPos("B");
        setAccion('Eliminar');
    }

    const selectVolver = () => {
        setPos("A");
        setAccion('');
    }

    const onChooseArchivo = (e) => {
        setAudio({
            nombre: e.target.value,
            tipo: Accion
        });
    }

    const onClickAccion = () => {
        setEnvio(true);
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/archivo</div>
            {Pos === "A" &&
                <>
                    <div className="c_1" onClick={selectDescargar}>Descargar Archivo</div>
                    <div className="c_2" onClick={selectEliminar}>Eliminar Archivo</div>
                </>
            }
            {Pos === "B" &&
                <>
                    <div className="c_1">{Accion}</div>
                    <div>
                        <select id="select_archivo" name="archivo" onChange={onChooseArchivo} multiple>
                            {archivos.map((archivo) => <option key={archivo} value={archivo}>{archivo}</option>)}
                        </select>
                    </div>
                    <div className="c_4" onClick={selectVolver}>Volver</div>
                    <div className="c_5" onClick={onClickAccion}>{Accion}</div>
                </>
            }
        </>
    )
}

export default Archivo
