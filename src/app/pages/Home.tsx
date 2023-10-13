import React, { useState, useEffect } from 'react';
import {  Container, Table } from 'react-bootstrap';
import { ModalPacintes } from '../components/ModalPacientes';
import api from '../api/services/api';
import { CalcularIdade } from '../components/CalcularIdade';




export const Home: React.FC = () => {
  const [pacientes, setPacientes] = useState<PacienteProps[]>([]);

  // Função para carregar os pacientes da API 
  
  const carregarPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      //console.log(response)
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
              
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

