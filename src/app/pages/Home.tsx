import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/services/api';
import { CalcularIdade } from '../components/CalcularIdade';
import { FiTrash } from 'react-icons/fi'
import { FaArrowRight, FaPencilAlt } from 'react-icons/fa';
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
      setPacientes(response.data[0])

    } catch (e: any) {
      alert("Problemas ao carregar lista de usuários" + e.response.data.message)
    }
  };

  const handleExcluir = async (pacienteID: number,) => {

    try {
      await api.delete("/pacientes/" + pacienteID);
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== pacienteID);
      setPacientes(updatedPacientes);
    } catch (e: any) {
    
    }
  }

  const handleAtender = async (pacienteID: number, rota: string) => {
    try {
      const response = await api.get("/pacientes/" + pacienteID)
      const pacienteInfo = response.data[0]
    
      navigate(rota + pacienteID, { state: { paciente: pacienteInfo } });
    } catch (e: any) {
      
    }
  }

  useEffect(() => {
    carregarPacientes();

  }, [state.novoPacienteCadastrado]);

  return (

    <div>

      <HeaderNavbar page='home' />

      <Container >


      <Row>
        <h1 className=' text-primary-emphasis text-center mt-5'>Pacientes cadastrados</h1>
        <hr />
      </Row>
    
    {pacientes.length === 0? 
      (<p>No momento não existem pacientes cadastrados</p>) :
       (<p>Número de paciaentes:{pacientes.length}</p>)
    }

        <Row>
          <Table striped bordered hover responsive='sm'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Idade</th>
                <th>Condição</th>
               
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.nome}>
                  <td>{paciente.nome}</td>
                  <td>{paciente.cpf}</td>
                  <td>{paciente.telefone}</td>
                  <td><CalcularIdade data={paciente.data_nascimento} /></td>
                  <td>{paciente.condicao}</td>
                  <td>
                    <Button variant='primary' onClick={() => handleAtender(paciente.id, "/atendimento/")}><FaArrowRight /></Button>
                  </td>
                  <td>
                    <Button variant='success' onClick={() => handleAtender(paciente.id, "/editarPaciente/")}><FaPencilAlt /></Button>
                  </td>
                  <td>
                    <Button variant='danger' onClick={() => handleExcluir(paciente.id)}><FiTrash /></Button>
                  </td>
                  {/* Adicione mais colunas conforme necessário */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );

};