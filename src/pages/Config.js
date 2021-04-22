import React, { useState, useEffect, useRef } from 'react'
import '../css/Config.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Config = ({ ip }) => {
    const [Datos, setDatos] = useState({
        "nombre": "mensajito",
        "ubicacion": "mensajito",
        "descripcion": "mensajito",
        "facebook": "mensajito",
        "instagram": "mensajito",
        "twitter": "mensajito",
        "mixcloud": "mensajito",
        "web": "mensajito",
        "tags": "mensajito",
    });
    const [Pos, setPos] = useState("A");

    const referencia = {
        "nombre": useRef(null),
        "ubicacion": useRef(null),
        "descripcion": useRef(null),
        "facebook": useRef(null),
        "instagram": useRef(null),
        "twitter": useRef(null),
        "mixcloud": useRef(null),
        "web": useRef(null),
        "tags": useRef(null)
    }

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}config`);
                setDatos({
                    "nombre": response.data.nombre,
                    "ubicacion": response.data.ubicacion,
                    "descripcion": response.data.descripcion,
                    "facebook": response.data.facebook,
                    "instagram": response.data.instagram,
                    "twitter": response.data.twitter,
                    "mixcloud": response.data.mixcloud,
                    "web": response.data.web,
                    "tags": response.data.tags,
                });
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip]);

    useEffect(() => {
        const put_values = async () => {
            if (Pos === "A") {
                referencia.nombre.current.value = Datos.nombre;
                referencia.ubicacion.current.value = Datos.ubicacion;
                referencia.descripcion.current.value = Datos.descripcion;
            }
            if (Pos === "B") {
                referencia.facebook.current.value = Datos.facebook;
                referencia.instagram.current.value = Datos.instagram;
                referencia.twitter.current.value = Datos.twitter;
            }
            if (Pos === "C") {
                referencia.mixcloud.current.value = Datos.mixcloud;
                referencia.web.current.value = Datos.web;
            }
        }
        put_values();
    }, [Pos, Datos, referencia]);

    const camb_pos_arriba = () => {
        if (Pos === "C") {
            setDatos({
                ...Datos,
                "mixcloud": referencia.mixcloud.current.value,
                "web": referencia.web.current.value,
            });
            setPos("B");
        }
        else if (Pos === "B") {
            setDatos({
                ...Datos,
                "facebook": referencia.facebook.current.value,
                "instagram": referencia.instagram.current.value,
                "twitter": referencia.twitter.current.value
            });
            setPos("A");
        }
        console.log(Datos);
    };

    const camb_pos_abajo = () => {
        if (Pos === "A") {
            setDatos({
                ...Datos,
                "nombre": referencia.nombre.current.value,
                "ubicacion": referencia.ubicacion.current.value,
                "descripcion": referencia.descripcion.current.value
            });
            console.log(Datos);
            setPos("B");
        }
        else if (Pos === "B") {
            setDatos({
                ...Datos,
                "facebook": referencia.facebook.current.value,
                "instagram": referencia.instagram.current.value,
                "twitter": referencia.twitter.current.value
            });
            setPos("C");
        }
    };

    const uploadData = (e) => {
        console.log("subiendo datos");
        let data ={};
        if (Pos === "A") {
            data ={
                ...Datos,
                "nombre": referencia.nombre.current.value,
                "ubicacion": referencia.ubicacion.current.value,
                "descripcion": referencia.descripcion.current.value
            }
        }
        if (Pos === "B") {
            data = {
                ...Datos,
                "facebook": referencia.facebook.current.value,
                "instagram": referencia.instagram.current.value,
                "twitter": referencia.twitter.current.value
            }
        }
        if (Pos === "C") {
            data = {
                ...Datos,
                "mixcloud": referencia.mixcloud.current.value,
                "web": referencia.web.current.value
            }
        }
        const data_send = async (data) => {
            try {

                await axios.post(`${ip}config`, data)
                    .then(res => {
                        console.log("Datos Arriba");
                    });
                console.log("ok");
            }
            catch {
                console.log("error");
            }
        }
        data_send(data);
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/configuración</div>
            {Pos === "A" &&
                <>
                    <label id="texto_1_conf">Nombre de la estación</label>
                    <input type="text" className="c_1" ref={referencia.nombre} />
                    <label id="texto_2_conf">Ubicación</label>
                    <input type="text" className="c_2" ref={referencia.ubicacion} />
                    <label id="texto_3">Descripción</label>
                    <input type="text" className="c_3" id="descripcion" ref={referencia.descripcion} />
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "B" &&
                <>
                    <label id="texto_1_conf">Facebook</label>
                    <input type="text" className="c_1" id="facebook" ref={referencia.facebook} />
                    <label id="texto_2_conf">Instagram</label>
                    <input type="text" className="c_2" id="instagram" ref={referencia.instagram} />
                    <label id="texto_3">Twitter</label>
                    <input type="text" className="c_3" id="twitter" ref={referencia.twitter} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "C" &&
                <>
                    <label id="texto_1_conf">Mixcloud</label>
                    <input type="text" className="c_1" id="mixcloud" ref={referencia.mixcloud} />
                    <label id="texto_2_conf">Página Web</label>
                    <input type="text" className="c_2" id="web" ref={referencia.web} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                </>
            }
            <div id="modificar_1" onClick={uploadData}>Modificar</div>
            <Link to="/imagenes"><div id="imagen_1">Imagen</div></Link>
        </>
    )
}

export default Config