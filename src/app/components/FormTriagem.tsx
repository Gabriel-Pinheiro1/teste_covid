
import { useState, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap'

type formTriagemProps = {
  idade: any;
}

export const FormTriagem: React.FC<formTriagemProps> = ({idade}) => {
    const [pressaoSis, setPressaoSis] = useState(0)
    const [pressaoDis, setPressaoDis] = useState(0)
    const [temperatura, setTemperatura] = useState('0')
    const [fRespiratoria, seFRespiratoria] = useState(0)
    const [fRCardiaca, setFCardiaca] = useState(0)
    const [msgSis, setMsgSis] = useState({Text: '', color: 'black'})
    const [msgDis, setMsgDis] = useState({Text: '', color: 'black'})
    const [msgResp, setMsgResp] = useState({Text: '', color: 'black'})
    const [msgTemp, setMsgTemp] = useState({Text: '', color: 'black'})
    const [msgCard, setMsgCard] = useState({Text: '', color: 'black'})


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
  }, [{fRespiratoria}])


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

    if (parseInt(idade) <=12){
      switch(true){
        case fRCardiaca >=1 && fRCardiaca < 80:
          message = 'Frequência Cardíaca abaixo da normalidade para crianças (BRADICARDÍACO)';
          color = 'red';
          break;
        
        case fRCardiaca >= 80 && fRCardiaca <= 130:
          message = 'Frequência Cardíaca dentro da normalidade para crianças (NORMOCARDÍACO)';
          color = 'green';
          break;

        case fRCardiaca > 130:
          message = 'Frequência Cardíaca acima da normalidade para crianças (TAQUICARDÍACO)'
          color = 'red';
          break;

        default:
          message = '';
          color = '';
      }
        
    } else{
      switch(true){
        case fRCardiaca >=1 &&  fRCardiaca < 60:
          message = 'Frequência Cardíaca abaixo da normalidade para adultos (BRADICARDÍACO)';
          color = 'red';
          break;
        
        case fRCardiaca >= 60 && fRCardiaca <= 100:
          message = 'Frequência Cardíaca dentro da normalidade para adultos (NORMOCARDÍACO)';
          color = 'green';
          break;

        case fRCardiaca > 100:
          message = 'Frequência Cardíaca acima da normalidade para adultos (TAQUICARDÍACO)'
          color = 'red';
          break;

        default:
          message = '';
          color = '';
      } 
    }
    setMsgCard({Text: message, color: color })
  }, [fRCardiaca])

    return (
        <Form>   
          <Form.Group controlId="formPressaoArterialSis">
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
             pattern="[0-9]+([,\\.][0-9]+)?"  // Permite números inteiros e decimais com ponto ou vírgula
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
             value={fRCardiaca}
             onChange={(e) => setFCardiaca(parseInt(e.target.value))}
              />
              <span style={{color: msgCard.color}}> {msgCard.Text}</span>
              
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      );
}