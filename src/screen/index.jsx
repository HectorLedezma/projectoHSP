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
import { ETL } from "../classes/etl";
import LoadScreen from "../components/load";
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
                        let estilo = colorState(datos[i].pacientes[j].Estado);//datos[i].pacientes[j].Estado === 2? "llamandoPendiente" : 
                        // style={estilo}
                        if(datos[i].pacientes[j].Estado === 2){
                            st2.unshift(
                                <tr key={datos[i].pacientes[j].id}>
                                    <td className={"p-0 align-middle "+estilo}>
                                    {
                                        datos[i].pacientes[j].Modulo
                                    }<br/>
                                    {/*datos[i].medico*/}
                                    </td>
                                    <td className={" p-0 align-middle "+estilo}>{datos[i].pacientes[j].Nombre}</td>
                                </tr>
                            )    
                        }else{
                            sto.unshift(
                                <tr key={datos[i].pacientes[j].id} state={datos[i].pacientes[j].Estado}>
                                    <td className={" p-0 align-middle "+estilo}>
                                    {
                                        datos[i].pacientes[j].Modulo
                                    }<br/>
                                    {/*datos[i].medico*/}
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
        let llamando = [];
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            
            let pacientes = [];
            let st1 = [];
            let st2 = [];
            let sto = [];
            let boxName = "";
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
                        boxName = datos[i].pacientes[j].box;
                        if(datos[i].pacientes[j].Estado === 2){
                            st2.unshift(<td ready={"true"} key={i+"x"+j} className={"align-items-center p-0 "+estilo}>{
                                datos[i].pacientes[j].Nombre}
                            </td>);
                            verdes[i] = true;
                        }else{
                            //pacientes.push(<td key={i+"x"+j} className={"align-items-center p-0 "+estilo}>{datos[i].pacientes[j].Nombre}</td>);
                            if(datos[i].pacientes[j].Estado === 1){
                                st1.unshift(<td ready={"true"} key={i+"x"+j} className={"align-items-center align-middle p-0 "+estilo}>
                                    {datos[i].pacientes[j].Nombre}
                                </td>);
                            }else{
                                sto.push(<td ready={"false"} key={i+"x"+j} className="fondo">{" "}</td>);
                            }
                        }
                    }else{
                        sto.push(<td ready={"false"} key={i+"x"+j} className="fondo">{" "}</td>);
                    }
                }
                pacientes = st2.concat(st1.concat(sto));

                let readies = false;
                pacientes.map((p)=>{
                    readies = readies || p.props.ready === "true";
                    return 0;
                })
                if(readies){
                    if(verdes[i]){
                        //console.log(verdes[i]+" // "+datos[i].box+" || "+datos[i].medico);
                        //console.log()
                        TBlue.unshift(
                            <tr key={datos[i].id} llamando="true">
                                <td className="fs-3 p-0 mainTableCell align-middle" width={colWidth}>{datos[i].pacientes[0].Modulo}</td>
                                <td className="align-middle fs-3 p-0 mainTable" >{
                                    datos[i].medico
                                }</td>
                                {pacientes}
                            </tr>    
                        )
                    }else{
                        TBlue.push(
                            <tr key={datos[i].id} llamando="false">
                                <td className="fs-3 p-0 mainTableCell align-middle" width={colWidth} >{boxName}</td>
                                <td className="align-middle fs-3 p-0 mainTable" >
                                    {
                                        datos[i].medico
                                    }
                                </td>
                                {pacientes}
                            </tr>
                        );
                    }
                }
            } catch (error) {

                TBlue.push(
                    <tr key={datos[i].id} className="DrNoLlama">
                        <td className="fs-3 p-0 mainTableCell align-middle" >{boxName}</td>
                        <td className="fs-3 p-0 mainTable" >{datos[i].medico}</td>
                        {pacientes}
                    </tr>
                );
            }
            
        }
        setTurquesa(llamando);
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
            const scrollSpeed = 50;
            const animationDuration = totalHeight / scrollSpeed; // Duración de la animación en segundos
            tbody.style.animation = `ticker-vertical ${animationDuration}s linear infinite`;
        } catch (error) {
            console.log("error en TablaAzulAnimation")
            console.log(error)
        }

    }

    const CallRef = useRef();
    
    const CallAnimation = () =>{
        const llama = CallRef.current
        const tbody = blueBodyRef.current;//document.querySelector('.ticker-table tbody');
        const rows = tbody.childNodes;
        try {
            
            for(let j = 0;j<llama.childNodes.length;j++){
                //console.log(llama.childNodes[j].childNodes);
                const CallCell = llama.childNodes[j].childNodes;
                const columns = rows[0].childNodes;//
                for(let i = 0;i<columns.length;i++){
                    CallCell[i].style.width = columns[i].offsetWidth+"px";
                }
            }
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
    const [listo,setListo] = useState(true);

    const [paso, SetPaso] = useState(0);


    const esperar =(t)=>{
        return new Promise(
            resolve =>{
                setTimeout(resolve,t);
            }
        )
    }

    const [call, setCall] = useState(false);
    const llamando = () =>{
        setCall(true);
        esperar(3000).finally(()=>{
            setCall(false)
        });
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

    const colBox = useRef();
    const [colWidth,setColWidth] = useState(0);

    useEffect(()=>{
        
        
        let data = JData.armaJSON(Number(props.dpto));
        if(paso>3){
            setListo(true);
            setColWidth(colBox.current.offsetWidth);
        }else{
            setListo(false);
        }
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
            console.log("blue = "+blue.length);
            if((blue.length) > 8){//activar la animación
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
            
            CallAnimation();
            SetPaso(paso+1);
        }).catch();
        
        try {
            const etl = new ETL();
            const dat = etl.CallTickets(datosP);
            const preDat = etl.CallTickets(preDatosP);
            if(JSON.stringify(dat) !== JSON.stringify(preDat)){
                console.log("cambio")
                    
                console.log("fin cambio")
            }else{
                
            }
        } catch (error) {
            
        }
        
    })

    
    return(
        <div>{/* cuadro de la pantalla */}
            <div hidden={!listo}>
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
                                        <th ref={colBox} className="p-0 border border-1 border-white mainTable ColBox">BOX</th>
                                        <th className="p-0 border border-2 border-white mainTable">{"ATENCIÓN"}</th>
                                        <th className="p-0 border border-2 border-white mainTable" colSpan={Pantalla.poli? 3:6 }>{Pantalla.poli? "PACIENTES EN ESPERA" : "NÚMEROS"}</th>
                                    </tr>
                                </thead>
                                {/*<tbody className="z-3" ref={CallRef}>
                                    {turquesa}
                                </tbody>*/}
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
                                {<tr>
                                    <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando}>
                                        BOX
                                    </th>
                                    <th className="p-0 fs-2 under-header position-sticky z-4 border border-3 border-white" style={tables.Llamando}>
                                        PACIENTE
                                    </th>
                                </tr>}
                            </thead>
                            <tbody>
                                {green}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div hidden={listo}>
                <LoadScreen/>
                <h1>CARGANDO</h1>
            </div>
            {/*<audio ref={audioRef}>
                <source src={bell} type="audio/mpeg"/>
            </audio>*/}
            <Outlet/>
        </div>
    )
}

export default Screen;
