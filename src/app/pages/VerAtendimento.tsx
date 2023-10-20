import { Container, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const VerAtendimento = () => {
    const location = useLocation();
    const atendimentoInfo = location.state && location.state.atendimento;
    console.log(atendimentoInfo)

    return(
        <Container>
            <p>{atendimentoInfo.paciente.nome}</p>
            <p>{atendimentoInfo.paciente.telefone}</p>
            <p>{atendimentoInfo.paciente.cpf}</p>
            <Image src={`http://localhost:8000/storage/${atendimentoInfo.paciente.imagem}`}></Image>
            <p>{atendimentoInfo.paciente.nome}</p>
            <p>{atendimentoInfo.fCardiaca}</p>
        </Container>
    );
}