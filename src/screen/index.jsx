import { Image, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoHSPC from "../images/hspc.png"
import logoUCEN from "../images/ucen.png"

const styles = {
    cabezera:{
        height:"16.75vh"

    }
}

function Screen(){
    return(
        <div>{/* cuadro de la pantalla */}
            <Container xl={12} style={styles.cabezera}>{/* Información piso y reloj */}
                <Row className={"d-flex justify-content-around p-3 "/*+ "border border-primary" */}>
                    <Col xs={3} md={2}><Image src={logoUCEN} style={styles.cabezera}/></Col>{/* Logo UCentral */}
                    <Col className="d-flex align-items-center justify-content-center" xs={6}>
                        <Container >
                            <Row><Col><h1 className="fs-3">{"Sala de espera: Piso "+3}</h1></Col></Row>
                            <Row><Col>{"Martes 28 de Mayo de 2024"}</Col></Row>
                            <Row><Col>{"11:30"}</Col></Row>
                        </Container>
                    </Col>
                    <Col xs={3} md={2}><Image src={logoHSPC}  style={styles.cabezera}/></Col>{/* Logo HSPablo */}
                </Row>
            </Container>
            <Container></Container>{/* tabla paciente X especialista */}
            <Container></Container>{/* tabla paciente X llamado */}
            <Container></Container>{/* info de tabla */}
        </div>
    )
}

export default Screen;