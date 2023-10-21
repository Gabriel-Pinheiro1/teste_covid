import React, { useState, useEffect } from 'react';
import {  Container, Table, Button } from 'react-bootstrap';
import { ModalPacintes } from '../components/ModalPacientes';
import { useNavigate } from 'react-router-dom';
import api from '../api/services/api';
import { CalcularIdade } from '../components/CalcularIdade';
import {FiTrash, FiUser} from 'react-icons/fi'
import { HeaderNavbar } from '../components/Navbar';
import { useSharedState } from '../contexts/StateContext';





export const Home: React.FC = () => {
  const [pacientes, setPacientes] = useState<PacienteProps[]>([]);
  const navigate = useNavigate();
  const { state } = useSharedState();

  // Função para carregar os pacientes da API 
  
  const carregarPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      setPacientes(response.data.data)
      
    } catch (e: any) {
      alert("Problemas ao carregar lista de usuários" + e.response.data.message)
    }
  };

  const handleExcluir = async(pacienteID: number, ) => {
    
    try{
      await api.delete("/pacientes/" + pacienteID);
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== pacienteID);
      setPacientes(updatedPacientes);
    } catch (e: any){
      console.log("Erro ao excluir o resgistro do paciente", e.message)
    }
  }

  const handleAtender = async(pacienteID: number, rota: string) => {
    try{
      const response = await api.get("/pacientes/" + pacienteID)
      const pacienteInfo = response.data[0]
      console.log(pacienteInfo.id)
      navigate(rota + pacienteID, { state: { paciente: pacienteInfo } });
    } catch (e: any){
      console.log("Erro ao atender o paciente", e.message)
    }
  }

  useEffect(() => {
    carregarPacientes();
    
  }, [state.novoPacienteCadastrado]); 

  return (
    
    <div>
   
      <HeaderNavbar/>

      <Container >

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
                  <Button variant='primary' onClick={() =>handleAtender(paciente.id, "/atendimento/")}><FiUser /></Button>
                </td>
                <td>
                  <Button variant='success' onClick={() =>handleAtender(paciente.id, "/editarPaciente/")}><FiUser /></Button>
                </td>
      
                {/* Adicione mais colunas conforme necessário */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
  
};

