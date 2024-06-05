import { Table } from "react-bootstrap";
import VerticalCarousel from "../components/vcarrousel.jsx";
import tables from "../styles/tables.json"
function Test(){

    const TablaVerde = (x) =>{
        let res = []
        for(let i = 0; i<x;i++){
            res.push(
                <tr >
                    <td style={tables.Espera}>Pedro P.</td>
                    <td style={tables.Espera}>Box {i}</td>
                </tr>
            )
        }
        return res
    }

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th colSpan={2}>Pacientes</th>
                    </tr>
                </thead>
                <tbody>
                    <VerticalCarousel items={TablaVerde(45)}/>
                </tbody>
            </Table>
        </div>
    )
}

export default Test;