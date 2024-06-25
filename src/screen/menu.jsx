import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";

const MainMenu = () =>{
    const JData = new Datos();
    const [pantallas,setPantallas] = useState([]);
    useEffect(()=>{
        setPantallas(JData);
    })
    return(
        <div>

        </div>
    )
}

export default MainMenu;