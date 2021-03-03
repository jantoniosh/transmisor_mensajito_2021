import React, { useEffect, useState } from 'react'
import Programas from '../components/Programas';
import Transmision from '../components/Transmision';
import '../css/Main.css'

const Main = ({ ip, socket }) => {

    const [nombre, setNombre] = useState("");
    const [stream, setStream] = useState(false);
    const [record, setRecord] = useState(false);
    const [parte, setParte] = useState("A");
    const [escuchas, setEscuchas] = useState(0);

    useEffect(() => {
        const send_socket = async () => {
            try {
                socket.emit('stream', stream);
            }
            catch {
                console.log("error");
            }
        }
        send_socket();
    }, [socket, stream]);

    useEffect(() => {
        const send_socket = () => {
            try {
                socket.emit('record', `${record}@${nombre}`);
            }
            catch {
                console.log("error");
            }
        }
        send_socket();
    }, [socket, record, nombre]);


    socket.on("escuchas", (escuchas) => {
        console.log(escuchas);
        setEscuchas(escuchas);
    });

    const onChooseProgram = (val) => {
        setNombre(val);
        setParte("B");
    }

    const returnProgram = (val) => {
        setNombre(val);
        setParte("A");
    }

    const onRecord = (val) => {
        setRecord(!record);
    }

    const onStream = (val) => {
        setStream(!stream);
    }


    return (
        <>
            {parte === "A" &&
                <Programas ip={ip} parentCallback={onChooseProgram} />
            }
            {parte === "B" &&
                <>
                    <Transmision nombre={nombre} ip={ip} />
                    <div id="cambiar" onClick={returnProgram}>Cambiar Nombre de Programa</div>
                    <div id="grabar_1" onClick={onRecord} className={
                        `btn-circle ${record ? `btn-red` : `btn-dark`}`
                    }>{
                            record ? `grabando` : `grabar`
                        }</div>
                </>
            }
            {stream ?
                <>
                    <div id="contador_1" className="contador">{escuchas}</div>
                    <div id="contador_2" className="contador">escuchas</div>
                    <div id="transmitir_1" onClick={onStream} className='btn-circle btn-red'>al aire</div>
                </>
                :
                <>
                    <div id="transmitir_1" onClick={onStream} className='btn-circle btn-dark'>transmitir</div>
                </>
            }
        </>
    )
}

export default Main
