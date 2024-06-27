import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";
import { Button, Table } from "reactstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/color.css"
import Encabezado from "../components/header";
import { ETL } from "../classes/etl";

const MainMenu = () =>{
    const JData = new Datos();
    const [pantallas,setPantallas] = useState([]);
    const navi = useNavigate();
    const etl = new ETL();

    const screens = () =>{
        let list = [];
        pantallas.map((p)=>
            list.push(
                <tr key={p.pantalla.idPantalla}>
                    <td className="border border-dark">{etl.titulo(p.pantalla.nombre)+(p.pantalla.policlinico?" (Policlínico)":"")}</td>
                    <td className="border border-dark">{<Button onClick={ev=>{
                        ev.preventDefault();
                        navi("/piso/"+p.pantalla.idDepartment);
                    }}>Ir</Button>}</td>
                </tr>
            )
        );
        return list;
    }

    const [founded,setFound] = useState(false);

    useEffect(()=>{
        if(!founded){
            JData.getScreens().then(data=>{
                setPantallas(data);
            });
            setFound(true);
        }
        
    })
    return(
        <div>
            <Encabezado titulo={"Pantallas disponibles"}/>
            <Table >
                <thead>
                    <tr>
                        <th className="fondo2 border border-dark">Pantalla</th>
                        <th className="fondo2 border border-dark"></th>
                    </tr>
                </thead>
                <tbody>
                    {screens()}
                </tbody>
            </Table>
            <Outlet/>
        </div>
    )
}

export default MainMenu;