import { useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CalcularIdade } from "../components/CalcularIdade";
import { FormTriagem } from "../components/FormTriagem";


export const Atendimento = () => {
    const location = useLocation();
    const pacienteInfo = location.state && location.state.paciente;
    const idade = <CalcularIdade data = {pacienteInfo.data_nascimento}/>


    return (
        <Container >
            <Row>
            <Col>
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="" src="../../teste.png" />
              <Card.Body>
                <Card.Title>{pacienteInfo.nome}, {idade}</Card.Title>
                <Card.Text>
                  <hr />
                  CPF: {pacienteInfo.cpf}
                  <hr />
                  Telefone: {pacienteInfo.telefone}
                  <hr/>
                  Condição: {pacienteInfo.condicao}

                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col>
            <FormTriagem idade = {idade}/>
            </Col>
            
            </Row>
        </Container>
        
      );
}