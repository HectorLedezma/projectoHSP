import { useRef, useState } from "react";
import {Datos} from "./datos.js";

function Test(){

    const datero = new Datos();
    //const data = datero.getDatos();
    const [data,setData] = useState([]);
    const idDepto = useRef();
    return(
        <div>
            <form onSubmit={ev=>{
                ev.preventDefault();
                setData(datero.consultar(Number(idDepto.current.value)))
            }}>
            <input ref={idDepto} placeholder="idDepartment"/><br/>
            <button type="submit">Buscar</button>
            </form>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    )
}

export default Test;