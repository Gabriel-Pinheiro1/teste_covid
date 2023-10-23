import { Container, Image, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { HeaderNavbar } from "../components/Navbar";
import { CalcularIdade } from "../components/CalcularIdade";
export const VerAtendimento = () => {
    const location = useLocation();
    const atendimentoInfo = location.state && location.state.atendimento;
    
    const sintomas = Object.keys(atendimentoInfo).filter((key) => atendimentoInfo[key] === 1);
    console.log(sintomas)
  
    
    return(
        <div>
            <HeaderNavbar/>
            <Container className="bg-primary-subtle ">

              <Row className="text-primary text-center py-3 mt-4 mb-4">
                <h1>Infomações do paciente</h1>
                <hr />
              </Row>

            <Row>
             <Col className="d-flex justify-content-center pb-5" >
               <Image src={`http://localhost:8000/storage/${atendimentoInfo.paciente.imagem}`} roundedCircle width={250} height={250} />
            </Col>

             <Col className="pt-5">
                <p><strong>Nome:</strong> {atendimentoInfo.paciente.nome}</p>
                <p><strong>CPF:</strong> {atendimentoInfo.paciente.cpf}</p>
                <p><strong>Telefone:</strong> {atendimentoInfo.paciente.telefone}</p>
               <p><strong>Idade:</strong> <CalcularIdade data= {atendimentoInfo.paciente.data_nascimento}/> </p>
               <p><strong>Condição:</strong> {atendimentoInfo.paciente.condicao}</p>
            </Col>

            <hr />
            <h1 className="text-primary text-center py-3 mt-4">Informações da consulta</h1>
            <h3 className="text-center">Condição: {atendimentoInfo.condicao_atendimento}</h3>
            <Col >
                <h3 className="text-center">Triagem</h3>
                <p className="pb-3"> <strong> Pressão Sistólica:</strong> {atendimentoInfo.pressaoSis} </p>
                <p className="pb-3"> <strong> Pressão Distólica:</strong> {atendimentoInfo.pressaoDis} </p>
                <p className="pb-3"> <strong> Temperatura:</strong> {atendimentoInfo.temperatura} </p>
                <p className="pb-3"> <strong> Frequência Respiratória:</strong> {atendimentoInfo.fRespiratoria} </p>
                <p className="pb-3"> <strong> Frequência Cardíaca:</strong> {atendimentoInfo.fCardiaca} </p>
            </Col>
            <Col>
                <h3 className="text-center">Sintomas</h3>

                <ul>
                    {sintomas.map((sintoma) => (
                        <li className="" key={sintoma}><strong>{sintoma}</strong></li>
                     ))}
                </ul>
                
            </Col>

            </Row>

            

          </Container>
          <h1>oiiii</h1>
        </div>
    );
}