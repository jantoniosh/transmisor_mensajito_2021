import React, { useEffect, useState } from 'react'
import Programas from '../components/Programas';
import Transmision from '../components/Transmision';
import '../css/Main.css'

const Main = ({ ip, socket }) => {


    const [status, setStatus] = useState({
        nombre: "",
        stream: false,
        record: false,
        parte: "A"
    });

    useEffect(() => {
        const send_socket = async () => {
            try {
                socket.emit('stream', status.stream);
            }
            catch {
                console.log("error");
            }
        }
        send_socket();
    }, [socket, status.stream]);

    useEffect(() => {
        const send_socket = async () => {
            try {
                socket.emit('record', status.record);
            }
            catch {
                console.log("error");
            }
        }
        send_socket();
    }, [socket, status.record]);

    const onChooseProgram = (val) => {
        setStatus({ ...status, "nombre": val, parte: "B" });
    }

    const returnProgram = (val) => {
        setStatus({ ...status, "nombre": val, parte: "A" });
    }

    const onRecord = (val) => {
        setStatus({ ...status, "record": !status.record }, (e) => {
        });
    }

    const onStream = (val) => {
        setStatus({ ...status, "stream": !status.stream });
    }


    return (
        <>
            {status.parte === "A" &&
                <Programas ip={ip} parentCallback={onChooseProgram} />
            }
            {status.parte === "B" &&
                <>
                    <Transmision nombre={status.nombre} ip={ip} />
                    <div id="cambiar" onClick={returnProgram}>Cambiar Nombre de Programa</div>
                    <div id="grabar_1" onClick={onRecord} className={
                        `btn-circle ${status.record ? `btn-red` : `btn-dark`}`
                    }>{
                            status.record ? `grabando` : `grabar`
                        }</div>
                </>
            }
            <div id="contador_1" className="contador">4</div>
            <div id="contador_2" className="contador">escuchas</div>
            <div id="transmitir_1" onClick={onStream} className={
                `btn-circle ${status.stream ? `btn-red` : `btn-dark`}`
            }>{
                    status.stream ? `al aire` : `transmitir`
                }</div>
        </>
    )
}

export default Main
