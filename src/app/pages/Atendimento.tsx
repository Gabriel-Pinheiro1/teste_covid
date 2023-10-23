import { useLocation, useNavigate } from "react-router-dom";
import {  Table, Button, Container, Row, Col, Image } from "react-bootstrap";
import { CalcularIdade } from "../components/CalcularIdade";
import { FormTriagem } from "../components/FormTriagem";
import api from "../api/services/api";
import { useState } from "react";
import { HeaderNavbar } from "../components/Navbar";
import {FiTrash, FiUser} from 'react-icons/fi'




export const Atendimento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pacienteInfo = location.state && location.state.paciente;
    const idade = <CalcularIdade data = {pacienteInfo.data_nascimento}/>
    
 
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
          <Container>

          <Container className="bg-primary-subtle ">

              <Row className="text-primary text-center py-3 mt-4">
                <h1>Infomações do paciente</h1>
                <hr />
              </Row>

            <Row>
             <Col className="d-flex justify-content-center pb-5" >
               <Image src={`http://localhost:8000/storage/${pacienteInfo.imagem}`} roundedCircle width={250} height={250} />
            </Col>

             <Col className="pt-5">
                <p><strong>Nome:</strong> {pacienteInfo.nome}</p>
                <p><strong>CPF:</strong> {pacienteInfo.cpf}</p>
                <p><strong>Telefone:</strong> {pacienteInfo.telefone}</p>
               <p><strong>Idade:</strong> <CalcularIdade data= {pacienteInfo.data_nascimento}/> </p>
               <p><strong>Condição:</strong> {pacienteInfo.condicao}</p>
            </Col>

            </Row>

          </Container>

              
              <Row>
                <FormTriagem idade = {idade} id={pacienteInfo.id}/>
              </Row>
              
          
         <Row className="mt-6">
          <h1 className="mt-3 text-center">Consultas anteriores</h1>
               
            <Table striped bordered hover responsive = 'sm'>
              <thead>
                <tr>
                  <th>ID da consulta</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Idade</th>
                  <th>Condição</th>
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
                         <Button variant='primary' onClick={() => handleMostrarAtendimento(atendimento.id)}><FiUser/></Button>
                      </td>
             
                      <td>
                        <Button variant='danger' onClick={()=>handleDeletar(atendimento.id)} ><FiTrash/></Button>
                      </td>
                   </tr>
                   ))}
            </tbody>
            </Table>
         </Row>
      </Container>
        </div>
        
      );
}