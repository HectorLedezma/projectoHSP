import { Image, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
import "../styles/layout.css";
import tables from "../styles/tables.json";
//import { Reloj } from "../classes/relog";
import { useEffect, useState } from "react";
import { Datos } from "../classes/datos";
import { ETL } from "../classes/etl";

/* border border-primary */


function Screen(props){


    const TablaVerde = (x) =>{
        let res = []
        for(let i = 0; i<x;i++){
            res.push(
                <tr>
                    <td style={tables.Atendido}>Pedro P.</td>
                    <td style={tables.Atendido}>Box {i}</td>
                </tr>
            )
        }
        return res
    }

    const TablaAzul = (datos) => {//funcion que extrae datos del JSON y los pasa a la tabla BOX/Especialista/Paciente
        let espec = [];
        let nombres = [];
        let pacientes = [];
        const etl = new ETL();
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            let dato = {"box":datos[i].nameModule,"spec":datos[i].nombre_prof};
            let nombre = dato.spec;
            
            if(!nombres.includes(nombre)){//si el especialista aun no es agregado a la lista
                if(datos[i].estado !== 4 && datos[i].estado !== 13){//comprueba que el paciente no se encuetre atendido aun
                    pacientes.push({nombreD:nombre,nombreP:[etl.recortaNombreP(datos[i].nombre_paciente)], estado: [datos[i].estado]})
                }
                espec.push(dato);
                nombres.push(nombre);
            }else{//si el nombre del especialista ya esta en la lista
                for(let j = 0; j<pacientes.length;j++){//recorre la lista de pacientes
                    if(datos[i].nombre_prof === pacientes[j].nombreD){
                        if(datos[i].estado !== 4 && datos[i].estado !== 13){//comprueba que el paciente no se encuetre atendido aun
                            //añade el nombre del paciente a la lista asociada al doctor con su estado de atencion
                            pacientes[j].nombreP.push(etl.recortaNombreP(datos[i].nombre_paciente));
                            pacientes[j].estado.push(datos[i].estado);
                        }
                    }
                }
            }
        }

        const getPacientes = (dr) => {
            let res = [];

            const EnEspera = [1,2,5,8,9,10,11];
            /**
            
                estados:
                1 y default: en espera
                2: llamando
                3 y 12: en atención
                4 y 13: fin
                8: no llegó


             */
            for(let j = 0; j<pacientes.length;j++){
                
                if(pacientes[j].nombreD === dr){
                    const lim = pacientes[j].estado.length < 5? pacientes[j].estado.length : 5;
                    for(let x = 0; x < lim; x++){
                        let DefEstado = EnEspera.includes(pacientes[j].estado[x])? "Espera":"Atendido";
                        //console.log(tables[DefEstado]);
                        res.push(<td className="fs-4" style={tables[DefEstado]} >{pacientes[j].nombreP[x]}</td>);
                    }
                    break;
                }
            }
            return res;
        }

        let compList = [];
        for(let j = 0;j<espec.length;j++){
            compList.push(
                <tr key={j}>
                    <td className="fs-4" style={tables.TbepBoxEsp}>{espec[j].box}</td>
                    <td className="fs-4" style={tables.TbepBoxEsp}>{etl.recortaNombre(espec[j].spec)}</td>
                    {getPacientes(espec[j].spec)}
                </tr>
            );
        }
        return compList;
    }

    const [datos,setDatos] = useState(new Datos().consultar(Number(props.dpto)));

    const [blue,setBlue] = useState(TablaAzul(datos));

    //const calendar = new Reloj();
    //const [hora, setHora] = useState(calendar.getHora().hora+":"+calendar.getHora().minu);
    //const [fecha, setFecha] = useState(calendar.getFecha());

    useEffect(()=>{
        setInterval(()=>{
            //let hrs = calendar.getHora();
            //setHora(hrs.hora+":"+hrs.minu);
            //setFecha(calendar.getFecha());
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
                            {/*<Row><Col><h2 className="fs-5">{fecha}</h2></Col></Row>{/* Fecha
                            <Row><Col><h2 className="fs-5">{hora}</h2></Col></Row>{/* Hora */}
                        </Container>
                    </Col>
                    <Col xl={3} md={2}><Image src={logoHSPC}  className="imagen"/></Col>{/* Logo HSPablo */}
                </Row>
            </div>
            
            <div className="d-flex justify-content-around">{/* Pacientes, especialistas, llamados y información */}
                <div className="col-9">{/* Box X especialista X pacientes y Información*/}
                    
                    <Table bordered>
                        <thead className="fs-2 under-header position-sticky z-4 border border-3 border-white">
                            <tr>
                                <th className="p-0" style={tables.TbepHeader}>BOX</th>
                                <th className="p-0" style={tables.TbepHeader}>ESPECIALISTA</th>
                                <th className="p-0" style={tables.TbepHeader} colSpan={5}>PACIENTES EN ESPERA</th>
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
                                <th className="under-header position-sticky z-4 border border-3 border-white" style={tables.Atendido} colSpan={2}>
                                    Últimos llamados
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {TablaVerde(20)}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Screen;