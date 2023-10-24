import { Container, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CpfInput } from "../components/CpfInput";
import { PhoneInput } from "../components/PhoneInput";
import { HeaderNavbar } from "../components/Navbar";
import api from "../api/services/api";


export const EditarPaciente = () =>{
    const location = useLocation();
    const pacienteInfo = location.state && location.state.paciente;
    const navigate = useNavigate()
    const [nome, setNome] = useState(pacienteInfo.nome);
    const [data_nascimento, setDataNascimento] = useState(pacienteInfo.data_nascimento);
    const [cpf, setCpf] = useState(pacienteInfo.cpf);
    const [telefone, setTelefone] = useState(pacienteInfo.telefone)
    const [imagem, setImagem] = useState<File | null>(null);
   

    
    const handleEditar = async(e: React.FormEvent) =>{
        e.preventDefault();
        
        if (imagem === null){
            try{
                await api.post("/pacientes/" + pacienteInfo.id , {
                    nome: nome,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    telefone: telefone,
                    _method: 'patch'
                },{headers: { 'Content-Type': 'multipart/form-data'}})
                navigate('/home')

            } catch(e: any){
                alert('Erro ao atualizar informações do paciente' + e.response.data.message);
            }
        } else {
            try{
                await api.post("/pacientes/" + pacienteInfo.id , {
                    nome: nome,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    telefone: telefone,
                    imagem: imagem,
                    _method: 'patch'
                },{headers: { 'Content-Type': 'multipart/form-data'}})
                navigate('/home')

            } catch(e: any){
                alert('Erro ao atualizar informações do paciente' + e.response.data.message);
            }
        }

    }
    return(

        <div>
          <HeaderNavbar/>
          <Container>
          
              <Form onSubmit={handleEditar}>
              <div className="m-3 text-center"><h1>Editar Paciente</h1></div>
              <Form.Group controlId="nomePaciente">
              <Form.Label><strong> Nome </strong></Form.Label>
                <Form.Control
                 value={nome}
                 onChange={(e) => setNome(e.target.value)}
                   />
              </Form.Group>
              <Form.Group controlId="cpfPaciente">
              <Form.Label><strong>CPF</strong></Form.Label>
                <CpfInput
                  value={cpf}
                  onChange={setCpf}
                />
              </Form.Group>
              <Form.Group controlId="formPressaoArterialSis">
              <Form.Label><strong>Telefone</strong></Form.Label>
                <PhoneInput
                  value={telefone}
                  onChange={setTelefone}
                />
              </Form.Group>
              <Form.Group controlId="formPressaoArterialSis">
              <Form.Label><strong>Data de nascimento</strong></Form.Label>
                <Form.Control
                 type="date"
                 value={data_nascimento}
                 onChange={(e) => setDataNascimento(e.target.value)}
                   />
              </Form.Group>
              <Form.Group controlId="formPressaoArterialSis">
              <Form.Label><strong>Foto do paciente</strong></Form.Label>
                <Form.Control
                 type="file"
                 accept="image/*"
                 onChange={(e) => {
                  const input = e.target as HTMLInputElement;
                  if (input.files) {
                    setImagem(input.files[0]);
                  }
                }}
                   />
              </Form.Group>
              <Button variant="primary" type="submit" >
                Atualizar
              </Button>
              </Form>
          </Container>
        </div>
    );
}