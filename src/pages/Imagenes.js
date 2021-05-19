import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Imagenes.css'

const Imagenes = ({ ip, socket }) => {
    const [Pos, setPos] = useState("A");
    const [tipoImagen, setTipoImagen] = useState(" ");
    const [load, setLoad] = useState(false);
    const [archivos, setArchivos] = useState([]);
    const [Imagen, setImagen] = useState({
        nombre: "",
        tipo: tipoImagen
    });

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}usb_files`);
                setArchivos(response.data);
                setLoad(false);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [load, ip]);

    useEffect(() => {
        const send_socket = async () => {
            try {
                socket.emit('imagen', Imagen);
            }
            catch {
                console.log("error");
            }
        }
        send_socket();
    }, [socket, Imagen]);

    const changeTransmisor = () => {
        setPos("B");
        setTipoImagen("Imagen Transmisor");
        setLoad(true);
    }

    const changePlataforma = () => {
        setPos("B");
        setTipoImagen("Imagen Plataforma");
        setLoad(true);
    }

    const changeHeader = () => {
        setPos("B");
        setTipoImagen("Imagen Header");
        setLoad(true);
    }

    const changeSeleccion = () => {
        setPos("A");
        setImagen(" ");
    }
    const onChooseArchivo = (e) => {
        setImagen({
            nombre: e.target.value,
            tipo: tipoImagen
        });
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/<Link to="/config"><span>configuración</span></Link>/imagen</div>
            {Pos === "A" &&
                <>
                    <div className="c_1" onClick={changeTransmisor}>Imagen Transmisor (480x320)</div>
                    <div className="c_2" onClick={changePlataforma}>Imagen Plataforma (600x600)</div>
                    <div className="c_3" onClick={changeHeader}>Imagen Header (3369x1196)</div>
                </>
            }
            {Pos === "B" &&
                <>
                    <div className="c_1">{tipoImagen}</div>
                    <div>
                        <select id="select_archivo" name="archivo" onChange={onChooseArchivo} multiple>
                            {archivos.map((archivo) => <option key={archivo} value={archivo}>{archivo}</option>)}
                        </select>
                    </div>
                    <div className="c_4" onClick={changeSeleccion}>Volver</div>
                </>
            }
        </>
    )
}

export default Imagenes
