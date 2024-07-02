import { Container, Image, Row } from "react-bootstrap";
import logoHSPC from "../images/hspc.png";
function LoadScreen(){
    return(<div className="d-flex align-items-center justify-content-center" style={{width:"100%",height:"100vh"}}>
        <Container>
            <Row>
                <Image src={logoHSPC} className="m-3"/> 
            </Row>
            <Row>
                <h1 className="row">CARGANDO...</h1>
            </Row>
        </Container>
    </div>)
}

export default LoadScreen