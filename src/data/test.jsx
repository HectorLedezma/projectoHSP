import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";


function Test(){
    const [res,setRes] = useState([]);
    //const input = useRef();
    const dat = new Datos();
    useEffect(()=>{
        dat.armaJSON2(1);
    })
    return(
        <div>
            
            <div className="bg-primary fs-1">
                {res}
            </div>
            
            
        </div>
    )
}

export default Test;
