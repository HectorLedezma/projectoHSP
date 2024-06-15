import { Image, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
import "../styles/layout.css";
import "../styles/color.css";
import tables from "../styles/tables.json";
//import { Reloj } from "../classes/relog";
import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";

/* border border-primary */


function Screen(props){


    const colorState = (st) =>{
        let estilo = "espera";
        switch (st) {
            case 2:
                estilo = "llamando";
                break;
            case 1:
                estilo = "espera";
                break;
            default:
                estilo = "atendiendo";
                break;
        }
        return estilo
    }

    const TablaVerde = (datos) =>{
        let res = []
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            try {
                for(let j = 0; j<datos[i].pacientes.length;j++){
                    if(datos[i].pacientes[j].Estado >= 2){
                        let estilo = colorState(datos[i].pacientes[j].Estado);
                        // style={estilo}
                        if(datos[i].pacientes[j].Estado === 2){
                            res.unshift(
                                <tr key={datos[i].pacientes[j].Nombre}>
                                    <td className={"fs-3 p-0 "+estilo}>{datos[i].box}</td>
                                    <td className={"fs-3 p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>
                                </tr>
                            )    
                        }else{
                            res.push(
                                <tr key={datos[i].pacientes[j].Nombre}>
                                    <td className={"fs-3 p-0 "+estilo}>{datos[i].box}</td>
                                    <td className={"fs-3 p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>
                                </tr>
                            )
                        }
                    }
                }    
            } catch (error) {
                console.log(datos)
            }
        }
        return res
    }

    const TablaAzul = (datos) => {//funcion que extrae datos del JSON y los pasa a la tabla BOX/Especialista/Paciente
        let TBlue = [];
        let verdes = [];
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            
            let pacientes = [];
            try {
                /*let cont = 0;
                datos[i].pacientes.forEach(element => {
                    if(cont === 5){
                        break;
                    }
                    let estilo = colorState(element.Estado);
                    pacientes.push(<td key={element.Nombre} className="fs-2 p-0" style={estilo}>{element.Nombre}</td>);
                    cont++;
                });*/
                verdes.push(false);
                
                const lim = 4
                //let lim = (datos[i].pacientes.length < minLim ? datos[i].pacientes.length : minLim);
                for(let j = 0; j < lim;j++){
                    //j-1 => 2 -> [0, 1, 2] // lim = 4 -> [0, 1, 2, 3]
                    if(datos[i].pacientes.length-1 >= j){
                        let estilo = colorState(datos[i].pacientes[j].Estado);
                        /* 
                            estados:
                                1 y default: en espera (Amarillo)
                                2: llamando (Verde)
                                3 y 12: en atención (Celeste)
                                4 y 13: fin (Omitir)
                                8: no llegó (Omitir)
                        */
                        if(datos[i].pacientes[j].Estado === 2){
                            pacientes.unshift(<td key={i+"x"+j} className={"align-items-center fs-3 p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>);
                            verdes[i] = true;
                        }else{
                            pacientes.push(<td key={i+"x"+j} className={"align-items-center fs-3 p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>);
                            
                        }
                    }else{
                        pacientes.push(<td key={i+"x"+j} >{" "}</td>);
                    }
                }
                
                if(verdes[i]){
                    //console.log(verdes[i]+" // "+datos[i].box+" || "+datos[i].medico);
                    TBlue.unshift(
                        <tr key={datos[i].id +"/"+i}>
                            <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].box}</td>
                            <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].medico}</td>
                            {pacientes}
                        </tr>    
                    )    
                }else{
                    TBlue.push(
                        <tr key={datos[i].id}>
                            <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].box}</td>
                            <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].medico}</td>
                            {pacientes}
                        </tr>
                    );
                }
            } catch (error) {

                TBlue.push(
                    <tr key={datos[i].id}>
                        <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].box}</td>
                        <td className="fs-3 p-0 fw-bold" style={tables.TbepBoxEsp}>{datos[i].medico}</td>
                        {pacientes}
                    </tr>
                );
            }
            
        }

        return TBlue;
    }

    const JData = new Datos();

    //const data = JData.armaJSON(Number(props.dpto));

    const [blue,setBlue] = useState([]);
    const [green,setGreen] = useState([])
    const [nombre,setNombre] = useState("");

    const [anima,setAnima] = useState("");
    const [animaC,setAnimaC] = useState("");
    //const calendar = new Reloj();
    //const [hora, setHora] = useState(calendar.getHora().hora+":"+calendar.getHora().minu);
    //const [fecha, setFecha] = useState(calendar.getFecha());

    useEffect(()=>{
        
        let data = JData.armaJSON(Number(props.dpto));
        
        data.then(datos=>{
            setNombre(datos.Name);
            setBlue(TablaAzul(datos.Datos));
            setGreen(TablaVerde(datos.Datos));
            if(blue.length > 12){
                setAnimaC("ticker-table-container");
                setAnima("ticker-table");
            }else{
                setAnimaC("");
                setAnima("");
            }
        });
    })

    
    return(
        <div>{/* cuadro de la pantalla */}
            
            <div className="d-flex justify-content-center sticky-top bg-light z-4">{/* Información piso y reloj */}
                <Row xl={12} className="header-container d-flex justify-content-around p-3 border border-primary">
                    <Col xl={3} md={2}><Image src={logoUCEN} className="imagen"/></Col>{/* Logo UCentral */}
                    <Col className="d-flex align-items-center justify-content-center" xl={6}>
                        <Container>
                            <Row><Col><h1 className="fs-1 fw-bold">{nombre}</h1></Col></Row>{/* Nombre de sala de espera */}
                            {/*<Row><Col><h2 className="fs-5">{fecha}</h2></Col></Row>{/* Fecha
                            <Row><Col><h2 className="fs-5">{hora}</h2></Col></Row>{/* Hora */}
                        </Container>
                    </Col>
                    <Col xl={3} md={2}><Image src={logoHSPC}  className="imagen"/></Col>{/* Logo HSPablo */}
                </Row>
            </div>
            
            <div className="d-flex justify-content-around">{/* Pacientes, especialistas, llamados y información */}
                <div className="col-9">{/* Box X especialista X pacientes y Información*/}
                    <div className={animaC}>
                        <Table bordered className={anima}>
                            <thead className="fs-4 position-sticky z-3">
                                <tr>{/* poli = box -> ventanilla // Esp -> tipo at // pass -> tick*/}
                                    <th className="p-0 border border-1 border-white" style={tables.TbepHeader}>{"BOX"}</th>
                                    <th className="p-0 border border-1 border-white" style={tables.TbepHeader}>{"ESPECIALISTA"}</th>
                                    <th className="p-0 border border-1 border-white" style={tables.TbepHeader} colSpan={4}>PACIENTES EN ESPERA</th>
                                </tr>
                            </thead>
                            <tbody className="z-0">
                                {blue}
                            </tbody>
                        </Table>
                    </div>
                    

                    <div className="fixed-bottom z-4 bg-light col-9">
                        <Row className="m-1">
                            <Col className="d-flex align-items-center justify-content-center fs-4 fw-bold"><div className="m-1 border border-dark espera" style={tables.Info_box}/> Paciente en espera</Col>
                            <Col className="d-flex align-items-center justify-content-center fs-5 fw-bold"><div className="m-1 border border-dark llamando" style={tables.Info_box}/> Paciente siendo llamado</Col>
                            <Col className="d-flex align-items-center justify-content-center fs-4 fw-bold"><div className="m-1 border border-dark atendiendo" style={tables.Info_box}/> Paciente en atención</Col>
                        </Row>
                        <Row>
                            <div className="bg-warning fw-bold fs-3 ticker-container">
                                <div className="ticker">
                                    Recuerde que la atención es según la hora de la cita, NO por orden de llegada
                                </div>
                            </div>
                        </Row>
                    </div>

                </div>
                
                <div className="col-3">{/* Paciente X llamado */}
                    
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando} colSpan={2}>
                                    Últimos llamados
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {green}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Screen;
