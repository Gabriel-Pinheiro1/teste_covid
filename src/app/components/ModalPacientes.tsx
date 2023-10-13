import React, { useState } from 'react';

import { Button, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import api from '../api/services/api';
import { CpfInput } from './CpfInput';
import { PhoneInput } from './PhoneInput';

export const ModalPacintes: React.FC = () => {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('')
  const [imagem, setImagem] = useState<File | null>(null);
  const condicao = 'Não Atendido'


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCpfChange = (formattedCpf: string) => {
    setCpf(formattedCpf);
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await api.post('/pacientes',{
        nome: nome,
        cpf: cpf,
        data_nascimento: data_nascimento,
        telefone: telefone,
        imagem: imagem,
        condicao: condicao,
      }, { headers: { 'Content-Type': 'multipart/form-data',}});
      console.log('Dados enviados com sucesso:', response.data);
      handleClose(); // Fecha o modal após o envio
    } catch (e: any) {
      console.error('Erro ao enviar os dados:', e.message);
      alert("Erro, ao enviar os dados, por favor revise os parametros passsados");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastrar Paciente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                placeholder="Digite o nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDataNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={data_nascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCpf">
              <Form.Label>CPF</Form.Label>
              <CpfInput value={cpf} onChange={handleCpfChange} />
            </Form.Group>
            <Form.Group controlId='formTelefone'>
              <Form.Label>Telefone</Form.Label>
                <PhoneInput
                  value= {telefone}
                  onChange={setTelefone}
                />
            </Form.Group>
            <Form.Group controlId="formImagem">
              <Form.Label>Imagem</Form.Label>
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
            
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
