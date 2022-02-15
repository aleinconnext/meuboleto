import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody, 
  CardTitle,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
// core components
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Loader from "react-loader-spinner";
import moment from "moment";
import Header from "components/Headers/Header.js";
import { useAuth } from "../../providers/auth";

const initialvalue = {
  parcelas: "",
};

const Material = () => {
  const { user, setUser } = useAuth();

  // States do Header
  const [dadosturmas, setDadosturmas] = useState([]);
  const [dadosmensalidades, setdadosMensalidades] = useState([]);
  const [dadosmaterial, setdadosMaterial] = useState([]);
  const [isLoadTurmas, setisLoadTurmas] = useState(false);
  const [values, setValues] = useState(initialvalue);
  const [totmensalidades, setTotmensalidades] = useState(0);
  const [totmensalidadespagas, setTotmensalidadespagas] = useState(0);
  const [totmensalidadesabertas, setTotmensalidadesabertas] = useState(0);
  const [ipte, setIpte] = useState("");


  const [copiedText, setCopiedText] = useState();
  const [selectedOption, setSelectedOption] = useState(initialvalue);
  const [qtdparcelas, setqtdparcelas] = useState("");
  const [validboleto, setValidboleto] = useState("");
  
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(false);

  const abrirboleto = () => setModal3(!modal3);

  // const toggle = () => setModal(!modal);

  const { height, width } = useWindowDimensions();

  function toggle(){
    setModal(!modal);
    // setValidboleto(idboleto);
  }

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

    // @@@@@@ CARREGO O TOTAL DE MATERIAL @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidades(result.dados[0].QTDTOTAL);
        setUser({
          rstotal: result.dados[0].QTDTOTAL
        });
      })
      .catch(error => console.log('error', error));


    // @@@@@@ CARREGO O TOTAL DE MATERIAL PAGAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalpagasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadespagas(result.dados[0].QTDTOTAL);
      })
      .catch(error => console.log('error', error));
    
    
      // @@@@@@ CARREGO O TOTAL DE MATERIAL ABERTAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalabertasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadesabertas(result.dados[0].QTDTOTAL);
      })
      .catch(error => console.log('error', error));
    
    // FIM DOS VALORES DOS PAINEIS
      
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
        setdadosMaterial(result.dados);
        setUser({
          rsmaterial: result.dados
        });
      })
      .catch(error => console.log('error', error));
  }

  function onSubmitContext(e){
      e.preventDefault();
      console.log(e);
  }

  const Servico = (props) => {
    const [nomeservico, setnomeservico] = useState("");
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=qa9suqr0d45r0d0nbb5fjc2etje963st");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listaservicosboleto?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&idboleto=${props.idboleto}`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        // console.log(result.dados[0].NOME);
        setnomeservico(result.dados[0].NOME);
      })
      .catch(error => console.log('error', error));
    return(
      <span>{nomeservico}</span>
    );
  }

  const BtnBoleto = (props) => {
    return(
      <a
        class={`btn btn-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} btn-block`}
        onClick={() => {
          setModal3(!modal3);
          setValidboleto(props.idboleto);
          setIpte(props.ipte);
        }}
      >
        BOLETO
      </a>
    )
  }
  
  const BtnCartao = (props) => {
    return(
      <a
        class={`btn btn-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} btn-block`}
        onClick={() => {
          setModal(!modal);
          setValidboleto(props.idboleto);
        }}
      >
        CARTÃO
      </a>
    )
  }

  async function onSubmitParcelas(ev) {
    ev.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=498ca3b1614do5euu34864ue29edr5es");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // Aqui eu coloco o de-para das editoras
    var coligada = localStorage.getItem("@meuboleto-app/coligada");
    var editora = '16';
    if (['1','2','3','4','22','34','35','47'].includes(coligada)) {
      editora = '5';
    } else if (coligada == '36') {
      editora = '45';				
    } else if (coligada == '37') {
      editora = '45';				
    } else if (coligada == '38') {
      editora = '45';				
    } else if (coligada == '44') {
      editora = '45';				
    } else if (coligada == '39') {
      editora = '40';
    } else if (coligada == '41') { // 2021 = editora  41 / 2022 = editora 16
      editora = '41';
    } else if (coligada == '43') {
      editora = '42';
    } else if (coligada == '57') {
      editora = '56';
    } else if (coligada == '60') {
      editora = '63';
    } else if (coligada == '61') {
      editora = '63';
    } else if (coligada == '11') {
      editora = '63';
    } else if (coligada == '58') {
      editora = '62';
    } else if (coligada == '59') {
      editora = '62';
    } else {
      editora = '16';
    }

    //console.log('A editora é a '+editora);

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/idlancamentomaterial?coligada=${editora}&idboleto=${validboleto}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.dados[0].IDLAN);
        window.open(`http://portal.centralaluno.com.br/api/Decodificar/CriarPagamentoWebDecodificarComRedirect/${validboleto}/${result.dados[0].IDLAN}/2/3/${editora}/${qtdparcelas}/${qtdparcelas}`,"_blank");
      })
      .catch(error => console.log('error', error));
  }

  function onChangeParcelas(ev) {
    // console.log(ev.target.value);
    setqtdparcelas(ev.target.value);
  }

  useEffect(() => {
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

      // FIM DO CARREGAMENTO DAS TURMAS

    // @@@@@@ CARREGO O TOTAL DE MATERIAL @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidades(result.dados[0].QTDTOTAL);
        setUser({
          rstotal: result.dados[0].QTDTOTAL
        });
      })
      .catch(error => console.log('error', error));


    // @@@@@@ CARREGO O TOTAL DE MATERIAL PAGAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalpagasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadespagas(result.dados[0].QTDTOTAL);
      })
      .catch(error => console.log('error', error));
    
    
      // @@@@@@ CARREGO O TOTAL DE MATERIAL ABERTAS @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalabertasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setTotmensalidadesabertas(result.dados[0].QTDTOTAL);
      })
      .catch(error => console.log('error', error));
    
    // FIM DOS VALORES DOS PAINEIS

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=rt75or4mao5dkuc736kdl4kj6nc37cmn");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setdadosMaterial(result.dados);
        setUser({
          rsmaterial: result.dados
        });
      })
      .catch(error => {
        console.log('error', error)
      });

    setUser({
      logado: false,
      nome: localStorage.getItem("@meuboleto/nome"),
      ra: localStorage.getItem("@meuboleto/ra"),
      email: localStorage.getItem("@meuboleto/email"),
      dtnasc: localStorage.getItem("@meuboleto/dtnasc"),
    });
  }, []);


  return (
    <>
      {/* <Header /> */}
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
                      <span className="text-nowrap">Total de boletos de material</span>
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
                      <span className="text-nowrap">Total de boletos de material pagos</span>
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
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="ni ni-calendar-grid-58" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Total de boletos de material aberto</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="6" xl="3">
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
              </Col> */}
            </Row>
          </div>
        </Container>
      </div>
      {/* FIM DO HEADER */}

      <Modal centered isOpen={modal3} toggle={abrirboleto}>
        <ModalHeader toggle={abrirboleto}>
          <h3>Boleto Bancário </h3>
        </ModalHeader>
        <ModalBody>
          <span>Código de barras</span>
          <div style={{ marginTop: '10px' }}  class="input-group mb-3">
            <input type="text" class="form-control" placeholder=""  value={ipte} disabled/>
            <div class="input-group-append">
              <CopyToClipboard
                text={ipte}
                onCopy={() => setCopiedText(ipte)}
              >
                <button class={`btn btn-${localStorage.getItem("@meuboleto-app/bgcolor")} btn-block`} name="ipte" id="ipte" type="button"><i class="far fa-copy"></i></button>
              </CopyToClipboard>
              <UncontrolledTooltip
                delay={0}
                trigger="hover focus"
                target="ipte"
              >
                {copiedText === ipte
                  ? "Linha digitável copiada!"
                  : "Copiar linha digitável"}
              </UncontrolledTooltip>
            </div>
          </div>
          
          <a 
          class={`btn btn-${localStorage.getItem(
             "@meuboleto-app/bgcolor"
           )} btn-block`}
           target="_blank"
           href={`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonlineh/index.php/visualizar?tipo=material&coligada=${localStorage.getItem(
             "@meuboleto-app/coligada"
           )}&idboleto=${
             validboleto
           }&ra=${localStorage.getItem(
             "@meuboleto/ra"
           )}`}
          >
           IMPRIMIR
          </a>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={abrirboleto}>
            Fechar
          </Button>
        </ModalFooter> */}
      </Modal>

      <Modal centered isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Parcelamento</ModalHeader>
        <ModalBody>
          <Col lg="12" xl="12" style={{ color: "#fff" }}>
            <form>
            {/* <form onSubmit={onSubmitParcelas}> */}
              <div class="form-group">
                <label style={{ color: "#000" }}>
                  Escolha o ano letivo e a turma:
                </label>
                <select
                  id="parcelas"
                  name="v"
                  class="form-control input-shadow"
                  onChange={onChangeParcelas}
                  required
                >
                  <option>Selecione a qtd. de parcelas</option>
                  <option value={"1"}>1x</option>
                  <option value={"2"}>2x</option>
                  {/* <option value={"3"}>3x</option> */}
                </select>
              </div>
            </form>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button
            color={localStorage.getItem("@meuboleto-app/bgcolor")}
            onClick={onSubmitParcelas}
          >
            Pagar com Cartão
          </Button>
          <Button color="secondary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
      {/* Page content */}
      {/* <Container className="mt--7" fluid> */}
      <Container
        fluid
        className={`header bg-gradient-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} mt--7`}
      >
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Material didático</h3>
              </CardHeader>
              {
                width > 426 ? 
                (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Serviço(s)</th>
                        <th scope="col">Boleto</th>
                        <th scope="col">Vencimento</th>
                        <th scope="col">Valor R$</th>
                        <th scope="col">Status</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {dadosmaterial.length > 0 ? (
                        dadosmaterial.map((itemMaterial, index) => {
                          var hj = new Date();
                          var vencto = new Date(itemMaterial.DTVENCTO); // já está no formato "DD/MM/YYYY"
                          var statusbol = "";
                          var statucnab = itemMaterial.CNABSTATUS;
                          
                          switch (statucnab) {
                            case 0:
                              statusbol = "Não Remetido";
                              break;
                            case 1:
                              statusbol = "Remetido";
                              break;
                            case 2:
                              statusbol = "Registrado";
                              break;
                            case 3:
                              statusbol = "Recusado";
                              break;
                            case 4:
                              statusbol = "Baixado";
                              break;
                            case 5:
                              statusbol = "Registrado Online";
                              break;
                            case 6:
                              statusbol = "Cancelado";
                              break;
                            case 7:
                              statusbol = "Pendente Remessa";
                              break;
                            default:
                              console.log("default");
                          }
                          return (
                            <tr key={`${itemMaterial.IDBOLETO}`}>
                              <th scope="row">
                                {}
                                <Media className="align-items-center">
                                  <a className="avatar rounded-circle mr-3">
                                    {itemMaterial.STATUS == 1 ? (
                                      <img
                                        alt="..."
                                        src={
                                          require("../../assets/img/theme/pago.jpg")
                                            .default
                                        }
                                      />
                                    ) : vencto < hj ? (
                                      itemMaterial.CNABSTATUS == 2 ? (
                                        <img
                                          alt="..."
                                          src={
                                            require("../../assets/img/theme/vencido.jpg")
                                              .default
                                          }
                                        />
                                      ) : (
                                        <img
                                          alt="..."
                                          src={
                                            require("../../assets/img/theme/indiponivel.jpg")
                                              .default
                                          }
                                        />
                                      )
                                    ) : (
                                      <img
                                        alt="..."
                                        src={
                                          require("../../assets/img/theme/imprimir.jpg")
                                          .default
                                        }
                                      />
                                    )}
                                  </a>
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      Material Didático
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{itemMaterial.IDBOLETO}</td>
                              <td>{itemMaterial.VENCIMENTO}</td>
                              <td>{itemMaterial.VALORLIQ}</td>
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  {itemMaterial.STATUS == 1 ? (
                                    <>
                                      <i className="bg-success" />
                                      Pago
                                    </>
                                  ) : vencto < hj ? (
                                    itemMaterial.CNABSTATUS == 2 ? (
                                      <>
                                        <i className="bg-danger" />
                                        Vencido
                                      </>
                                    ) : (
                                      <>
                                        <i className="bg-warning" />
                                        Indisponível
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <i className="bg-primary" />
                                      Em aberto
                                    </>
                                  )}
                                </Badge>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  



                                  {itemMaterial.STATUS == 1 ? (
                                    <a
                                      class={`btn btn-${localStorage.getItem(
                                        "@meuboleto-app/bgcolor"
                                      )} btn-block`}
                                    >
                                      PAGO
                                    </a>
                                  ) : vencto < hj ? (
                                    itemMaterial.CNABSTATUS == 2 ? (
                                      <>
                                        <BtnBoleto idboleto={itemMaterial.IDBOLETO}  ipte={itemMaterial.IPTE} codbarras={itemMaterial.CODIGOBARRAS} />
                                        <br />
                                        <BtnCartao idboleto={itemMaterial.IDBOLETO}/>
                                        <br />
                                      </>
                                    ) : (
                                      <a class={`btn btn-warning btn-block`}>
                                        {statusbol.toUpperCase()}
                                      </a>
                                    )
                                  ) : (
                                    <>
                                      <BtnBoleto idboleto={itemMaterial.IDBOLETO}  ipte={itemMaterial.IPTE} codbarras={itemMaterial.CODIGOBARRAS} />
                                      <br />
                                      <BtnCartao idboleto={itemMaterial.IDBOLETO}/>
                                      <br />
                                      {/* <a 
                                            class={`btn btn-${localStorage.getItem("@meuboleto-app/bgcolor")} btn-block`} 
                                            target="_blank" 
                                            href={`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonlineh/index.php/visualizar?tipo=mensalidade&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&idboleto=${itemBoleto.IDBOLETO}&ra=${localStorage.getItem("@meuboleto/ra")}`}
                                          >PIX</a> */}
                                    </>
                                  )}


                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {
                              dadosmaterial.length === 0 ? ( 
                                <span>
                                <Loader
                                  type="ThreeDots"
                                  color="#9e9e9e"
                                  height={50}
                                  width={50}
                                  // timeout={3000} //3 secs
                                />
                              </span>
                              ) : (
                                <span>
                                  Não foram encontrados dados a serem exibidos...
                                </span>
                                ) 
                              }
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                ) : 
                (
                  <CardBody>
                     {dadosmaterial.length > 0 ? 
                        dadosmaterial.map((itemMaterial, index) => {
                          var hj = new Date();
                          var vencto = new Date(itemMaterial.DTVENCTO); // já está no formato "DD/MM/YYYY"
                          var statusbol = "";
                          var statucnab = itemMaterial.CNABSTATUS;
                          
                          switch (statucnab) {
                            case 0:
                              statusbol = "Não Remetido";
                              break;
                            case 1:
                              statusbol = "Remetido";
                              break;
                            case 2:
                              statusbol = "Registrado";
                              break;
                            case 3:
                              statusbol = "Recusado";
                              break;
                            case 4:
                              statusbol = "Baixado";
                              break;
                            case 5:
                              statusbol = "Registrado Online";
                              break;
                            case 6:
                              statusbol = "Cancelado";
                              break;
                            case 7:
                              statusbol = "Pendente Remessa";
                              break;
                            default:
                              console.log("default");
                          }
                          return (
                            <Row className="icon-examples">
                              <Col lg="3" md="6">
                                  <div 
                                    // className="btn-icon-clipboard"
                                    style={{ 
                                      backgroundColor: "#f5f5f5", 
                                      maxHeight: "160px",
                                      borderRadius: 5,
                                      color: "#32325d",
                                      fontSize: 18,
                                      margin: 0,
                                    }}
                                  >  
                                    <div 
                                      style={{ 
                                        backgroundColor: "#ebeced", 
                                        height: "28px",
                                      }}>
                                        <span
                                          style={{ 
                                            float: "left",
                                            color: "#707070",
                                            textAlign: "left",
                                            fontSize: 14,
                                            marginTop: 3,
                                            marginLeft: 10
                                          }}
                                        >
                                          Vencimento: {itemMaterial.VENCIMENTO}
                                        </span>
                                        <span
                                          style={{ 
                                            float: "right",
                                            color: "#707070",
                                            textAlign: "left",
                                            fontSize: 12,
                                          }}
                                        >
                                          <Badge color="" className="badge-dot mr-3">
                                            {itemMaterial.STATUS == 1 ? (
                                                <>
                                                  <i className="bg-success" />
                                                  Pago
                                                </>
                                              ) : vencto < hj ? (
                                                itemMaterial.CNABSTATUS == 2 ? (
                                                  <>
                                                    <i className="bg-danger" />
                                                    Vencido
                                                  </>
                                                ) : (
                                                  <>
                                                    <i className="bg-warning" />
                                                    Indisponível
                                                  </>
                                                )
                                              ) : (
                                                <>
                                                  <i className="bg-primary" />
                                                  Em aberto
                                                </>
                                              )}
                                          </Badge>
                                          {/* Status: Aberto */}
                                        </span>
                                    </div> 
                                    <div
                                      style={{ 
                                        display: "flex",
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        marginLeft:10,
                                        marginTop: 5,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                      }}
                                    >
                                      <a className="avatar rounded-circle mr-3">
                                        {itemMaterial.STATUS == 1 ? (
                                          <img
                                            alt="..."
                                            src={
                                              require("../../assets/img/theme/pago.jpg")
                                                .default
                                            }
                                          />
                                        ) : vencto < hj ? (
                                          itemMaterial.CNABSTATUS == 2 ? (
                                            <img
                                              alt="..."
                                              src={
                                                require("../../assets/img/theme/vencido.jpg")
                                                  .default
                                              }
                                            />
                                          ) : (
                                            <img
                                              alt="..."
                                              src={
                                                require("../../assets/img/theme/indiponivel.jpg")
                                                  .default
                                              }
                                            />
                                          )
                                        ) : (
                                          <img
                                            alt="..."
                                            src={
                                              require("../../assets/img/theme/imprimir.jpg")
                                              .default
                                            }
                                          />
                                        )}
                                      </a>
                                      <span
                                        style={{ 
                                          // textAlign: "center",
                                          fontSize: 14,
                                          marginTop: 10,
                                          color: "#000"
                                        }}
                                      >
                                       <span className="mb-0 text-sm">
                                          {itemMaterial.QTDLANCAMENTOS > 1
                                            ? (<> <span>{itemMaterial.VALORLIQ}</span> - Material didático </>)
                                            : (<> <span>{itemMaterial.VALORLIQ}</span> - Material didático </>)
                                          }
                                        </span>
                                      </span>
                                    </div>
                                    <div 
                                      style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginBottom: 10,
                                        marginTop: 10,
                                      }}
                                      className="d-flex align-items-center">
                                        {itemMaterial.STATUS == 1 ? (
                                          <span />
                                          // <a
                                          //   class={`btn btn-${localStorage.getItem(
                                          //     "@meuboleto-app/bgcolor"
                                          //   )} btn-block`}
                                          // >
                                          //   PAGO
                                          // </a>
                                        ) : vencto < hj ? (
                                          itemMaterial.CNABSTATUS == 2 ? (
                                            <>
                                              <BtnBoleto idboleto={itemMaterial.IDBOLETO}  ipte={itemMaterial.IPTE} codbarras={itemMaterial.CODIGOBARRAS} />
                                              <br />
                                              <BtnCartao idboleto={itemMaterial.IDBOLETO}/>
                                              <br />
                                            </>
                                          ) : (
                                            <a class={`btn btn-warning btn-block`}>
                                              {statusbol.toUpperCase()}
                                            </a>
                                          )
                                        ) : (
                                          <>
                                            <BtnBoleto idboleto={itemMaterial.IDBOLETO} ipte={itemMaterial.IPTE} codbarras={itemMaterial.CODIGOBARRAS} />
                                            <br />
                                            <BtnCartao idboleto={itemMaterial.IDBOLETO}/>
                                            <br />
                                            {/* <a 
                                                  class={`btn btn-${localStorage.getItem("@meuboleto-app/bgcolor")} btn-block`} 
                                                  target="_blank" 
                                                  href={`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonlineh/index.php/visualizar?tipo=mensalidade&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&idboleto=${itemBoleto.IDBOLETO}&ra=${localStorage.getItem("@meuboleto/ra")}`}
                                                >PIX</a> */}
                                          </>
                                        )}
                                    </div>
                                    <div 
                                      style={{
                                        height: 5,
                                      }}
                                    />
                                  </div>
                              </Col>
                            </Row> 
                          )
                        })
                      : 
                      (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {
                          dadosmensalidades.length === 0 ? ( 
                            <span>
                            <Loader
                              type="ThreeDots"
                              color="#9e9e9e"
                              height={50}
                              width={50}
                              // timeout={3000} //3 secs
                            />
                          </span>
                          ) : (
                            <span>
                              Não foram encontrados dados a serem exibidos...
                            </span>
                            ) 
                          }
                        </div>
                      )
                      }
                  </CardBody>

                  // <span> Card </span>
                )
              }
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Material;
