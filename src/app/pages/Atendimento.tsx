import { useLocation } from "react-router-dom";
import { CalcularIdade } from "../components/CalcularIdade";

export const Atendimento = () => {
    const location = useLocation();
    const pacienteInfo = location.state && location.state.paciente;

    return (
        <div>
            <p>Nome: {pacienteInfo.nome}</p> 
            <p>CPF: {pacienteInfo.cpf}</p>
            <p>Idade: {<CalcularIdade data={pacienteInfo.data_nascimento}/>}</p> 
            <p>Telefone: {pacienteInfo.telefone}</p> 
            <p>Condição: {pacienteInfo.condicao}</p>  
        </div>
    );
}