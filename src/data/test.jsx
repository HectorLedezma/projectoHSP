import {Datos} from "./datos.js";

function Test(){

    const datero = new Datos();
    //const data = datero.getDatos();

    return(
        <div>
            <form onSubmit={ev=>{
                ev.preventDefault();
                datero.consultar();
            }}>
            <input placeholder="Nombre profesional"/><br/>
            <input placeholder="Departamento"/><br/>
            <input placeholder="idDepartment"/><br/>

            <button type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default Test;