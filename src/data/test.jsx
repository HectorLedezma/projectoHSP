import { useRef, useState } from "react";
import { Datos } from "../classes/datos";



function Test(){
    const [datos,setDatos] = useState({
        "nombre":"",
        "boxs":[]
    })

    const dpto = useRef();
    const Data = new Datos();
    return(
        <div>
            <form onSubmit={ev=>{
                ev.preventDefault();
                setDatos(Data.armaJSON(Number(dpto.current.value)))
            }}><input ref={dpto} /></form>
            <div className="bg-primary fs-1">{JSON.stringify(datos)}</div>
            
        </div>
    )
}

export default Test;
