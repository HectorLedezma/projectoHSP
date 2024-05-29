import { Image, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
import "../styles/layout.css";
import tables from "../styles/tables.json";

/* border border-primary */


function Screen(){
    return(
        <div>{/* cuadro de la pantalla */}
            
            <div className="d-flex justify-content-center">{/* Información piso y reloj */}
                <Row xl={12} className="header-container d-flex justify-content-around p-3 border border-primary">
                    <Col xl={3} md={2}><Image src={logoUCEN} className="imagen"/></Col>{/* Logo UCentral */}
                    <Col className="d-flex align-items-center justify-content-center" xl={6}>
                        <Container>
                            <Row><Col><h1 className="fs-3 fw-bold">{"Sala de espera: Piso "+3}</h1></Col></Row>{/* Nombre de sala de espera */}
                            <Row><Col><h2 className="fs-5">{"Martes 28 de Mayo de 2024"}</h2></Col></Row>{/* Fecha */}
                            <Row><Col><h2 className="fs-5">{"11:30"}</h2></Col></Row>{/* Hora */}
                        </Container>
                    </Col>
                    <Col xl={3} md={2}><Image src={logoHSPC}  className="imagen"/></Col>{/* Logo HSPablo */}
                </Row>
            </div>
            
            <div className="d-flex justify-content-around">{/* Pacientes, especialistas, llamados y información */}
                <div className="col-9">{/* Box X especialista X pacientes y Información*/}
                    
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={tables.TbepHeader}>Box</th>
                                <th style={tables.TbepHeader}>Especialista</th>
                                <th style={tables.TbepHeader} colSpan={5}>Pacientes en espera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                            <tr>
                                <td style={tables.TbepBoxEsp}>24</td>
                                <td style={tables.TbepBoxEsp}>Dr. Nickolas R.</td>
                                {[
                                    <td style={tables.Atendido}>Maximiliano P.</td>,
                                    <td style={tables.Espera}>Maximiliano R.</td>,
                                    <td style={tables.Espera}>Maximiliano P.</td>,
                                    <td style={tables.Espera}>Maximiliano R.</td>,
                                    <td style={tables.Espera}>Maximiliano R.</td>
                                ]}
                            </tr>,
                            <tr>
                                <td style={tables.TbepBoxEsp}>23</td>
                                <td style={tables.TbepBoxEsp}>Dra. Katherin H.</td>
                                {[
                                    <td style={tables.Espera}>Johon S.</td>,
                                    <td style={tables.Espera}>Jorge N.</td>
                                ]}
                            </tr>
                            ]}
                        </tbody>
                    </Table>
                    <div className="">
                        <Row className="mb-3">
                            <Col className="d-flex align-items-center justify-content-center"><div className="m-3 border border-dark" style={tables.Info_box_espe}/> Paciente en espera</Col>
                            <Col className="d-flex align-items-center justify-content-center"><div className="m-3 border border-dark" style={tables.Info_box_aten}/> Paciente en atención</Col>
                        </Row>
                        <Row>
                            <Col className="bg-warning fw-bold fs-4">Recuerde que la atención es según la hora de la cita, NO por orden de llegada</Col>
                        </Row>
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
                            {[
                                <tr>
                                    <td>Pedro P.</td>
                                    <td>Box 1</td>
                                </tr>
                            ]}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}

export default Screen;