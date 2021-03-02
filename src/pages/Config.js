import React, { useState, useEffect } from 'react'
import '../css/Config.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Config = ({ ip }) => {
    const [Datos, setDatos] = useState({
        "estacion": "mensajito",
        "ubicacion": "mensajito",
        "descripcion": "mensajito",
        "facebook": "mensajito",
        "instagram": "mensajito",
        "twitter": "mensajito",
        "web": "mensajito",
        "tags": "mensajito",
    });

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const get_data = async () => {
            try {
                const response = await axios.get(`${ip}config`);
                setDatos({
                    "estacion": response.data.nombre,
                    "ubicacion": response.data.ubicacion,
                    "descripcion": response.data.descripcion,
                    "facebook": response.data.facebook,
                    "instagram": response.data.instagram,
                    "twitter": response.data.twitter,
                    "web": response.data.web,
                    "tags": response.data.tags,
                });
                console.log(response.data);
                setLoad(false);
            }
            catch {
                console.log("error");
            }
        }
        get_data();
    }, [load, ip]);


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

    const onChangeEstacion = (e) => {
        setDatos({ ...Datos, "estacion": e.target.value });
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

    const onChangeWeb = (e) => {
        setDatos({ ...Datos, "web": e.target.value });
    }

    const onChangeTags = (e) => {
        setDatos({ ...Datos, "tags": e.target.value });
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
                    <input type="text" className="c_1" name="estacion" value={Datos.estacion} onChange={onChangeEstacion} />
                    <label id="texto_2">Ubicación</label>
                    <input type="text" className="c_2" name="ubicacion" value={Datos.ubicacion} onChange={onChangeUbicacion} />
                    <label id="texto_3">Descripción</label>
                    <input type="text" className="c_3" id="descripcion" name="descripcion" value={Datos.descripcion} onChange={onChangeDescripcion} />
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "B" &&
                <>
                    <label id="texto_1_conf">Facebook</label>
                    <input type="text" className="c_1" id="facebook" name="facebook" value={Datos.facebook} onChange={onChangeFacebook} />
                    <label id="texto_2">Instagram</label>
                    <input type="text" className="c_2" id="instagram" name="instagram" value={Datos.instagram} onChange={onChangeInstagram} />
                    <label id="texto_3">Twitter</label>
                    <input type="text" className="c_3" id="twitter" name="twitter" value={Datos.twitter} onChange={onChangeTwitter} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                    <div className="triangulo_abajo" onClick={camb_pos_abajo}></div>
                </>
            }
            {Pos === "C" &&
                <>
                    <label id="texto_1_conf">Página Web</label>
                    <input type="text" className="c_1" id="web" name="web" value={Datos.web} onChange={onChangeWeb} />
                    <label id="texto_2">Tags</label>
                    <input type="text" className="c_2" id="tags" name="tags" value={Datos.tags} onChange={onChangeTags} />
                    <div className="triangulo_arriba" onClick={camb_pos_arriba}></div>
                </>
            }
            <div id="modificar_1" onClick={uploadData}>Modificar</div>
            <div id="imagen_1">Imagen</div>
        </>
    )
}

export default Config
