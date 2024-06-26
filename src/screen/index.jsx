import { Image, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
//import bell from "../sfx/Bell.mp3"
import "../styles/layout.css";
import "../styles/color.css";
import tables from "../styles/tables.json";
//import { Reloj } from "../classes/relog";
import { useEffect, useRef, useState } from "react";
import { Datos } from "../classes/datos";
import Carrusel from "../components/carrusel";
import { Outlet } from "react-router-dom";
//import { error } from "console";

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
        let res = [];
        let sto =[];
        let st2 =[];
       //console.log("cargando");
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            try {
                for(let j = 0; j<datos[i].pacientes.length;j++){
                    if(datos[i].pacientes[j].Estado >= 2 && datos[i].pacientes[j].Modulo.length < 11){
                        let estilo = datos[i].pacientes[j].Estado === 2? "llamandoPendiente" : colorState(datos[i].pacientes[j].Estado);
                        // style={estilo}
                        if(datos[i].pacientes[j].Estado === 2){
                            st2.unshift(
                                <tr key={datos[i].pacientes[j].Nombre}>
                                    <td className={"p-0 align-middle "+estilo}>
                                    {
                                        datos[i].pacientes[j].Modulo
                                    }<br/>
                                    {datos[i].medico}
                                    </td>
                                    <td className={" p-0 align-middle "+estilo}>{datos[i].pacientes[j].Nombre}</td>
                                </tr>
                            )    
                        }else{
                            sto.unshift(
                                <tr key={datos[i].pacientes[j].Nombre} state={datos[i].pacientes[j].Estado}>
                                    <td className={" p-0 align-middle "+estilo}>
                                    {
                                        datos[i].pacientes[j].Modulo
                                    }<br/>
                                    {datos[i].medico}
                                    </td>
                                    <td className={" p-0 align-middle "+estilo}>{datos[i].pacientes[j].Nombre}</td>
                                </tr>
                            )
                        }
                    }
                }    
            } catch (error) {
               //console.log(error)
            }
        }
        res = st2.concat(sto);
        return res
    }

    const TablaAzul = (datos) => {//funcion que extrae datos del JSON y los pasa a la tabla BOX/Especialista/Paciente
        let TBlue = [];
        let verdes = [];
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            
            let pacientes = [];
            let st1 = [];
            let st2 = [];
            let sto = [];
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
                
                const lim = (Pantalla.poli? 3:2);
                //let lim = (datos[i].pacientes.length < minLim ? datos[i].pacientes.length : minLim);
                for(let j = 0; j < lim;j++){
                    //j-1 => 2 -> [0, 1, 2] // lim = 4 -> [0, 1, 2, 3]
                    if(datos[i].pacientes.length-1 >= j){
                        let estilo = colorState(datos[i].pacientes[j].Estado);
                        /* 
                            estados:
                                1 y default: en espera (Amarillo)
                                2: llamando (Verde)
                                3, 4 y 12: en atención (Celeste)
                                13: fin (Omitir)
                                8: no llegó (Omitir)
                        */
                        if(datos[i].pacientes[j].Estado === 2){
                            st2.unshift(<td ready={"true"} key={i+"x"+j} className={"align-items-center p-0 "+estilo}>{
                                datos[i].pacientes[j].Nombre}<br/>
                                {datos[i].pacientes[j].Modulo}
                            </td>);
                            verdes[i] = true;
                        }else{
                            //pacientes.push(<td key={i+"x"+j} className={"align-items-center p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>);
                            if(datos[i].pacientes[j].Estado === 1){
                                st2.push(<td ready={"true"} key={i+"x"+j} className={"align-items-center align-middle p-0 "+estilo}>
                                    {datos[i].pacientes[j].Nombre}<br/>
                                    {datos[i].pacientes[j].Modulo}
                                </td>);
                            }else{
                                sto.push(<td ready={"false"} key={i+"x"+j} className="fondo">{" "}</td>);
                            }
                        }
                    }else{
                        sto.push(<td ready={"false"} key={i+"x"+j} className="fondo">{" "}</td>);
                    }
                }
                pacientes = st2.concat(st1).concat(sto);

                let readies = false;
                pacientes.map((p)=>{
                    readies = readies || p.props.ready === "true";
                    return 0;
                })
                if(readies){
                    if(verdes[i]){
                        //console.log(verdes[i]+" // "+datos[i].box+" || "+datos[i].medico);
                        TBlue.unshift(
                            <tr key={datos[i].id +"/"+i} llamando="true">
                                {/*<td className="fs-3 p-0 fw-bold mainTableCell">{datos[i].box}</td>*/}
                                <td className="align-middle fs-3 p-0 fw-bold mainTable" >{datos[i].medico}</td>
                                {pacientes}
                            </tr>    
                        )
                    }else{
                        TBlue.push(
                            <tr key={datos[i].id} llamando="false">
                                {/*<td className="fs-3 p-0 fw-bold mainTableCell" >{datos[i].box}</td>*/}
                                <td className="align-middle fs-3 p-0 fw-bold mainTable" >{datos[i].medico}</td>
                                {pacientes}
                            </tr>
                        );
                    }
                }
            } catch (error) {

                TBlue.push(
                    <tr key={datos[i].id}>
                        {/*<td className="fs-3 p-0 fw-bold mainTableCell" >{datos[i].box}</td>*/}
                        <td className="fs-3 p-0 fw-bold mainTable" >{datos[i].medico}</td>
                        {pacientes}
                    </tr>
                );
            }
            
        }

        return TBlue;
    }

    const blueBodyRef = useRef();
    const blueContRef = useRef();


    const TablaAzulAnimation = () =>{
        const tbody = blueBodyRef.current;//document.querySelector('.ticker-table tbody');
        const rows = tbody.childNodes;
        try {
            const rowHeight = rows[0].offsetHeight; // Altura de una fila
            const totalRows = rows.length; // Número total de filas
            const totalHeight = rowHeight * totalRows; // Altura total de todas las filas
            //const containerHeight = blueContRef.current.offsetHeight
            const scrollSpeed = 150;
            const animationDuration = totalHeight / scrollSpeed; // Duración de la animación en segundos
            tbody.style.animation = `ticker-vertical ${animationDuration}s linear infinite`;
        } catch (error) {
            
        }
    }

    const JData = new Datos();

    //const data = JData.armaJSON(Number(props.dpto));

    const [blue,setBlue] = useState([]);
    const [blue2,setBlue2] = useState([]);
    const [turquesa,setTurquesa] = useState([]);
    const [green,setGreen] = useState([])
    const [Pantalla,setPantalla] = useState({
        "nombre":"",//nombre de la pantalla
        "mensaje":[],//mensajes de la pantalla
        "poli":false
    });

    const [datosP,setDatos] = useState([]);
    const [preDatosP,setPreDatos] = useState([]);

    const [anima,setAnima] = useState("");
    const [animaC,setAnimaC] = useState("");
    const [animaB,setAnimaB] = useState("");
    //const calendar = new Reloj();
    //const [hora, setHora] = useState(calendar.getHora().hora+":"+calendar.getHora().minu);
    //const [fecha, setFecha] = useState(calendar.getFecha());
    const [found,setFound] = useState(true)
    const [show,setShow] = useState(true);
    const esperar =(t)=>{
        return new Promise(
            resolve =>{
                setTimeout(resolve,t);
            }
        )
    }
    //const sound = new Audio(bell);
    //const audioRef = useRef();
    const Mostrar = ()=>{
        if(blue.length > 0){
            esperar(3000).then(()=>{
                console.log("esperando")
                let verdes = [];
                blue.map(b=>{
                    if(b.props.llamando === "true"){
                        verdes.push(b);
                    }
                    return 0;
                })
                setTurquesa(verdes)
            }).finally(()=>{
                console.log("finalizado")
                setTurquesa([])
            });
        }else{
            setTurquesa([])
        }
    }
    useEffect(()=>{
        
        if(found){
            let data = JData.armaJSON(Number(props.dpto));
            
            data.then(datos=>{
                setPreDatos(datosP);
                setDatos(datos.Datos);
                
                setPantalla({
                    nombre:datos.Name,
                    mensaje:(datos.poli?datos.Messages.concat([
                        {
                            "idMensaje": -1,
                            "mensaje": "Recuerde que la atención es según la hora de la cita, NO por orden de llegada",
                            "estado": 1,
                            "hora": "00:00:00",
                            "idPantalla": 0
                        }
                    ]):datos.Messages),
                    poli:datos.poli
                });
                setBlue(TablaAzul(datos.Datos));
                
                
                setGreen(TablaVerde(datos.Datos));
                if(blue.length > 5){
                    setAnimaC("ticker-table-container");
                    setAnima("ticker-table");
                    setAnimaB("TBody")
                    setBlue2(blue)
                    TablaAzulAnimation();
                }else{
                    setAnimaC("");
                    setAnimaB("")
                    setAnima("");
                    setBlue2([])
                }
                setFound(true);

            }).catch();
            //console.log(blueRef.current);
        }
        
        if(JSON.stringify(datosP) !== JSON.stringify(preDatosP)){
            //console.log("CAMBIO");
            //audioRef.current.play();
            //sound.play();
            //Mostrar();
        }
    })

    
    return(
        <div>{/* cuadro de la pantalla */}
            
            <div className="d-flex justify-content-center sticky-top fondo z-4">{/* Información piso y reloj */}
                <Row xl={12} className="header-container d-flex justify-content-around border border-primary">
                    <Col xl={3} className="d-flex align-items-center justify-content-center"><Image src={logoUCEN} className="imagen m-0"/></Col>{/* Logo UCentral */}
                    <Col className="d-flex align-items-center justify-content-center p-3" xl={6}>
                        <Container>
                            <Row><Col><h1 className="fs-1 fw-bold">{Pantalla.nombre}</h1></Col></Row>{/* Nombre de sala de espera */}
                            {/*<Row><Col><h2 className="fs-5">{fecha}</h2></Col></Row>{/* Fecha
                            <Row><Col><h2 className="fs-5">{hora}</h2></Col></Row>{/* Hora */}
                        </Container>
                    </Col>
                    <Col xl={3} className=" d-flex align-items-center justify-content-center"><Image src={logoHSPC} className="imagen m-0"/></Col>{/* Logo HSPablo */}
                </Row>
            </div>
            
            <div className="d-flex justify-content-around">{/* Pacientes, especialistas, llamados y información */}
                <div className="col-8">{/* Box X especialista X pacientes y Información*/}
                    <div ref={blueContRef} className={animaC}>
                        <Table bordered className={anima}>
                            <thead className="fs-4 position-sticky z-3">
                                <tr>{/* poli = box -> ventanilla // Esp -> tipo at // pass -> tick*/}
                                    {/*<th className="p-0 border border-1 border-white mainTable">{Pantalla.poli? "RECINTO" : "MÓDULO"}</th>*/}
                                    <th className="p-0 border border-2 border-white mainTable">{"ATENCIÓN"}</th>
                                    <th className="p-0 border border-2 border-white mainTable" colSpan={Pantalla.poli? 3:6 }>{Pantalla.poli? "PACIENTES EN ESPERA" : "NÚMEROS"}</th>
                                </tr>
                            </thead>
                            <tbody className="z-3">
                                {turquesa}
                            </tbody>
                            <tbody ref={blueBodyRef} className={"z-0 "+animaB}>
                                {blue}
                                {blue2}
                            </tbody>
                        </Table>
                    </div>
                    

                    <div className="fixed-bottom z-4 fondo col-8">
                        <Row className="m-1">
                            <Col className="d-flex align-items-center justify-content-center fs-4 fw-bold "><div className="m-1 border border-dark espera" style={tables.Info_box}/> Paciente en espera</Col>
                            <Col className="d-flex align-items-center justify-content-center fs-5 fw-bold "><div className="m-1 border border-dark llamando" style={tables.Info_box}/> Paciente siendo llamado</Col>
                            <Col className="d-flex align-items-center justify-content-center fs-4 fw-bold "><div className="m-1 border border-dark atendiendo" style={tables.Info_box}/> Paciente en atención</Col>
                        </Row>
                        
                            <div className="bg-warning fw-bold fs-3" style={{width:"100vw"}}>
                                <Carrusel items={Pantalla.mensaje} time={5}/>
                            </div>
                        
                    </div>

                </div>
                
                <div className="col-4 fondo">{/* Paciente X llamado */}
                    
                    <Table bordered className="p-0">
                        <thead>
                            <tr>
                                <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando} colSpan={2}>
                                    Últimos llamados
                                </th>
                            </tr>
                            {/*<tr>
                                <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando}>
                                    MODULO
                                </th>
                                <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando}>
                                    NUMERO
                                </th>
                            </tr>*/}
                        </thead>
                        <tbody>
                            {green}
                        </tbody>
                    </Table>
                </div>
            </div>
            {/*<audio ref={audioRef}>
                <source src={bell} type="audio/mpeg"/>
            </audio>*/}
            <Outlet/>
        </div>
    )
}

export default Screen;
