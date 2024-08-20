import { Container, Image, Row } from "react-bootstrap";
import logoHSPC from "../images/hspc.png";
import "../styles/color.css"
function LoadScreen(arg){
    let estado = "";
    if(!arg.listo){
        estado = 1049;
    }else{
        estado = -1;
    }
    return(<div className={"position-absolute top-0 background-color loading"} style={{width:"100vw",height:"100vh",zIndex:estado}}>
        <Container style={{height:"100vh"}} className="mt-3">
            <Row className="d-flex align-items-center justify-content-center">
                <Image src={logoHSPC} className="m-3"/> 
            </Row>
            <Row>
                <h1 className="d-flex justify-content-center"  style={{fontSize:"5.5rem"}}>CARGANDO...</h1>
            </Row>
        </Container>
        {arg.mensaje}
    </div>)
}

export default LoadScreen