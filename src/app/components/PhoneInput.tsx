interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
    const formatPhone = (value: string) => {
      // Remove qualquer caracter que não seja número
      const numbersOnly = value.replace(/[^\d]/g, '');
  
      // Aplica a máscara "(00) 99999-9999"
      let formatted = '';
      if (numbersOnly.length > 2) {
        formatted += `(${numbersOnly.substring(0, 2)}) `;
        if (numbersOnly.length > 7) {
          formatted += `${numbersOnly.substring(2, 7)}-`;
          formatted += numbersOnly.substring(7, 11);
        } else {
          formatted += numbersOnly.substring(2, 7);
        }
      } else {
        formatted = numbersOnly;
      }
  
      return formatted;
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = formatPhone(e.target.value);
      onChange(newValue);
    };
  
    return (
      <input 
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="(00) 99999-9999"
        className="form-control"
      />
    );
  };