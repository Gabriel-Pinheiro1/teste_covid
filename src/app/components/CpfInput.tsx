import React, { useState } from 'react';

type CpfInputProps = {
  value: string;
  onChange: (value: string) => void;
}

export const CpfInput: React.FC<CpfInputProps> = ({ value, onChange }) => {
  const formatCpf = (value: string) => {
    // Remove qualquer caracter que não seja número
    const numbersOnly = value.replace(/[^\d]/g, '');

    // Formata o CPF: 000.000.000-00
    let formatted = '';
    if (numbersOnly.length > 3) {
      formatted += numbersOnly.substring(0, 3) + '.';
      if (numbersOnly.length > 6) {
        formatted += numbersOnly.substring(3, 6) + '.';
        formatted += numbersOnly.substring(6, 9) + '-';
        formatted += numbersOnly.substring(9, 11);
      } else {
        formatted += numbersOnly.substring(3, 6);
      }
    } else {
      formatted = numbersOnly;
    }

    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatCpf(e.target.value);
    onChange(newValue);
  };

  return (
    <input 
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Digite o CPF"
      className= 'form-control'
    />
  );
};

