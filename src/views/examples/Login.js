import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert ,
  Modal, ModalBody, ModalHeader
} from "reactstrap";

import ReCAPTCHA from "react-google-recaptcha";
//import ImgFallback from 'react-img-fallback';
import ReactImageFallback from "react-image-fallback";
import { SpinnerCircular } from 'spinners-react';
import { useAuth } from "../../providers/auth";
//import ImageFallBack from "../../../public/assets/img/logos/inspira.png";


const initialvalue = {
  usuario : '',
  senha : '',
}

const Login = (props) => {
  const [values, setValues] = useState(initialvalue);
  const [isloading, setIsloading] = useState(null);
  const [loginerro, setLoginErro] = useState(false);
  const [loginmsg, setLoginmsg] = useState(false);
  const [isLoadColigadas, setIsLoadColigadas] = useState(false);
  const [codturma, setcodturma] = useState("");
  const [codperlet, setcodperlet] = useState("");
  const [codcoligada, setCodColigada] = useState("");
  const [recaptcha, setReCaptcha] = useState(null);
  const [imageSrc, setimageSrc] = useState("");
  const [rscoligadas, setRscoligadas] = useState([]);
  const history = useHistory();

  const { user, setUser } = useAuth();

  function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
  }

  useEffect(() => {
    var data = new Date();
    var ano = data.getFullYear();
    const search = props.location.search; 
    const params = new URLSearchParams(search);
    const auth_token = params.get('auth_token');
    
    if (auth_token !== null) {
      // console.log(auth_token)
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "ci_session=7ma2vj8c182lrc800v3fedf28s7tpvmr");

      var formdata = new FormData();
      formdata.append("auth_token", auth_token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/accessvalidation", requestOptions)
        .then(response => response.json())
        .then(result => { 
          if (result.status_code == "400") {
            console.log({"erro": "Falha no login"})
          } else {
            console.log(result.result[0].DTNASCLOGIN)
            console.log(result)
      
            setIsloading(true);
            
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "usuario": result.result[0].RA,
                "senha": result.result[0].DTNASCLOGIN
              }),
            };
            fetch('https://suporteinspira.com.br/api/meuboleto/index.php/api/login', requestOptions)
            .then(response => response.json())
            .then(
              result => { 
                if (result.status_code == "400") {
                  setIsloading(false);
                  setLoginErro(true);
                  setLoginmsg('Falha: login ou senha inválidos!!!');
                } else {
                  setLoginErro(false);
        
                  var data = new Date();
                  var ano = data.getFullYear();
        
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Cookie", "ci_session=k936k3fovb8oeh3ae9f5aa1af90kbai5");
        
                  var raw = JSON.stringify(
                    {
                      "ra":result.dados[0].RA,
                      "codperlet":ano
                    });
        
                  var paramsTurmaAtual = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };
        
                  fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/selecionaturmaatual", paramsTurmaAtual)
                    .then(response => response.json())
                    .then(resturma => {
                        if (resturma.status_code == "400") {
                          console.log('Não encotrou turma para este período letívo.');
                          setLoginErro(true);
                          setLoginmsg('Falha: Não encotramos uma matrícula ativa em uma turma para este período letívo.');
                          setIsloading(false);
                        } else {
                          localStorage.setItem('@meuboleto/turma', resturma.dados[0].CODTURMA);
                          localStorage.setItem('@meuboleto/perlet', resturma.dados[0].CODPERLET);
                          localStorage.setItem('@meuboleto-app/coligada', resturma.dados[0].CODCOLIGADA);
                          localStorage.setItem('@meuboleto-app/filial', resturma.dados[0].CODFILIAL);
                          setcodturma(resturma.dados[0].CODTURMA);
                          setcodperlet(resturma.dados[0].CODPERLET);
                          // setUser({
                          //   turma: resturma.dados[0].CODTURMA,
                          //   perlet: resturma.dados[0].CODPERLET
                          // });


                          localStorage.setItem('@meuboleto/ra', result.dados[0].RA);
                          localStorage.setItem('@meuboleto/nome', result.dados[0].NOME);
                          localStorage.setItem('@meuboleto/dtnasc', result.dados[0].DTNASC);
                          localStorage.setItem('@meuboleto/email', result.dados[0].EMAIL);
                          localStorage.setItem('@meuboleto/logado', true);
                          
                          setUser({
                            logado: false,
                            nome: result.dados[0].NOME,
                            ra: result.dados[0].RA,
                            email: result.dados[0].EMAIL,
                            dtnasc: result.dados[0].DTNASC,
                            turma: "",
                            perlet: ""
                          });
                          history.push('/admin/index');
                        }
                      })
                    .catch(error => console.log('error', error));
        
                  
        
                  //history.push('/admin/index');
                }
              }
            );
          }
        })
        .catch(error => {
          // console.log({"erro": "Token inválido"})
          setLoginErro(true);
          setLoginmsg('Falha: Token inválido!');
          setIsloading(false);
        });
      
      
    } else {
      console.log('Não tem nada')
    }

    setCodColigada(params.get('coligada'));

    setIsLoadColigadas(true);

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=liou8oqnllbi55sskahpnjsd8mg17vi0");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/getcoligadas", requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoadColigadas(false);
        //console.log(result);
        setRscoligadas(result.dados);
      })
      .catch(error => {
        setIsLoadColigadas(false);
        console.log('error', error)
      });

    checkImage(`https://boletoonline.suporteinspira.com.br/assets/img/logos/${localStorage.getItem("@meuboleto-app/coligada")}.png`, 
      function(){ 
        // console.log('Tudo certo com a imagem');
        setimageSrc(`https://boletoonline.suporteinspira.com.br/assets/img/logos/${localStorage.getItem("@meuboleto-app/coligada")}.png`)
      }, 
      function(){ 
        // console.log('Deu xabú');
        setimageSrc(`https://boletoonline.suporteinspira.com.br/assets/img/logos/12.png`);
    });
    
  }, []);

  
  function onChange(ev){
    const {name, value} = ev.target;
    setValues({ ...values, [name]: value });
    // console.log("Captcha value:", values);
  } 
  
  function onChangeColigada(ev){
    // console.log(ev.target.value);
    // history.push(`/auth/login?coligada=${ev.target.value}`);
    window.location.href = `/auth/login?coligada=${ev.target.value}`;
    let idx = ev.target.selectedIndex;
	  let dataset = ev.target.options[idx].dataset;
  } 

  function onChangeRe(value) {
    // console.log('Captcha value:', value);
    setReCaptcha(value);
    if (value){
      setLoginErro(false);
      setLoginmsg('');
      setIsloading(false);
    } else {
      setLoginErro(true);
      setLoginmsg('Falha: Você deve validar o reCAPTCHA!');
      setIsloading(false);
    }
  }

  async function onSubmit(ev){
    ev.preventDefault();
    setIsloading(true);
    
    if (values.usuario === ""){
      setLoginErro(true);
      setLoginmsg('Falha: Você deve informar um usuário!');
      setIsloading(false);
    } else if (values.usuario === ""){
      setLoginErro(true);
      setLoginmsg('Falha: Você deve informar a senha!');
      setIsloading(false);
    } else {
      if (recaptcha){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        };
        fetch('https://suporteinspira.com.br/api/meuboleto/index.php/api/login', requestOptions)
        .then(response => response.json())
        .then(
          result => { 
            if (result.status_code == "400") {
              setIsloading(false);
              setLoginErro(true);
              setLoginmsg('Falha: login ou senha inválidos!!!');
            } else {
              setLoginErro(false);
    
              var data = new Date();
              var ano = data.getFullYear();
    
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Cookie", "ci_session=k936k3fovb8oeh3ae9f5aa1af90kbai5");
    
              var raw = JSON.stringify(
                {
                  "ra":result.dados[0].RA,
                  "codperlet":ano
                });
    
              var paramsTurmaAtual = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
    
              fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/selecionaturmaatual", paramsTurmaAtual)
                .then(response => response.json())
                .then(resturma => {
                    if (resturma.status_code == "400") {
                      console.log('Não encotrou turma para este período letívo.');
                      setLoginErro(true);
                      setLoginmsg('Falha: Não encotramos uma matrícula ativa em uma turma para este período letívo.');
                      setIsloading(false);
                    } else {
                      localStorage.setItem('@meuboleto/turma', resturma.dados[0].CODTURMA);
                      localStorage.setItem('@meuboleto/perlet', resturma.dados[0].CODPERLET);
                      localStorage.setItem('@meuboleto-app/coligada', resturma.dados[0].CODCOLIGADA);
                      localStorage.setItem('@meuboleto-app/filial', resturma.dados[0].CODFILIAL);
                      setcodturma(resturma.dados[0].CODTURMA);
                      setcodperlet(resturma.dados[0].CODPERLET);
                      // setUser({
                      //   turma: resturma.dados[0].CODTURMA,
                      //   perlet: resturma.dados[0].CODPERLET
                      // });


                      localStorage.setItem('@meuboleto/ra', result.dados[0].RA);
                      localStorage.setItem('@meuboleto/nome', result.dados[0].NOME);
                      localStorage.setItem('@meuboleto/dtnasc', result.dados[0].DTNASC);
                      localStorage.setItem('@meuboleto/email', result.dados[0].EMAIL);
                      localStorage.setItem('@meuboleto/logado', true);
                      
                      setUser({
                        logado: false,
                        nome: result.dados[0].NOME,
                        ra: result.dados[0].RA,
                        email: result.dados[0].EMAIL,
                        dtnasc: result.dados[0].DTNASC,
                        turma: "",
                        perlet: ""
                      });
                      history.push('/admin/index');
                    }
                  })
                .catch(error => console.log('error', error));
    
              
    
              //history.push('/admin/index');
            }
          }
        );
      } else {
        setLoginErro(true);
        setLoginmsg('Falha: Você deve validar o reCAPTCHA!');
        setIsloading(false);
      }
    }
  }
  
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
            <img
              style={{
                maxWidth: '200px',
              }} 
              src={imageSrc}
            />
            </div>
            <Form onSubmit={onSubmit} role="form">
              {/* <FormGroup className="mb-3">
                <select 
                  id='codcoligada' 
                  name="codcoligada"
                  class="form-control input-shadow" 
                  onChange={onChangeColigada}
                  required
                >
                  {
                      isLoadColigadas ? <option >Carregando...</option> :
                      rscoligadas.map(item => (
                          <option 
                            key={item.CODCOLIGADA}  
                            value={item.CODCOLIGADA} 
                          >{item.CODCOLIGADA} - {item.NOMEFANTASIA}</option>
                      ))
                  }
                </select>
              </FormGroup> */}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="RA do Aluno"
                    type="text"
                    name="usuario"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Data de Nascimento"
                    type="date"
                    name="senha"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <ReCAPTCHA
                sitekey="6LfJs_IcAAAAADmIPpamM6SWtPwG_nrR2hc8szGK"
                onChange={onChangeRe}
              />

              {
                loginerro ? 
                <Alert color="danger" className="my-4">
                  {loginmsg}
                </Alert>
                : ""
              }

              <div className="text-center">
                {/* <Button className="my-4" color="primary" type="button"> */}
                <Button className="my-4" style={{width: '100%'}} color={localStorage.getItem("@meuboleto-app/bgcolor")} type="submit">
                  {
                    isloading ? <SpinnerCircular color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" size={20} />
                    : 'Entrar'
                  }
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
