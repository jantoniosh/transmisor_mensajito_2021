import React, { useState } from 'react'

const AgregarProg = () => {
    const [Nombre, setNombre] = useState("")

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    }

    return (
        <>
            <div id="inicio_1"><a href="index.html">inicio</a>/<a href="selec_pro.html">programa</a>/agregar</div>
            <label id="texto_1">Nombre del Programa</label>
            <input type="text" id="n_pro" name="n_pro" value={Nombre} onChange={onChangeNombre}/>
            <div id="agregar_1">agregar</div>
        </>
    )
}

export default AgregarProg
