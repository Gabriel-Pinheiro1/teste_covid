
import { useState, useEffect } from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import api from '../api/services/api';

type formTriagemProps = {
  idade: any;
  id: number
}

export const FormTriagem: React.FC<formTriagemProps> = ({idade, id}) => {
  console.log(id)
  const age = parseInt(idade)
   const navigate = useNavigate();
    const [pressaoSis, setPressaoSis] = useState(0)
    const [pressaoDis, setPressaoDis] = useState(0)
    const [temperatura, setTemperatura] = useState('0')
    const [fRespiratoria, seFRespiratoria] = useState(0)
    const [fCardiaca, setFCardiaca] = useState(0)
    const [msgSis, setMsgSis] = useState({Text: '', color: 'black'})
    const [msgDis, setMsgDis] = useState({Text: '', color: 'black'})
    const [msgResp, setMsgResp] = useState({Text: '', color: 'black'})
    const [msgTemp, setMsgTemp] = useState({Text: '', color: 'black'})
    
    const [msgCard, setMsgCard] = useState({Text: '', color: 'black'})
    const [sintomas, setSintomas] = useState<SintomasProps> ({
      febre: 0,
      coriza: 0,
      narizEntupido: 0,
      cansaco: 0,
      tosse: 0,
      dorCabeca: 0,
      dorCorpo: 0,
      dorGarganta: 0,
      malEstar: 0,
      dificuldadeRespirar: 0,
      dificuldadeLocomocao: 0,
      faltaPaladar: 0,
      faltaOlfato: 0,
      diarreia: 0
    })
    
    const handleSintoma = (sintoma: keyof SintomasProps) => {
      setSintomas((prevSintomas) => {
        return { ...prevSintomas, [sintoma]:  prevSintomas[sintoma] === 0 ? 1 : 0 };
      });
    };

    
   
    const handleEnviar = async (e: React.FormEvent) => {
     
      const sintomasArray = Object.values(sintomas);
      const countSintoma = sintomasArray.filter((sintoma) => sintoma === 1).length;
      const percentualSintomas = (countSintoma / sintomasArray.length) * 100;
      let condicao = ""
      if(percentualSintomas < 40){

        condicao = "Sintomas insuficientes"
        
      } else if(percentualSintomas < 60){
        condicao = "Potencial infectado"
      } else{
        condicao = "Possível infecatdo"
        
        
      }
      console.log(condicao)
      
      e.preventDefault();
      try{
        await api.post('/atendimentos',{
          paciente_id: id,
          fCardiaca: fCardiaca,
          fRespiratoria: fRespiratoria,
          pressaoSis: pressaoSis,
          pressaoDis: pressaoDis,
          temperatura: temperatura,
          febre: sintomas.febre,
          coriza: sintomas.coriza,
          nariz_entupido:sintomas.narizEntupido,
          cansaco:sintomas.cansaco,
          tosse: sintomas.tosse,
          dor_cabeca: sintomas.dorCabeca,
          dor_corpo: sintomas.dorCorpo,
          dor_garganta: sintomas.dorGarganta,
          mal_estar: sintomas.malEstar,
          dificuldade_respirar: sintomas.dificuldadeRespirar,
          dificuldade_locomocao: sintomas.dificuldadeLocomocao,
          falta_paladar: sintomas.faltaPaladar,
          falta_olfato: sintomas.faltaOlfato,
          diarreia: sintomas.diarreia,
          condicao_atendimento: condicao
        },{ headers: { 'Content-Type': 'multipart/form-data',}})
      } catch(e:any){
        alert("Erro ao cadastrar atendimento" + e.response.data.message)
      }

      try{
        await api.post('/pacientes/' + id, {
          condicao: condicao,
          _method: 'patch'
          
        },{ headers: { 'Content-Type': 'multipart/form-data'}})
        navigate('/home')
      } catch(e:any){
        alert("Erro ao cadastrar condição do paciente" + e.response.data.message)
      }
    };

    useEffect(() => {
      let message = '';
      let color = 'black'
    
      switch (true) {
        case (pressaoSis >= 1 && pressaoSis < 90):
          message = 'Pressão Sistólica abaixo da normalidade (HIPOTENSO)';
          color = 'red';
          break;
    
        case (pressaoSis >= 90 && pressaoSis <= 130):
          message = 'Pressão Sistólica dentro da normalidade (NORMOTENSO)';
          color = 'green';
          break;
    
        case (pressaoSis > 130 && pressaoSis <= 139):
          message = 'Pressão Sistólica no limite da normalidade (NORMOTENSO LIMÍTROFE)';
          color = 'orange';
          break;
    
        case (pressaoSis >= 140 && pressaoSis <= 159):
          message = 'Pressão Sistólica um pouco acima da normalidade (HIPERTENSO LEVE)';
          color = 'red';
          break;
    
        case (pressaoSis >= 160 && pressaoSis <= 179):
          message = 'Pressão Sistólica acima da normalidade (HIPERTENSO MODERADO)';
          color = 'red';
          break;
    
        case (pressaoSis >= 180):
          message = 'Pressão Sistólica muito acima da normalidade (HIPERTENSO GRAVE)';
          color = 'red';
          break;

    
        default:
          message = '';
      }
    
      setMsgSis({Text: message, color: color});
    }, [pressaoSis]);

    useEffect(() => {
      let message = '';
      let color = 'black'
    
      switch (true) {
        case (pressaoDis >= 1 && pressaoDis < 60):
          message = 'Pressão Diastólica abaixo da normalidade (HIPOTENSO)';
          color = 'red';
          break;
    
        case (pressaoDis >= 60 && pressaoDis <= 85):
          message = 'Pressão Diastólica dentro da normalidade (NORMOTENSO)';
          color = 'green';
          break;
    
        case (pressaoDis >= 86 && pressaoDis <= 89):
          message = 'Pressão Diastólica no limite da normalidade (NORMOTENSO LIMÍTROFE)';
          color = 'orange';
          break;
    
        case (pressaoDis >= 90 && pressaoDis <= 99):
          message = 'Pressão Diastólica um pouco acima da normalidade (HIPERTENSO LEVE)';
          color = 'red';
          break;
    
        case (pressaoDis >= 100 && pressaoDis <= 109):
          message = 'Pressão Diastólica acima da normalidade (HIPERTENSO MODERADO)';
          color = 'red';
          break;
    
        case (pressaoDis >= 110):
          message = 'Pressão Diastólica muito acima da normalidade (HIPERTENSO GRAVE)';
          color = 'red';
          break;

    
        default:
          message = '';
      }
    
      setMsgDis({Text: message, color: color});
    }, [pressaoDis]);



  useEffect (()=>{
    let message = '';
    let color = 'black'

    switch(true){
      case fRespiratoria > 0 && fRespiratoria < 14:
        message = 'Frequência respiratória abaixo da normalidade (BRADIPNÉICO)';
        color = 'red';
        break;

      case fRespiratoria >= 14 && fRespiratoria <= 20:
        message = 'Frequência respiratória dentro da normalidade (EUPNÉICO)';
        color = 'green';
        break;

      case fRespiratoria > 20:
        message = 'Frequência respiratória acima  da normalidade (TAQUIPNÉICO)';
        color = 'red';
        break;
      
      default:
        message = '';
        color = ''
    }
    setMsgResp({Text: message, color: color})
  }, [fRespiratoria])


  useEffect(()=>{
    let message = '';
    let color = 'black';

    switch(true){
      case parseFloat(temperatura) >=1 && parseFloat(temperatura) <=35 :
        message = 'Temperatura abaixo da normalidade (HIPOTERMIA)';
        color = 'red';
        break;
      
      case parseFloat(temperatura) > 35 && parseFloat(temperatura) < 37.2:
        message = 'Temperatura dentro da normalidade (AFEBRIL)';
        color = 'green';
        break;

      case parseFloat(temperatura) >= 37.3 && parseFloat(temperatura) <= 37.7:
        message = 'Temperatura um pouco acima da normalidade (ESTADO FEBRIL)';
        color = 'orange';
        break;

      case parseFloat(temperatura) >= 37.8:
        message = 'Temperatura acima da normalidade (FEBRE)';
        color = 'red';
        break;
      
      default:
        message = '';
        color = '';
    }
    setMsgTemp({Text: message, color:color})
  },[temperatura])


  useEffect (() => {
    let message = '';
    let color = 'black';

    if (age <= 12){
      switch(true){
        case fCardiaca >=1 && fCardiaca < 80:
          message = 'Frequência Cardíaca abaixo da normalidade para crianças (BRADICARDÍACO)';
          color = 'red';
          break;
        
        case fCardiaca >= 80 && fCardiaca <= 130:
          message = 'Frequência Cardíaca dentro da normalidade para crianças (NORMOCARDÍACO)';
          color = 'green';
          break;

        case fCardiaca > 130:
          message = 'Frequência Cardíaca acima da normalidade para crianças (TAQUICARDÍACO)'
          color = 'red';
          break;

        default:
          message = '';
          color = '';
      }
        
    } else{
      switch(true){
        case fCardiaca >=1 &&  fCardiaca < 60:
          message = 'Frequência Cardíaca abaixo da normalidade para adultos (BRADICARDÍACO)';
          color = 'red';
          break;
        
        case fCardiaca >= 60 && fCardiaca <= 100:
          message = 'Frequência Cardíaca dentro da normalidade para adultos (NORMOCARDÍACO)';
          color = 'green';
          break;

        case fCardiaca > 100:
          message = 'Frequência Cardíaca acima da normalidade para adultos (TAQUICARDÍACO)'
          color = 'red';
          break;

        default:
          message = '';
          color = '';
      } 
    }
    setMsgCard({Text: message, color: color })
  }, [fCardiaca])

    return (
        
        <Container className="mt-4 ">
          <Form  onSubmit={handleEnviar}>
            <div className="text-center">
              <h2>Formulário de triagem</h2>
            </div>
            <Form.Group  controlId="formPressaoArterialSis">
              <Form.Label>Pressão Arterial Sistólica (SIS)</Form.Label>
              <Form.Control
               type="number"
               placeholder="Digite a pressão arterial Sistólica"
               value={pressaoSis}
               onChange={(e) => setPressaoSis(parseInt(e.target.value))}
                 />
                <span style={{color: msgSis.color}}>{msgSis.Text}</span>
          
            </Form.Group>
            <Form.Group controlId="formPressaoArterialDis">
              <Form.Label><b>Pressão Arterial Diastólica (DIS)</b></Form.Label>
              <Form.Control
               type="number"
               placeholder="Digite a pressão arterial Diastólica"
               value={pressaoDis}
               onChange={(e) => setPressaoDis(parseInt(e.target.value))}
                />
                <span style={{color: msgDis.color}}>{msgDis.Text}</span>
            </Form.Group>
            <Form.Group controlId="formTemperatura">
              <Form.Label>Temperatura</Form.Label>
              <Form.Control
               type="text"
               pattern="[0-9]+([,\.][0-9]+)?"
               placeholder="Digite a Temperatura"
               value={temperatura}
               onChange={(e) =>{
                const valor = e.target.value;
                const valorValido = valor.replace(/[^0-9.]/g, '');
                setTemperatura(valorValido);
               } }
                />
                <span style={{color: msgTemp.color}}>{msgTemp.Text}</span>
            </Form.Group>
            <Form.Group controlId="formFrequenciaRespiratoria">
          
              <Form.Label>Frequência Respiratória</Form.Label>
              <Form.Control
               type="number"
               placeholder="Digite a Frequência Respiratória"
               value={fRespiratoria}
               onChange={(e) => seFRespiratoria(parseInt(e.target.value))}
                />
                <span style={{color: msgResp.color}}>{msgResp.Text}</span>
          
            </Form.Group>
            <Form.Group controlId="formFrequenciaCardiaca">
              <Form.Label>Frequência Cardíaca</Form.Label>
              <Form.Control
               type="number"
               placeholder="Digite a Frequência Cardíaca"
               value={fCardiaca}
               onChange={(e) => setFCardiaca(parseInt(e.target.value))}
                />
                   </Form.Group>
                
              
              
             
             <div className="text-center my-6">
              <h2>Marque os sintomas do paciente</h2>
            </div>
               
                  <Row className="my-3" >
                    <Col md={6} >
                      <Form.Group className = " justify-content-center">
                        <Form.Check
                        
                          type="switch"
                          id="switch-febre"
                          label="Febre"
                          checked = {sintomas.febre === 1}
                          onChange={() => handleSintoma('febre')}
                        />
                        <Form.Check
                        
                           type="switch"
                           id="switch-coriza"
                           label="Coriza"
                           checked = {sintomas.coriza === 1}
                           onChange = {() => handleSintoma('coriza')}
                         />
                        
                        
                          <Form.Check // prettier-ignore
                        
                          type="switch"
                          id="switch-narizE"
                          label="Nariz entupido"
                          checked = {sintomas.narizEntupido === 1}
                          onChange = {() => handleSintoma('narizEntupido')}
                                         />
                                         <Form.Check // prettier-ignore
                        
                          type="switch"
                          id="custom-switch"
                          label="Tosse"
                          checked = {sintomas.tosse === 1}
                          onChange = {() => handleSintoma('tosse')}
                                         />
                                         <Form.Check // prettier-ignore
                        
                          type="switch"
                          id="switch-cansaco"
                          label="Cansaço"
                          checked = {sintomas.cansaco === 1}
                          onChange = {() => handleSintoma('cansaco')}
                                         />
                        <Form.Check // prettier-ignore
                        
                          type="switch"
                          id="switch-dor-corpo"
                          label="Dores no corpo"
                          checked = {sintomas.dorCorpo === 1}
                           onChange = {() => handleSintoma('dorCorpo')}
                        />
                        <Form.Check // prettier-ignore
                        
                          type="switch"
                          id="switch-mal-estar"
                          label="Mal estar geral"
                          checked = {sintomas.malEstar === 1}
                          onChange = {() => handleSintoma('malEstar')}
                         />
                      </Form.Group>
                    </Col>
                  
                  <Col md={6}>
                    <Form.Check // prettier-ignore
                      
                      type="switch"
                      id="switch-dor-garganta"
                      label="Dor de garganta"
                      checked = {sintomas.dorGarganta === 1}
                      onChange = {() => handleSintoma('dorGarganta')}
                                     />
                    <Form.Check // prettier-ignore
                      
                      type="switch"
                      id="switch-dif-respirar"
                      label="Dificuldade de respirar"
                      checked = {sintomas.dificuldadeRespirar === 1}
                      onChange = {() => handleSintoma('dificuldadeRespirar')}
                                     />
                    <Form.Check // prettier-ignore
                      
                      type="switch"
                      id="switch-falta-paladar"
                      label="Fala de paladar"
                      checked = {sintomas.faltaPaladar === 1}
                      onChange = {() => handleSintoma('faltaPaladar')}
                                     />
                    
                    <Form.Check // prettier-ignore
                      
                      type="switch"
                      id="switch-falta-olfato"
                      label="Fala de olfato"
                      checked = {sintomas.faltaOlfato === 1}
                      onChange = {() => handleSintoma('faltaOlfato')}
                                     />
                                     <Form.Check // prettier-ignore
                                     
                      type="switch"
                      id="switch-dif-locomocao"
                      label="Dificuldade de locomoção"
                      checked = {sintomas.dificuldadeLocomocao === 1}
                      onChange = {() => handleSintoma('dificuldadeLocomocao')}
                                     />
                    <Form.Check // prettier-ignore
                      
                      type="switch"
                      id="switch-diarreia"
                      label="Diarreia"
                      checked = {sintomas.diarreia === 1}
                      onChange = {() => handleSintoma('diarreia')}
                      />

                    <Form.Check 
                     
                      type="switch"
                      id="switch-dif-cabeca"
                      label="Dor de cabeça"
                      checked = {sintomas.dorCabeca === 1}
                      onChange = {() => handleSintoma('dorCabeca')}
                      />
                  </Col>

                </Row>
              
                
          
         
            <Button variant="primary" type="submit" className='text-end' >
              Enviar
            </Button>
          </Form>
        </Container>
      );
}