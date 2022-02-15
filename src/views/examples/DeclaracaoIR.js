
import { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DeclaracaoIR = () => {
  const [dadosturmas, setDadosturmas] = useState([]);
  // const [codperlet, setcodperlet] = useState(localStorage.getItem("@meuboleto/perlet"));
  const [codperlet, setcodperlet] = useState("2021");
  const [urlframe, seturlframe] = useState("");
  const [isLoadTurmas, setisLoadTurmas] = useState(false);

  useEffect(() => {
    setisLoadTurmas(true);
    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/getlistaturmasdeclaracao?ra=${localStorage.getItem("@meuboleto/ra")}`)
      .then(response => response.json())
      .then(result => { 
        setisLoadTurmas(false);
        setDadosturmas(result.dados);
        seturlframe(`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonline/index.php/declaracaoirrf?codcoligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}&ra=${localStorage.getItem("@meuboleto/ra")}`)
      })
      .catch(error => console.log('error', error));
        
  }, []);

  function onChange(ev) {
    var resultado = ev.target.value.split("@");
    localStorage.setItem('@meuboleto/turma', resultado[0]);
    localStorage.setItem('@meuboleto/perlet', resultado[1]);
    setcodperlet(resultado[1]);
    seturlframe(`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonline/index.php/declaracaoirrf?codcoligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${resultado[0]}&codperlet=${resultado[1]}&ra=${localStorage.getItem("@meuboleto/ra")}`)
  }

  function onSubmitContext(e){
      e.preventDefault();
      console.log(e);
  }

  return (
    <>
     {/* <Header /> */}
     <div className={`header bg-gradient-${localStorage.getItem("@meuboleto-app/bgcolor")} pb-8 pt-5 pt-md-8`}>
        <Container fluid>
          <span style={{ color: '#fff' }}>RA: {localStorage.getItem("@meuboleto/ra")}</span><br/>
          <span style={{ color: '#fff' }}>Aluno(a): {localStorage.getItem("@meuboleto/nome")}</span><br/><br/>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="6" style={{ color: '#fff' }}>
                <form onSubmit={onSubmitContext}>
                  <div class="form-group">
                      <label>Escolha o ano letivo e a turma:</label>
                      <select 
                        id='codturma' 
                        name="codturma"
                        class="form-control input-shadow" 
                        onChange={onChange}
                        required
                      >
                        {
                            isLoadTurmas ? <option >Carregando...</option> :
                            dadosturmas.length > 0 ? 
                              dadosturmas.map(itemTurma => (
                                  <option key={itemTurma.CODTURMA} value={itemTurma.CODTURMA+'@'+itemTurma.CODPERLET}>{itemTurma.NOMETURMA} - {itemTurma.CODTURMA} - {itemTurma.CODPERLET}</option>
                              ))
                            : <option >Não existe declaração disponível...</option>
                        }
                      </select>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* FIM DO HEADER */}

      {/* Page content */}
      <Container className={`header bg-gradient-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} mt--7`} fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Declaração de IRRF - {codperlet}</h3>
              </CardHeader>
              <CardBody>
                  {
                    isLoadTurmas ? <Skeleton height={30} /> :
                    dadosturmas.length > 0 ? 
                      <iframe 
                        src={urlframe}
                        width={'100%'}
                        height={'780px'}
                      />
                  : <span >Não existe declaração disponível...</span>
                  }
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DeclaracaoIR;
