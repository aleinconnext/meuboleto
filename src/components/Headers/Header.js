import React, { useEffect, useState } from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useAuth } from "../../providers/auth";

const initialvalue = {
  codturma: "",
  codperlet: "",
};

const Header = () => {
  const [dadosturmas, setDadosturmas] = useState([]);
  const [dadosmensalidades, setdadosMensalidades] = useState([]);
  const [isLoadTurmas, setisLoadTurmas] = useState(false);
  const [values, setValues] = useState(initialvalue);
  const [totmensalidades, setTotmensalidades] = useState(0);
  const [totmensalidadespagas, setTotmensalidadespagas] = useState(0);
  const [totmensalidadesabertas, setTotmensalidadesabertas] = useState(0);
  const { user, setUser } = useAuth();

  useEffect(() => {
    setUser({
      logado: false,
      nome: localStorage.getItem("@meuboleto/nome"),
      ra: localStorage.getItem("@meuboleto/ra"),
      email: localStorage.getItem("@meuboleto/email"),
      dtnasc: localStorage.getItem("@meuboleto/dtnasc")
    });
    setisLoadTurmas(true);
    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/getlistaturmas?ra=${localStorage.getItem("@meuboleto/ra")}`)
      .then(response => response.json())
      .then(result => { 
        setisLoadTurmas(false);
        setDadosturmas(result.dados);

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=h6jqsvm0pc9h7rca5k49u0gesdfs3b0b");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamensalidades?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}&codturma=${localStorage.getItem("@meuboleto/turma")}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            //console.log(result);
            localStorage.setItem('@meuboleto/rsmensalidades', JSON.stringify(result.dados));
            setdadosMensalidades(result.dados);
            setUser({
              rsmensalidades: result.dados
            });

          })
          .catch(error => console.log('error', error));

        })
      .catch(error => console.log('error', error));
  }, [])


  function onChange(ev) {
    var resultado = ev.target.value.split("@");
    // console.log(resultado[0]); // codturma
    // console.log(resultado[1]); // codperlet
    localStorage.setItem('@meuboleto/turma', resultado[0]);
    localStorage.setItem('@meuboleto/perlet', resultado[1]);
    setUser({
      logado: true,
      nome: localStorage.getItem("@meuboleto/nome"),
      ra: localStorage.getItem("@meuboleto/ra"),
      email: localStorage.getItem("@meuboleto/email"),
      dtnasc: localStorage.getItem("@meuboleto/dtnasc"),
      turma: resultado[0],
      perlet: resultado[1]
    });

    // @@@@@@ CARREGO O TOTAL DE MENSALIDADES @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidades?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidades(result.dados[0].QTDLANCAMENTOS);
        setUser({
          rstotal: result.dados[0].QTDLANCAMENTOS
        });
      })
      .catch(error => console.log('error', error));


    // @@@@@@ CARREGO O TOTAL DE MENSALIDADES PAGAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidadespagas?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadespagas(result.dados[0].QTDLANCAMENTOS);
      })
      .catch(error => console.log('error', error));
    
    
      // @@@@@@ CARREGO O TOTAL DE MENSALIDADES PAGAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidadesabertas?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadesabertas(result.dados[0].QTDLANCAMENTOS);
      })
      .catch(error => console.log('error', error));
    
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=h6jqsvm0pc9h7rca5k49u0gesdfs3b0b");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamensalidades?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        localStorage.setItem('@meuboleto/rsmensalidades', JSON.stringify(result.dados));
        setdadosMensalidades(result.dados);
        setUser({
          rsmensalidades: result.dados
        });
      })
      .catch(error => console.log('error', error));


    // @@@@@@@ Carrego a lista do Material de Didático  @@@@@@

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=rt75or4mao5dkuc736kdl4kj6nc37cmn");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${resultado[0]}&codperlet=${resultado[1]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        setUser({
          rsmaterial: result.dados
        });
      })
      .catch(error => console.log('error', error));

    console.log("rsmensalidades");
    console.log(JSON.parse(localStorage.getItem("rsmensalidades")));
  }

  function onSubmitContext(e){
      e.preventDefault();
      console.log(e);
  }

  return (
    <>
      <div className={`header bg-gradient-${localStorage.getItem("@meuboleto-app/bgcolor")} pb-8 pt-5 pt-md-8`}>
        <Container fluid>
          <span style={{ color: '#fff' }}>RA: {localStorage.getItem("@meuboleto/ra")}</span><br/>
          <span style={{ color: '#fff' }}>Aluno(a): {localStorage.getItem("@meuboleto/nome")}</span><br/><br/>
          {/* <span style={{ color: '#fff' }}>Turma: {user.turma}</span><br/><br/> */}
          <div className="header-body">
            {/* Card stats */}
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
                        {/* <option >Selecione a Turma</option> */}
                        {
                            isLoadTurmas ? <option >Carregando...</option> :
                            dadosturmas.map(itemTurma => (
                                <option key={itemTurma.CODTURMA} value={itemTurma.CODTURMA+'@'+itemTurma.CODPERLET}>{itemTurma.NOMETURMA} - {itemTurma.CODTURMA} - {itemTurma.CODPERLET}</option>
                            ))
                        }
                      </select>
                  </div>
                </form>
              </Col>
            </Row>
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          <span className="h2 font-weight-bold mb-0">{totmensalidades}</span>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Total de Mensalidades e Serviços</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pagas
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totmensalidadespagas}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Total em mensalidades pagas</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Em Aberto
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totmensalidadesabertas}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Total em mensalidades em aberto</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Bolsa
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Desconto concedido</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
