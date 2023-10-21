import { useLocation, useNavigate } from "react-router-dom";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import { CalcularIdade } from "../components/CalcularIdade";
import { FormTriagem } from "../components/FormTriagem";
import api from "../api/services/api";
import axios from "axios";
import { useState } from "react";
import { HeaderNavbar } from "../components/Navbar";



export const Atendimento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pacienteInfo = location.state && location.state.paciente;
    const idade = <CalcularIdade data = {pacienteInfo.data_nascimento}/>
    
    //const atendimentos = pacienteInfo.atendimentos;
    const [atendimentos, setAtendimentos] = useState(pacienteInfo.atendimentos)
   
  const handleDeletar = async(atendimentoId: number) => {
    try{
      await api.delete('/atendimentos/' + atendimentoId);

        const updatedAtendimento = atendimentos.filter((atendimento: any) => atendimento.id !== atendimentoId)
        setAtendimentos(updatedAtendimento);

    } catch(e: any){
      alert("Erro ao deletar atendimento" + e.response.data.message)
    }
  }

  const handleMostrarAtendimento = async(atendimentoID: number) => {
    try{
      const response = await api.get('/atendimentos/' + atendimentoID);
      const atendimentoInfo = response.data[0];
      console.log(atendimentoInfo);
      
      navigate('/verAtendimento/' + atendimentoID, { state: { atendimento: atendimentoInfo } });

    } catch (e: any){
      alert("Erro ao visualizar atendimento" + e.response.data.message);
    }
  }

    return (
        <div>
          <HeaderNavbar/>
          <Container >
              <Row>
              <Col>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="" src={`http://localhost:8000/storage/${pacienteInfo.imagem}`} />
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
              <FormTriagem idade = {idade} id={pacienteInfo.id}/>
              </Col>
          
              </Row>
              <Table striped bordered hover responsive = 'sm'>
          <thead>
            <tr>
              <th>ID da consulta</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Idade</th>
              <th>Condição</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((atendimento: any) => (
              <tr key={atendimento.id}>
                <td>{atendimento.id}</td>
                <td>{pacienteInfo.nome}</td>
                <td>{pacienteInfo.cpf}</td>
                <td>{pacienteInfo.telefone}</td>
                <td>{idade}</td>
                <td>{atendimento.condicao_atendimento}</td>
          
                <td>
                  <Button variant='danger' onClick={()=>handleDeletar(atendimento.id)} >oi</Button>
                </td>
                <td>
                  <Button variant='primary' onClick={() => handleMostrarAtendimento(atendimento.id)}>oi</Button>
                </td>
          
                {/* Adicione mais colunas conforme necessário */}
              </tr>
            ))}
          </tbody>
                </Table>
          </Container>
        </div>
        
      );
}