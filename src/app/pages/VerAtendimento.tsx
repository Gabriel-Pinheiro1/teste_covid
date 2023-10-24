import { Container, Image, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { HeaderNavbar } from "../components/Navbar";
import { CalcularIdade } from "../components/CalcularIdade";
export const VerAtendimento = () => {
  const location = useLocation();
  const atendimentoInfo = location.state && location.state.atendimento;




  return (
    <div>
      <HeaderNavbar />
      <Container className="bg-primary-subtle ">

        <Row className="text-primary-emphasis text-center py-3 mt-4 mb-4">
          <h1>Infomações do paciente</h1>
          <hr />
        </Row>

        <Row>
          <Col className="d-flex justify-content-center pb-5" >
            <Image src={`http://localhost:8000/storage/${atendimentoInfo.paciente.imagem}`} roundedCircle width={250} height={250} />
          </Col>

          <Col className=" text-center">
            <p><strong>Nome:</strong> {atendimentoInfo.paciente.nome}</p>
            <p><strong>CPF:</strong> {atendimentoInfo.paciente.cpf}</p>
            <p><strong>Telefone:</strong> {atendimentoInfo.paciente.telefone}</p>
            <p><strong>Idade:</strong> <CalcularIdade data={atendimentoInfo.paciente.data_nascimento} /> </p>
            <p><strong>Condição:</strong> {atendimentoInfo.paciente.condicao}</p>
          </Col>

          <hr />
          <h1 className="text-primary-emphasis text-center  m-4">Informações da consulta</h1>
          <hr />
          <h3 className="text-primary-emphasis text-center">Condição: {atendimentoInfo.condicao_atendimento}</h3>
          <Col className="text-center">
            <h3 className=" text-primary-emphasis text-center pb-3">Triagem</h3>
            <p className="pb-3"> <strong> Pressão Sistólica:</strong> {atendimentoInfo.pressaoSis} </p>
            <p className="pb-3"> <strong> Pressão Diastólica:</strong> {atendimentoInfo.pressaoDis} </p>
            <p className="pb-3"> <strong> Temperatura:</strong> {atendimentoInfo.temperatura} </p>
            <p className="pb-3"> <strong> Frequência Respiratória:</strong> {atendimentoInfo.fRespiratoria} </p>
            <p className="pb-3"> <strong> Frequência Cardíaca:</strong> {atendimentoInfo.fCardiaca} </p>
          </Col>
          <Col className="text-center">
            <h3 className=" text-primary-emphasis text-center pb-3">Sintomas</h3>

            {atendimentoInfo.febre === 1 && (
              <p>Febre</p>
            )}

            {atendimentoInfo.coriza === 1 && (
              <p>Coriza</p>
            )}
            {atendimentoInfo.cansaco === 1 && (
              <p>Cansaço</p>
            )}

            {atendimentoInfo.nariz_entupido === 1 && (
              <p>Nariz entupido</p>
            )}

            {atendimentoInfo.dor_cabeca === 1 && (
              <p>Dor de cabeça</p>
            )}

            {atendimentoInfo.dor_corpo === 1 && (
              <p>Dor no corpo</p>
            )}

            {atendimentoInfo.dor_garganta === 1 && (
              <p>Dor de garganta</p>
            )}

            {atendimentoInfo.dificuldade_locomocao === 1 && (
              <p>Dificuldade de locomoção</p>
            )}
            {atendimentoInfo.dificuldade_respirar === 1 && (
              <p>Dificuldade para respirar</p>
            )}
            {atendimentoInfo.diarreia === 1 && (
              <p>Diarreia</p>
            )}
            {atendimentoInfo.falta_olfato === 1 && (
              <p>Falta de olfato</p>
            )}
            {atendimentoInfo.falta_paladar === 1 && (
              <p>Falta de paladar</p>
            )}
            {atendimentoInfo.mal_estar === 1 && (
              <p>Mal estar</p>
            )}
            {atendimentoInfo.tosse === 1 && (
              <p>Tosse</p>
            )}


          </Col>

        </Row>



      </Container>
     
    </div>
  );
}