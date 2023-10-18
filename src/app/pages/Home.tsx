import React, { useState, useEffect } from 'react';
import {  Container, Table, Button } from 'react-bootstrap';
import { ModalPacintes } from '../components/ModalPacientes';
import { useNavigate } from 'react-router-dom';
import api from '../api/services/api';
import { CalcularIdade } from '../components/CalcularIdade';
import {FiTrash, FiUser} from 'react-icons/fi'





export const Home: React.FC = () => {
  const [pacientes, setPacientes] = useState<PacienteProps[]>([]);
  const navigate = useNavigate();

  // Função para carregar os pacientes da API 
  
  const carregarPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      setPacientes(response.data.data)
      
    } catch (error: any) {
      if (error.response) {
        console.error('Erro na resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro ao enviar a requisição:', error.message);
      }
    }
  };

  const handleExcluir = async(pacienteID: number) => {
    
    try{
      await api.delete("/pacientes/" + pacienteID);
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== pacienteID);
      setPacientes(updatedPacientes);
    } catch (e: any){
      console.log("Erro ao excluir paciente", e.message)
    }
  }

  const handleAtender = async(pacienteID: number) => {
    try{
      const response = await api.get("/pacientes/" + pacienteID)
      const pacienteInfo = response.data[0]
      console.log(pacienteInfo.id)
      navigate(`/atendimento/${pacienteInfo.id}`, { state: { paciente: pacienteInfo } });
    } catch (e: any){
      console.log("Erro ao excluir paciente", e.message)
    }
  }

  useEffect(() => {
    carregarPacientes();
    
  }, []); // Chamado uma vez quando o componente é montado

  return (
    <Container >
      {}
      <ModalPacintes />

      <Table striped bordered hover responsive = 'sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Condição</th>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.nome}>
              <td>{paciente.id}</td>
              <td>{paciente.nome}</td>
              <td>{paciente.cpf}</td>
              <td>{paciente.telefone}</td>
              <td><CalcularIdade data = {paciente.data_nascimento}/></td>
              <td>{paciente.condicao}</td>
              <td>
                <Button variant='danger' onClick={() =>handleExcluir(paciente.id)}><FiTrash /></Button>
              </td>
              <td>
                <Button variant='primary' onClick={() =>handleAtender(paciente.id)}><FiUser /></Button>
              </td>
              
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

