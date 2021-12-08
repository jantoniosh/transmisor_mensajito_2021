/* Página Imagenes de de la GUI de control para transmisor mensajito.mx */
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
    const [select, setSelect] = useState(false);

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
        if (Pos === "B") {
            get_data();
        }
    }, [ip, Pos]);

    useEffect(() => {
        const post_data = async () => {
            try {
                console.log(Imagen);
                const response = await axios.post(`${ip}snd_img`, Imagen);
                console.log(response.data);
                setSelect(false);
            }
            catch {
                console.log("error");
            }
        }
        if (select) {
            post_data();
        }
    }, [Imagen, select, ip]);

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

    const onClickVolver = () => {
        setPos("A");
        setImagen(" ");
    }

    const onChooseArchivo = (e) => {
        setImagen({
            nombre: e.target.value,
            tipo: tipoImagen
        });
    }

    const onClickSeleccion = (e) => {
        setSelect(true);
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
                    {select === false &&
                        <>
                            <div id="seleccionar" onClick={onClickSeleccion}>Seleccionar</div>
                        </>
                    }
                    {select === true &&
                        <>
                            <div id="status_carga">Cargando</div>
                        </>
                    }
                    <div id="volver" onClick={onClickVolver}>Volver</div>
                </>
            }
        </>
    )
}

export default Imagenes
