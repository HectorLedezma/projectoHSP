import { Col, Container, Image, Row } from "react-bootstrap";
import logoHSPC from "../images/hspc.png";
import logoUCEN from "../images/ucen.png";
import "../styles/color.css"

function Encabezado(props){
    return(
        <div className="d-flex justify-content-center sticky-top fondo z-4">{/* Información piso y reloj */}
            <Row xl={12} className="header-container d-flex justify-content-around border border-primary">
                <Col xl={3} className="d-flex align-items-center justify-content-center"><Image src={logoUCEN} className="imagen m-0"/></Col>{/* Logo UCentral */}
                <Col className="d-flex align-items-center justify-content-center p-3" xl={6}>
                    <Container>
                        <Row><Col><h1 className="fs-1 fw-bold">{props.titulo}</h1></Col></Row>{/* Nombre de sala de espera */}
                        {/*<Row><Col><h2 className="fs-5">{fecha}</h2></Col></Row>{/* Fecha
                        <Row><Col><h2 className="fs-5">{hora}</h2></Col></Row>{/* Hora */}
                    </Container>
                </Col>
                <Col xl={3} className=" d-flex align-items-center justify-content-center"><Image src={logoHSPC} className="imagen m-0"/></Col>{/* Logo HSPablo */}
            </Row>
        </div>
    )
}

export default Encabezado;