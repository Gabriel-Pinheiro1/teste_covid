import React from 'react';

type CalcularIdadeProps = {
  data: string; 
}

export const CalcularIdade: React.FC<CalcularIdadeProps> = ({ data }) => {
  const calcularIdade = (dataNascimento: string): number | null => {
    const dataAtual = new Date();
    const nascimento = new Date(dataNascimento);

    if (isNaN(nascimento.getTime())) {
      return null;
    }

    let idade = dataAtual.getFullYear() - nascimento.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const mesNascimento = nascimento.getMonth() + 1;

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const idade = calcularIdade(data);

  return (
    <span>
      {idade !== null ? (
        `${idade} anos`
      ) : (
        'Data de nascimento inválida'
      )}
    </span>
  );
};

