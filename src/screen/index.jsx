import { Image, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
import "../styles/layout.css";
import tables from "../styles/tables.json";
import { Reloj } from "../classes/relog";
import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";

/* border border-primary */


function Screen(props){

    const TablaAzul = (datos) => {
        let espec = [];
        let nombres = []
        for(let i = 0;i<datos.length;i++){
            let dato = {"box":datos[i].nameModule,"spec":datos[i].nombre_prof};
            let nombre = datos[i].nombre_prof;
            if(!nombres.includes(nombre)){
                espec.push(dato);
                nombres.push(nombre);
            }
        }
        let compList = [];
        for(let j = 0;j<espec.length;j++){
            compList.push(
                <tr key={j}>
                    <td style={tables.TbepBoxEsp}>{espec[j].box}</td>
                    <td style={tables.TbepBoxEsp}>{espec[j].spec}</td>
                    {}
                </tr>
            );
        }
        return compList;
    }

    const [datos,setDatos] = useState(new Datos().consultar(Number(props.dpto)));

    const [blue,setBlue] = useState(TablaAzul(datos));

    let calendar = new Reloj();
    const [hora, setHora] = useState(calendar.getHora().hora+":"+calendar.getHora().minu);
    const [fecha, setFecha] = useState(calendar.getFecha());

    useEffect(()=>{
        setInterval(()=>{
            let hrs = calendar.getHora();
            setHora(hrs.hora+":"+hrs.minu);
            setFecha(calendar.getFecha());
            setDatos(new Datos().consultar(Number(props.dpto)));
            setBlue(TablaAzul(datos));
        },5000)
    })

    return(
        <div>{/* cuadro de la pantalla */}
            
            <div className="d-flex justify-content-center sticky-top bg-light z-4">{/* Información piso y reloj */}
                <Row xl={12} className="header-container d-flex justify-content-around p-3 border border-primary">
                    <Col xl={3} md={2}><Image src={logoUCEN} className="imagen"/></Col>{/* Logo UCentral */}
                    <Col className="d-flex align-items-center justify-content-center" xl={6}>
                        <Container>
                            <Row><Col><h1 className="fs-3 fw-bold">{"Sala de espera departamento "+props.dpto}</h1></Col></Row>{/* Nombre de sala de espera */}
                            <Row><Col><h2 className="fs-5">{fecha}</h2></Col></Row>{/* Fecha */}
                            <Row><Col><h2 className="fs-5">{hora}</h2></Col></Row>{/* Hora */}
                        </Container>
                    </Col>
                    <Col xl={3} md={2}><Image src={logoHSPC}  className="imagen"/></Col>{/* Logo HSPablo */}
                </Row>
            </div>
            
            <div className="d-flex justify-content-around">{/* Pacientes, especialistas, llamados y información */}
                <div className="col-9">{/* Box X especialista X pacientes y Información*/}
                    
                    <Table bordered>
                        <thead className="under-header position-sticky z-4 border border-3 border-white">
                            <tr>
                                <th style={tables.TbepHeader}>Box</th>
                                <th style={tables.TbepHeader}>Especialista</th>
                                <th style={tables.TbepHeader} colSpan={5}>Pacientes en espera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blue}
                        </tbody>
                    </Table>
                    <div className="fixed-bottom bg-light col-9">
                        <Row className="mb-3">
                            <Col className="d-flex align-items-center justify-content-center"><div className="m-3 border border-dark" style={tables.Info_box_espe}/> Paciente en espera</Col>
                            <Col className="d-flex align-items-center justify-content-center"><div className="m-3 border border-dark" style={tables.Info_box_aten}/> Paciente en atención</Col>
                        </Row>
                        <div className="bg-warning fw-bold fs-4">Recuerde que la atención es según la hora de la cita, NO por orden de llegada</div>
                    </div>
                </div>
                
                <div className="col-3">{/* Paciente X llamado */}
                    
                    <Table bordered>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    Últimos llamados
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pedro P.</td>
                                <td>Box 1</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Screen;