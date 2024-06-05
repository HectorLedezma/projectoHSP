import { useRef, useState } from "react";
import { Datos } from "../classes/datos";

function Test(){
    const [datos,setDatos] = useState([])
    const dpto = useRef();
    const Data = new Datos();
    return(
        <div>
            <input ref={dpto} />
            <button onClick={ev=>{
                ev.preventDefault();
                setDatos(Data.armaJSON(Number(dpto.current.value)))
            }} className="btn btn-primary">Aver</button>
            <div>{datos}</div>
        </div>
    )
}

export default Test;