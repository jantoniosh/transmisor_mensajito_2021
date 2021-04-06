import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/ElimProg.css'
import axios from 'axios'

const ElimProg = ({ ip }) => {
    const [programas, setProgramas] = useState([]);
    const [delPro, setDelPro] = useState({
        "id": ""
    });
    const [Pos, setPos] = useState("A");

    useEffect(() => {
        const get_data = async () => {
            if (Pos === "A") {
                try {
                    const response = await axios.get(`${ip}programas`);
                    setProgramas(response.data);
                    console.log(response.data);
                }
                catch {
                    console.log("error");
                }
            }
        }
        get_data();
    }, [Pos, ip]);

    useEffect(() => {
        const get_data = async () => {
            if (Pos === "B") {
                try {
                    await axios.post(`${ip}programa_del`, delPro);
                }
                catch {
                    console.log("error");
                }
            }
        }
        get_data();
    }, [ip, Pos, delPro]);

    const onChooseProgram = (e) => {
        setDelPro({ ...delPro, "id": e.target.value });
    }

    const eliminar = () => {
        setPos("B");
    }

    const volver = () => {
        setPos("A");
        setDelPro("");
    }

    return (
        <>
            <div className="menu"><Link to="/"><span>inicio</span></Link>/<Link to="/main"><span>programa</span></Link>/agregar</div>
            {Pos === "A" &&
                <>
                    <div>
                        <label id="texto_1">Eliminar Programa</label>
                        <select id="select_programa" name="programas" onChange={onChooseProgram} multiple>
                            {programas.map((programa) => <option key={programa.id} value={programa.id}>{programa.nombre}</option>)}
                        </select>
                        <div id="btn_eliminar" onClick={eliminar}>Eliminar</div>
                    </div>
                </>
            }
            {Pos === "B" &&
                <>
                    <label id="texto_1">Programa Eliminado</label>
                    {/* <label id="texto_2">{delPro}</label> */}
                    <div id="nombre_1" onClick={volver}>volver</div>
                </>
            }
        </>
    )
}

export default ElimProg