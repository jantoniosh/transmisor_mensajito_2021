import React, { useState, useEffect } from 'react'
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
                console.log(response.data);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [ip]);


    const [Pos, setPos] = useState("A");
    const camb_pos_arriba = () => {
        if (Pos === "C") {
            setPos("B");
        }
        else if (Pos === "B") {
            setPos("A");
        }
    };

    const camb_pos_abajo = () => {
        if (Pos === "A") {
            setPos("B");
        }
        else if (Pos === "B") {
            setPos("C");
        }
    };

    const onChangeNombre = (e) => {
        setDatos({ ...Datos, "nombre": e.target.value });
    }

    const onChangeUbicacion = (e) => {
        setDatos({ ...Datos, "ubicacion": e.target.value });
    }

    const onChangeDescripcion = (e) => {
        setDatos({ ...Datos, "descripcion": e.target.value });
    }

    const onChangeFacebook = (e) => {
        setDatos({ ...Datos, "facebook": e.target.value });
    }

    const onChangeTwitter = (e) => {
        setDatos({ ...Datos, "twitter": e.target.value });
    }

    const onChangeInstagram = (e) => {
        setDatos({ ...Datos, "instagram": e.target.value });
    }

    const onChangeMixcloud = (e) => {
        setDatos({ ...Datos, "mixcloud": e.target.value });
    }

    const onChangeWeb = (e) => {
        setDatos({ ...Datos, "web": e.target.value });
    }

    const uploadData = (e) => {
        console.log("subiendo datos");
        const data_send = async () => {
            try {

                await axios.post(`${ip}config`, Datos)
                    .then(res => {
                        console.log("Datos Arriba");
                    });
                console.log("ok");
            }
            catch {
                console.log("error");
            }
        }
        data_send();
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/configuración</div>
            {Pos === "A" &&
                <>
                    <label id="texto_1_conf">Nombre de la estación</label>
                    <input type="text" className="c_1" value={Datos.nombre} onChange={onChangeNombre} />
                    <label id="texto_2_conf">Ubicación</label>
                    <input type="text" className="c_2" value={Datos.ubicacion} onChange={onChangeUbicacion} />
                    <label id="texto_3">Descripción</label>
                    <input type="text" className="c_3" id="descripcion" value={Datos.descripcion} onChange={onChangeDescripcion} />
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "B" &&
                <>
                    <label id="texto_1_conf">Facebook</label>
                    <input type="text" className="c_1" id="facebook" value={Datos.facebook} onChange={onChangeFacebook} />
                    <label id="texto_2_conf">Instagram</label>
                    <input type="text" className="c_2" id="instagram" value={Datos.instagram} onChange={onChangeInstagram} />
                    <label id="texto_3">Twitter</label>
                    <input type="text" className="c_3" id="twitter" value={Datos.twitter} onChange={onChangeTwitter} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "C" &&
                <>
                    <label id="texto_1_conf">Mixcloud</label>
                    <input type="text" className="c_1" id="mixcloud" value={Datos.mixcloud} onChange={onChangeMixcloud} />
                    <label id="texto_2_conf">Página Web</label>
                    <input type="text" className="c_2" id="web" value={Datos.web} onChange={onChangeWeb} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                </>
            }
            <div id="modificar_1" onClick={uploadData}>Modificar</div>
            <Link to="/imagenes"><div id="imagen_1">Imagen</div></Link>
        </>
    )
}

export default Config
