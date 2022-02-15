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
  Form, FormGroup, Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  CardTitle
} from "reactstrap";
// core components
// import { QrCodePix } from 'qrcode-pix';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import moment from "moment";
import Header from "components/Headers/Header.js";
import { SpinnerCircular } from 'spinners-react';
import Swal from 'sweetalert2';
import { useAuth } from "../providers/auth";
import useWindowDimensions from '../hooks/useWindowDimensions';
import { CopyToClipboard } from "react-copy-to-clipboard";
//import { PixQRCode, PixQRCodeProps } from "pix-react";
// import * as PIX from 'pixbr';
// import { Pix } from "faz-um-pix"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const initialvalue = {
  parcelas: "",
};

const Tables = () => {
  const { user, setUser } = useAuth();
  const [isloading, setIsloading] = useState(null);
  const [selectedOption, setSelectedOption] = useState(initialvalue);
  const [qtdparcelas, setqtdparcelas] = useState("");
  const [validboleto, setValidboleto] = useState("");
  const [validlan, setValidlan] = useState("");
  const [ipte, setIpte] = useState("");

  // States do Header
  const [dadosturmas, setDadosturmas] = useState([]);
  const [dadosmensalidades, setdadosMensalidades] = useState([]);
  const [dadosmaterial, setdadosMaterial] = useState([]);
  const [dadosparamsmd, setdadosParamsMd] = useState([]);
  const [isLoadTurmas, setisLoadTurmas] = useState(false);
  const [values, setValues] = useState(initialvalue);
  const [tipobtn, setTipobtn] = useState("");
  const [tipoparcelamento, settipoparcelamento] = useState("");
  const [totmensalidades, setTotmensalidades] = useState(<Skeleton height={20} />);
  const [totmensalidadespagas, setTotmensalidadespagas] = useState(<Skeleton height={20} />);
  const [totmensalidadesabertas, setTotmensalidadesabertas] = useState(<Skeleton height={20} />);
  const [totmmaterial, setTotmmaterial] = useState(<Skeleton height={20} />);
  const [totmaterialpagas, setTotmaterialpagas] = useState(<Skeleton height={20} />);
  const [totmaterialabertas, setTotmaterialabertas] = useState(<Skeleton height={20} />);
  const [codperlet, setcodperlet] = useState(2021);
  const [codturma, setcodturma] = useState("");
  const [desconto, setdesconto] = useState("");
  const [tpdesc, settpdesc] = useState("");
  const [tembolsa, setTembolsa] = useState(0);
  
  const [servicos, setservicos] = useState([]);
  const [nmservicos, setnmservicos] = useState([]);
  const [dadosagendados, setDadosagendados] = useState([]);

  const [copiedText, setCopiedText] = useState();
  const [modalagendamento, setModalagendamento] = useState(false);
  const [modalagendar, setModalagendar] = useState(false);
  const [modalpix, setModalpix] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalservicos, setModalservicos] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  //const toggleServicos = () => setModalservicos(!modalservicos);
  const abrir = () => setModal2(!modal2);
  const abrirboleto = () => setModal3(!modal3);
  const abriropcao = () => setModalagendamento(!modalagendamento);
  const abriragendamento = () => setModalagendar(!modalagendar);
  const abrirpix = () => setModalpix(!modalpix);

  const { height, width } = useWindowDimensions();

  function toggle() {
    setModal(!modal);
  }
  
  function toggleServicos() {
    setModalservicos(!modalservicos);
  }

  const TableSkeleton = () =>{
    const linhas = [1, 2, 3, 4, 5];
    return(
      <>
        { linhas.map( (number) => 
          <tr key={number}>
            <th scope="row">
              <>
                <Skeleton circle={true} width={42} height={42}/>
              </>
            </th>
            <td><Skeleton height={20} /></td>
            <td><Skeleton height={20} /></td>
            <td><Skeleton height={20} /></td>
            <td>
              <Skeleton height={20} />  
            </td>
            <td>
              <Skeleton height={20} width={180}/>
            </td>
          </tr>
          )
        }
      </>
      
    )
  }
  
  const SolicitarBoletos = (props) => {
    const [issend, setIssend] = useState(false);
    const [statussend, setStatussend] = useState("SOLICITAR");
    const [buttonstate, setbuttonstate] = useState("");
    const [buttoncolor, setbuttoncolor] = useState("btn-warning");
    return(
      <a class={`btn ${buttoncolor} btn-block`} 
      onClick={() => {
        console.log(props.codcoligada,props.idboleto);
        setIssend(true);
        setbuttoncolor("btn-warning");
        setbuttonstate("");
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=8rgchuq2105pkis46bvlu1u84j2m81rp");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        //fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/idlancamentomaterial?coligada=${props.codcoligada}&idboleto=${props.idboleto}`, requestOptions)
        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/idlancamento?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${props.codcoligada}&idboleto=${props.idboleto}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setIssend(false)
            setStatussend("SOLICITADO")
            setbuttoncolor("btn-success")
            setbuttonstate("disabled")
            console.log(result)
            console.log(result.dados[0].IDLAN)

            // #########################################################################
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "ci_session=uacqllgd46q8gtt6iakletsirslsus0u");

            var raw = JSON.stringify({
              "ra": localStorage.getItem("@meuboleto/ra"),
              "codcoligada": props.codcoligada,
              "idlan": result.dados[0].IDLAN
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/abrechamadocau", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                Swal.fire({
                  title: 'Solicitação de registro',
                  // text: 'Seu boleto estará disponível em 48 horas!!',
                  text: 'Prezado, o seu boleto será disponibilizado no portal em um prazo de 2 dias úteis, após este prazo acesse novamente a página e retire seu título para quitação. Caso prefira poderá seguir com o pagamento imediato na modalidade CARTÃO, basta clicar no botão disposto abaixo e será redirecionado para esta modalidade.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
                }  
              )
              .catch(error => {
                console.log('error', error)
                Swal.fire({
                  title: 'Solicitação de registro',
                  text: 'Houve um problema com sua solicitação, tente novamente mais tarde.',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              });

            
            
          })
          .catch(error => {
            setStatussend("SOLICITAR")
            setbuttoncolor("btn-warning")
            console.log('error', error)
          });
      }}>
      {
        issend ? <SpinnerCircular color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" size={20} />
        : props.statucnab == 1 ? "REGISTRANDO..." : statussend 
      }
    </a>

    );
    
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
        setnomeservico(result.dados[0].NOME);
      })
      .catch(error => console.log('error', error));
    return (
      <div 
        style={{maxWidth: '140px' }}
      >
        <span name={"nmserv"+props.idboleto} id={"nmserv"+props.idboleto}>
            { 
              ((nomeservico).length > 25) ? 
              (((nomeservico).substring(0,25-2)) + '...') : 
              nomeservico 
            }
        </span>
        <UncontrolledTooltip
          delay={0}
          trigger="hover focus"
          target={"nmserv"+props.idboleto}
        >
          {nomeservico}
        </UncontrolledTooltip>
      </div>
    );
  }

  const Diversoss = (props) => {
    //const [servicos, setservicos] = useState([]);
    //const [nmservicos, setnmservicos] = useState([]);
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
        setnmservicos(result.dados[0].NOME);
        setservicos(result.dados);
        console.log(result.dados);
      })
      .catch(error => console.log('error', error));

    return (
      <>
        <Modal centered isOpen={modal2} toggle={abrir}>
          <ModalHeader toggle={abrir}>
            <h3>Lista de Serviços do Boleto </h3>
          </ModalHeader>
          <ModalBody>
            <span>{nmservicos} - R$ 0,00</span>
            <h5>
              {/* {servicos.map((itemServico, index) => {
              <span>{itemServico.NOME}</span>
            })} */}
              {
                servicos.map((itemServico, index) => {
                  // <p key={itemServico.IPTE}>{itemServico.NOME}</p>
                  <span>{nmservicos}</span>
                })}
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={abrir}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <span style={{ cursor: 'pointer' }} onClick={abrir}>Lista de serviços </span> <i className="fas fa-eye" onClick={abrir} style={{ cursor: 'pointer' }} />
      </>
    );
  }

  const Diversos = (props) => {
    return (
      <>
        <Modal centered isOpen={modal2} toggle={abrir}>
          <ModalHeader toggle={abrir}>
            <h3>Lista de Serviços do Boleto </h3>
          </ModalHeader>
          <ModalBody>
            <span>{nmservicos} - R$ 0,00</span>
            <h5>
              {/* {servicos.map((itemServico, index) => {
              <span>{itemServico.NOME}</span>
            })} */}
              {
                servicos.map((itemServico, index) => {
                  // <p key={itemServico.IPTE}>{itemServico.NOME}</p>
                  <span>{nmservicos}</span>
                })}
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={abrir}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
        <span style={{ cursor: 'pointer' }}
          onClick={() => {
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
        setnmservicos(result.dados[0].NOME);
        setservicos(result.dados);
        console.log(result.dados);
      })
      .catch(error => console.log('error', error));


            // setModal3(!modal3);
            // setValidboleto(props.idboleto);
            // setIpte(props.ipte);
            // setTipobtn(props.tipo);
          }}
        >Lista de serviços </span> <i className="fas fa-eye" onClick={abrir} style={{ cursor: 'pointer' }} />
      </>
    )
  }


  const BtnPix = (props) => {
    return (
      <a
        class={`btn btn-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} btn-block`}
        onClick={() => {
          if (props.statusboleto == 1 ){
            Swal.fire({
              icon: 'success',
              title: 'Boleto Remetido',
              text: 'Seu boleto já foi remetido para o banco, em até 40 min estará disponível para pagamento.',
            })
          }

          // var msg = new PIX.Messages.Static('ale.inconnext@gmail.com', 
          //                                   'FULANO DE TAL', 
          //                                   'BRASILIA' );
          // msg.setField(new PIX.Fields.Transaction_Amount(1234.17)); 
          // PIX.QRCode.toDataURL(msg.getStringValue(), function (data) {
          //   console.log(data);
          // });
          
          //const code = Pix("ale.inconnext@gmail.com", "SILVA SILVA", "RIO DE JANEIRO", "0.10", "Pedido #123456", true);
          //console.log(code);

          setModalpix(!modalpix);
          setValidboleto(props.idboleto);
        }}
      >
        PIX
      </a>
    )
  }
  
  
  const BtnBoleto = (props) => {
    return (
      <a
        class={`btn btn-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} btn-block`}
        onClick={() => {
          if (props.statusboleto == 1 ){
            Swal.fire({
              icon: 'success',
              title: 'Boleto Remetido',
              text: 'Seu boleto já foi remetido para o banco, em até 40 min estará disponível para pagamento.',
            })
          }
          setModal3(!modal3);
          setValidboleto(props.idboleto);
          setIpte(props.ipte);
          setTipobtn(props.tipo);
        }}
      >
        BOLETO
      </a>
    )
  }

  const BtnCartao = (props) => {

    return (
      <a
        class={`btn btn-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} btn-block`}
        onClick={() => {
          setModal(!modal);
          setValidboleto(props.idboleto);
          settipoparcelamento(props.tipoparcelamento);
        }}
      >
        CARTÃO
      </a>
    )
  }

  const BtnAgendamento = (props) => {
    return (
      <>
        
        <a
          class={`btn btn-warning btn-block`}
          onClick={() => {
            

            props.status === "AGENDADO" ? 
              Swal.fire({
                icon: 'warning',
                title: 'Solicitação de cancelamento',
                text: 'Ao optar por cancelar, os agendamentos de todas as parcelas serão cancelados. Você deseja realmente cancelar o agendamento do pagamento recorrente?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Sim, cancelar!',
                denyButtonText: `Não cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Cookie", "ci_session=fao04j783drqotdf3cplpqcci71l5ajo");

                  var raw = JSON.stringify(
                    {
                      "nmaluno":localStorage.getItem("@meuboleto/nome"),
                      "ra":localStorage.getItem("@meuboleto/ra"),
                      "codcoligada":localStorage.getItem("@meuboleto-app/coligada")}
                    );

                  var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };

                  fetch("https://suporteinspira.com.br/api/meuboleto/index.php/api/abrechamadocauagendamento", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                      // console.log(result)
                      Swal.fire('', 'Foi realizada a solicitação do cancelamento do pagamento recorrente de seus boletos.', 'success')
                    })
                    .catch(error => console.log('error', error));
                } else if (result.isDenied) {
                  // Swal.fire('Changes are not saved', '', 'info')
                }
              })
            : 
              // setModal(!modal)
              setValidboleto(props.idboleto)
              settipoparcelamento(props.tipoparcelamento)
              
              /* ORIGINAL */
              setModalagendar(!modalagendar);

              var myHeaders = new Headers();
              myHeaders.append("Cookie", "ci_session=ppvr57m0uuj42g8t10f947i2tf7j4jup");

              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };

              fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterialagendado?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  // console.log(result)
                  setDadosagendados(result.dados)
                })
                .catch(error => console.log('error', error));
          }}
        >
          {props.titulobtn}
        </a>
      </>
    )
  }

  
  const BtnCartaoMD = (props) => {
      const [statuslan, setstatuslan] = useState("")
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "ci_session=e61eck3713g6ggi7c19oa0tsqo4lqocm");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/idlancamentoagendados?idlan=${props.idlan}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setstatuslan(result.dados[0].AGENDAMENTOSTATUS);
        })
        .catch(error => console.log('error', error));
      

    return (
      <>
        {statuslan == "AGENDADO" ? (
          <a
          class={`btn btn-warning btn-block`}
        >
          AGENDADO
        </a>
        ) : (
          <a
          class={`btn btn-${localStorage.getItem(
            "@meuboleto-app/bgcolor"
          )} btn-block`}
          onClick={() => {
            /* ORIGINAL */
            //setModal(!modal);

            /* MUDANÇA */
            setModalagendamento(!modalagendamento);

            setValidboleto(props.idboleto);
            settipoparcelamento(props.tipoparcelamento);
          }}
        >
          CARTÃO
        </a>
        )}
        
      </>
    )
  }

  async function onSubmitParcelas(ev) {
    ev.preventDefault();
    
    if(tipoparcelamento == 'MD'){
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
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "ci_session=498ca3b1614do5euu34864ue29edr5es");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/idlancamento?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&idboleto=${validboleto}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          window.open(`http://portal.centralaluno.com.br/api/Decodificar/CriarPagamentoWebDecodificarComRedirect/${validboleto}/${result.dados[0].IDLAN}/2/3/${localStorage.getItem("@meuboleto-app/coligada")}/${qtdparcelas}/${qtdparcelas}`, "_blank");
        })
        .catch(error => console.log('error', error));
    }
  }


  async function onSubmitAgendamento(ev) {
    ev.preventDefault();
    
    Swal.fire({
      icon: 'warning',
      title: 'Confirmação de agendamento',
      text: 'Ao optar por confirmar, os agendamentos de todas as parcelas listadas serão realizados. Você deseja realmente realizar o pagamento agendado?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim, agendar!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('', 'Foi realizada o agendadmento do pagamento de seus boletos.', 'success')
        setIsloading(true);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=68oi8cu76v8a2q2aamqgjn9ctr8igh68");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/dadosmaterialagendado?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${localStorage.getItem("@meuboleto/turma")}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // setIsloading(false);
            // console.log(result.dados)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify([{"CodColigada":42,"IdLan":15963,"IdBoleto":22465},{"CodColigada":42,"IdLan":15964,"IdBoleto":22470}]);
            var raw = JSON.stringify(result.dados);

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("https://portal.centralaluno.com.br//api/Decodificar/CriarPagamentoRecorrenteWebDecodificar", requestOptions)
              .then(response => response.json())
              .then(result => {
                // console.log(result)
                window.open(`${result.url}`,"_blank");
                setIsloading(false);
              })
              .catch(error => {
                // console.log('error', error)
                setIsloading(false);
                Swal.fire('Erro na solicitação', 'Tivemos um problema na solicitação, tente novamente mais tarde', 'error')
              });
          })
          .catch(error => {
            setIsloading(false);
            console.log('error', error)
          });

      } else if (result.isDenied) {
        // Swal.fire('Solicitação cancelada', '', 'info')
      }
    })
  }


  function onChangeParcelas(ev) {
    setqtdparcelas(ev.target.value);
  }



  useEffect(() => {
    setUser({
      logado: false,
      nome: localStorage.getItem("@meuboleto/nome"),
      ra: localStorage.getItem("@meuboleto/ra"),
      email: localStorage.getItem("@meuboleto/email"),
      dtnasc: localStorage.getItem("@meuboleto/dtnasc"),
    });

    setisLoadTurmas(true);
    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/getlistaturmas?ra=${localStorage.getItem("@meuboleto/ra")}`)
      .then(response => response.json())
      .then(result => {
        setisLoadTurmas(false);
        setDadosturmas(result.dados);
        setcodperlet(result.dados[0].CODPERLET);
        setcodturma(result.dados[0].CODTURMA);
                    //result.dados[0].CODCOLIGADA
        localStorage.setItem('@meuboleto-app/filial', result.dados[0].CODFILIAL);

        // @@@@@@ CARREGO O OS PARAMS DE AGNDAMENTO DE MD @@@@@@@@@
    
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=hbhc08tf6qs3lpr8s51g8kd2t3o9qilj");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listaparammaterialagendado?coligada=${localStorage.getItem("@meuboleto-app/coligada")}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.dados[0])
            setdadosParamsMd(result.dados[0])
          })
          .catch(error => console.log('error', error));

        // @@@@@@ CARREGO O VALOR DA BOLSA @@@@@@@@@
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=4djo7hh93cdrjvm65v4mosgivkjutsaf");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/bolsa?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setTembolsa(result.record_count);
            setdesconto(result.dados[0].DESCONTO);
            settpdesc(result.dados[0].TIPO_DESC.trim());
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

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidadespagas?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codperlet=${result.dados[0].CODPERLET}&codturma=${result.dados[0].CODTURMA}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setTotmensalidadespagas(result.record_count);
          })
          .catch(error => console.log('error', error));


        // @@@@@@ CARREGO O TOTAL DE MENSALIDADES ABERTAS @@@@@@@@@
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidadesabertas?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codperlet=${result.dados[0].CODPERLET}&codturma=${result.dados[0].CODTURMA}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setTotmensalidadesabertas(result.record_count);
          })
          .catch(error => console.log('error', error));

        // @@@@@@ CARREGO AS MENSALIDADES @@@@@@

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=h6jqsvm0pc9h7rca5k49u0gesdfs3b0b");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamensalidadesh?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codperlet=${result.dados[0].CODPERLET}&codturma=${result.dados[0].CODTURMA}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.dados);
            setdadosMensalidades(result.dados);
            setTotmensalidades(result.record_count);
          })
          .catch(error => console.log('error', error));

        // @@@@ LISTA O MATERAIL DIDÁTICO  @@@@@@

        // @@@@@@ CARREGO O TOTAL DE MATERIAL @@@@@@@@@
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log(result);
            setTotmmaterial(result.dados[0].QTDTOTAL);
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

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalpagasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log(result);
            setTotmaterialpagas(result.dados[0].QTDTOTAL);
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

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totalabertasmaterial?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setTotmaterialabertas(result.dados[0].QTDTOTAL);
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

        fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterialh?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${result.dados[0].CODCOLIGADA}&codturma=${result.dados[0].CODTURMA}&codperlet=${result.dados[0].CODPERLET}`, requestOptions)
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

      })
      .catch(error => console.log('error', error));

  }, []);

  function onChange(ev) {
    var resultado = ev.target.value.split("@");
    localStorage.setItem('@meuboleto/turma', resultado[0]); // codturma
    localStorage.setItem('@meuboleto/perlet', resultado[1]); // codperlet
    localStorage.setItem('@meuboleto-app/filial', resultado[2]); // codfilial

    setTotmensalidades(<Skeleton height={20} />);
    setTotmensalidadespagas(<Skeleton height={20} />);
    setTotmensalidadesabertas(<Skeleton height={20} />);
    setTotmmaterial(<Skeleton height={20} />);
    setTotmaterialpagas(<Skeleton height={20} />);
    setTotmaterialabertas(<Skeleton height={20} />);

    setdadosMensalidades([]);
    setdadosMaterial([]);

    setcodturma(resultado[0]);
    setcodperlet(resultado[1]);

    setUser({
      logado: true,
      nome: localStorage.getItem("@meuboleto/nome"),
      ra: localStorage.getItem("@meuboleto/ra"),
      email: localStorage.getItem("@meuboleto/email"),
      dtnasc: localStorage.getItem("@meuboleto/dtnasc"),
      turma: resultado[0],
      perlet: resultado[1]
    });



    // @@@@@@ CARREGO O OS PARAMS DE AGNDAMENTO DE MD @@@@@@@@@
    
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=hbhc08tf6qs3lpr8s51g8kd2t3o9qilj");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listaparammaterialagendado?coligada=${localStorage.getItem("@meuboleto-app/coligada")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.dados[0])
        setdadosParamsMd(result.dados[0])
      })
      .catch(error => console.log('error', error));

    
    // @@@@@@ CARREGO O VALOR DA BOLSA @@@@@@@@@
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=4djo7hh93cdrjvm65v4mosgivkjutsaf");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/bolsa?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${resultado[0]}&codperlet=${resultado[1]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result.dados);
        setTembolsa(result.record_count);
        setdesconto(result.dados[0].DESCONTO);
        settpdesc(result.dados[0].TIPO_DESC.trim());
      })
      .catch(error => console.log('error', error));

    // @@@@@@ CARREGO O TOTAL DE MENSALIDADES @@@@@@@@@
    // var myHeaders = new Headers();
    // myHeaders.append("Cookie", "ci_session=hbvv24nd9ua62qmkm3701acvqj6oi0v6");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/totaldemensalidades?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     // console.log(result);
    //     setTotmensalidades(result.dados[0].QTDLANCAMENTOS);
    //     setUser({
    //       rstotal: result.dados[0].QTDLANCAMENTOS
    //     });
    //   })
    //   .catch(error => console.log('error', error));


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
        setTotmensalidadespagas(result.record_count);
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
        setTotmensalidadesabertas(result.record_count);
      })
      .catch(error => console.log('error', error));

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=h6jqsvm0pc9h7rca5k49u0gesdfs3b0b");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamensalidadesh?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codperlet=${resultado[1]}&codturma=${resultado[0]}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        localStorage.setItem('@meuboleto/rsmensalidades', JSON.stringify(result.dados));
        setdadosMensalidades(result.dados);
        setTotmensalidades(result.record_count);
        setUser({
          rsmensalidades: result.dados
        });
      })
      .catch(error => console.log('error', error));








    // @@@@@@@ Carrego a lista do Material de Didático  @@@@@@

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
        setTotmmaterial(result.dados[0].QTDTOTAL);
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
        setTotmaterialpagas(result.dados[0].QTDTOTAL);
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
        setTotmaterialabertas(result.dados[0].QTDTOTAL);
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

    fetch(`https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterialh?ra=${localStorage.getItem("@meuboleto/ra")}&coligada=${localStorage.getItem("@meuboleto-app/coligada")}&codturma=${resultado[0]}&codperlet=${resultado[1]}`, requestOptions)
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

  function onSubmitContext(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <>
      {/* <Header /> */}
      <div
        className={`header bg-gradient-${localStorage.getItem(
          "@meuboleto-app/bgcolor"
        )} pb-8 pt-5 pt-md-8`}
      >
        <Container fluid>
          <span style={{ color: "#fff" }}>
            RA: {localStorage.getItem("@meuboleto/ra")}
          </span>
          <br />
          <span style={{ color: "#fff" }}>
            Aluno(a): {localStorage.getItem("@meuboleto/nome")}
          </span>
          <br />
          <br />
          {/* <span style={{ color: '#fff' }}>Turma: {user.turma}</span><br/><br/> */}
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="6" style={{ color: "#fff" }}>
                <form onSubmit={onSubmitContext}>
                  <div class="form-group">
                    <label>Escolha o ano letivo e a turma:</label>
                    <select
                      id="codturma"
                      name="codturma"
                      class="form-control input-shadow"
                      onChange={onChange}
                      required
                    >
                      {/* <option >Selecione a Turma</option> */}
                      {isLoadTurmas ? (
                        <option>Carregando...</option>
                      ) : (
                        dadosturmas.map((itemTurma) => (
                          <option
                            key={itemTurma.CODTURMA}
                            value={
                              itemTurma.CODTURMA + "@" + itemTurma.CODPERLET + "@" + itemTurma.CODFILIAL
                            }
                          >
                            {itemTurma.NOMETURMA} - {itemTurma.CODTURMA} -{" "}
                            {itemTurma.CODPERLET}
                          </option>
                        ))
                      )}
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
                          <span className="h2 font-weight-bold mb-0">
                            {totmensalidades}
                          </span>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        Mensalidades e Serviços
                      </span>
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
                        <span className="h2 font-weight-bold mb-0">
                          {totmensalidadespagas}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Mensalidades pagas</span>
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
                        <span className="h2 font-weight-bold mb-0">
                          {totmensalidadesabertas}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="ni ni-calendar-grid-58" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        Mensalidades em aberto
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* Só mostrar a Bolsa se ela existeir */}
              {tembolsa > 0 ? (
                <Col lg="6" xl="3">
                  {/* <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Bolsa
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {
                              tpdesc == "%" ? desconto + ' ' + tpdesc : tpdesc + ' ' + desconto
                            }
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            {
                              tpdesc == "%" ? <i className="fas fa-percent" /> : <i class="fas fa-dollar-sign"></i>
                            }
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Desconto concedido</span>
                      </p>
                    </CardBody>
                  </Card> */}
                </Col>
              ) : (
                ""
              )}
            </Row>
          </div>
        </Container>
      </div>

      {/* FIM DO HEADER */}

      {/*   MODAL (AGENDAR / PAGAR)  */}

      <Modal centered isOpen={modalagendamento} toggle={abriropcao}>
        <ModalHeader toggle={abriropcao}>Pagamento / Agendamento</ModalHeader>
        <ModalBody>
          <Col lg="12" xl="12" style={{ color: "#fff" }}>
            <>
              <Button
                color={localStorage.getItem("@meuboleto-app/bgcolor")}
                onClick={() => {
                  /* ORIGINAL */
                  setModal(!modal);
                  //setValidboleto(props.idboleto);
                  //settipoparcelamento(props.tipoparcelamento);
                }}
              >
                Pagar com cartão
              </Button>

              <Button
                color={localStorage.getItem("@meuboleto-app/bgcolor")}
                onClick={() => {
                  /* ORIGINAL */
                  setModalagendar(!modalagendar);
                  //setValidboleto(props.idboleto);
                  //settipoparcelamento(props.tipoparcelamento);

                  var myHeaders = new Headers();
                  myHeaders.append(
                    "Cookie",
                    "ci_session=ppvr57m0uuj42g8t10f947i2tf7j4jup"
                  );

                  var requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                  };

                  fetch(
                    `https://suporteinspira.com.br/api/meuboleto/index.php/api/listamaterialagendado?ra=${localStorage.getItem(
                      "@meuboleto/ra"
                    )}&coligada=${localStorage.getItem(
                      "@meuboleto-app/coligada"
                    )}&codturma=${localStorage.getItem(
                      "@meuboleto/turma"
                    )}&codperlet=${localStorage.getItem("@meuboleto/perlet")}`,
                    requestOptions
                  )
                    .then((response) => response.json())
                    .then((result) => {
                      // console.log(result)
                      setDadosagendados(result.dados);
                    })
                    .catch((error) => console.log("error", error));
                }}
              >
                Agendar Pagamento
              </Button>
            </>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={abriropcao}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>

      {/*   FIM DO MODAL (AGENDAR / PAGAR)  */}

      {/*   MODAL AGENDAR  */}

      <Modal centered isOpen={modalagendar} toggle={abriragendamento}>
        <ModalHeader toggle={abriragendamento}>
          Agendamento de pagamento recorrente
        </ModalHeader>
        <ModalBody>
          <Col lg="12" xl="12" style={{ color: "#fff" }}>
            <span style={{ color: "#141414" }}>Boletos a serem agendados:</span>
            <br />
            <br />

            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Boleto</th>
                  <th scope="col">Vencimento</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {dadosagendados.length > 0 ? (
                  dadosagendados.map((itemParc, Index) => (
                    <tr>
                      <td>{itemParc.IDBOLETO}</td>
                      <td>{itemParc.VENCIMENTO}</td>
                      <td>{itemParc.VALORLIQ}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="3">Não existem boletos a serem agendadas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </ModalBody>
        <ModalFooter>
          {dadosagendados.length > 0 ? (
            <Button
              color={localStorage.getItem("@meuboleto-app/bgcolor")}
              onClick={onSubmitAgendamento}
            >
              {
                isloading ? (<><SpinnerCircular color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" size={20} /><span>Aguarde...</span></>)
                : 'Agendar Pagamento'
              }
              
            </Button>
          ) : (
            ""
          )}

          <Button color="secondary" onClick={abriragendamento}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>

      {/*   FIM DO MODAL AGENDAR  */}

      <Modal centered isOpen={modal3} toggle={abrirboleto}>
        <ModalHeader toggle={abrirboleto}>
          <h3>Boleto Bancário </h3>
        </ModalHeader>
        <ModalBody>
          <span>Código de barras</span>
          <div style={{ marginTop: "10px" }} class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder=""
              value={ipte}
              disabled
            />
            <div class="input-group-append">
              <CopyToClipboard text={ipte} onCopy={() => setCopiedText(ipte)}>
                <button
                  class={`btn btn-${localStorage.getItem(
                    "@meuboleto-app/bgcolor"
                  )} btn-block`}
                  name="ipte"
                  id="ipte"
                  type="button"
                >
                  <i class="far fa-copy"></i>
                </button>
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
            href={`https://www.suporteinspira.com.br/integracao/backoffice/financeiro/boletoonline/index.php/visualizar?tipo=${tipobtn}&coligada=${localStorage.getItem(
              "@meuboleto-app/coligada"
            )}&idboleto=${validboleto}&ra=${localStorage.getItem(
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

      {/* FIM DO MODAL DIVERSOS */}


      {/* MODAL PIX */}

      <Modal centered isOpen={modalpix} toggle={abrirpix}>
        <ModalHeader toggle={abrirpix}>
          <h3>Pagamento via Pix </h3>
        </ModalHeader>
        <ModalBody>
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }} class="input-group mb-3">
            <img src="data:image/png;base64,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" alt="Red dot" />
          </div>
          <span><b>Mensalidades - Ensino Fundamental II</b></span><br/>
          <span>Valor: <b>R$ 1388.75</b></span><br/>
          <span>Vencimento: 09/02/2022</span>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={abrirpix}>
            Fechar
          </Button>
        </ModalFooter> */}
      </Modal>

      {/* FIM DO MODAL PIX */}

      {/* MODAL PARCELAMENTO */}
      <Modal centered isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Parcelamento</ModalHeader>
        <ModalBody>
          <Col lg="12" xl="12" style={{ color: "#fff" }}>
            <form>
              {/* <form onSubmit={onSubmitParcelas}> */}
              <div class="form-group">
                <label style={{ color: "#000" }}>
                  Escolha o número de parcelas:
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
                  {/* <option value={"2"}>2x</option> */}
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
                <h3 className="mb-0">Mensalidades e Serviços - {codperlet} </h3>
              </CardHeader>
              {width > 426 ? (
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
                    {dadosmensalidades.length > 0 ? (
                      dadosmensalidades.map((itemBoleto, index) => {
                        var hj = new Date();
                        var vencto = new Date(itemBoleto.DTVENCTO); // já está no formato "DD/MM/YYYY"

                        var hoje = moment(hj).format("DD/MM/YYYY");
                        var vencimento = moment(itemBoleto.DTVENCTO).format(
                          "DD/MM/YYYY"
                        );

                        let date1 = moment(hj, "DD-MM-YYYY").valueOf();
                        let date2 = moment(
                          itemBoleto.DTVENCTO,
                          "DD-MM-YYYY"
                        ).valueOf();

                        //alert((date1 > date2 ? 'date1' : 'date2') + " is greater..."  )

                        // if (date1 > date2) {
                        //   alert(date1,date2,"Vencido." )
                        // } else {
                        //   alert(date1,date2,"Aberto." )
                        // }

                        var statusbol = "";
                        var statucnab = itemBoleto.CNABSTATUS;

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
                            break;
                        }
                        return (
                          <tr key={`${itemBoleto.IDBOLETO}`}>
                            <th scope="row">
                              {}
                              <Media className="align-items-center">
                                <a className="avatar rounded-circle mr-3">
                                  {itemBoleto.STATUS == 1 ? (
                                    <img
                                      alt="..."
                                      src={
                                        require("../assets/img/theme/pago.jpg")
                                          .default
                                      }
                                    />
                                  ) : vencto < hj ? (
                                    itemBoleto.CNABSTATUS == 2 ? (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/vencido.jpg")
                                            .default
                                        }
                                      />
                                    ) : (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/indiponivel.jpg")
                                            .default
                                        }
                                      />
                                    )
                                  ) : (
                                    <img
                                      alt="..."
                                      src={
                                        require("../assets/img/theme/imprimir.jpg")
                                          .default
                                      }
                                    />
                                  )}
                                </a>
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {itemBoleto.QTDLANCAMENTOS > 1 ? (
                                      <Diversos
                                        idboleto={itemBoleto.IDBOLETO}
                                      />
                                    ) : (
                                      <Servico idboleto={itemBoleto.IDBOLETO} />
                                    )}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            {/* <td>{ (date1 > date2 ? 'date1 | ' : 'date2 | ') + hoje + ' / ' +vencimento + " é maior..."  }</td> */}
                            {/* <td>{ hoje + ' / ' + vencimento} | { date1 > date2 ? 'vencido' : 'aberto'}</td> */}
                            {/* <td>{ hoje > vencimento ? 'vencido' : 'aberto'}</td> */}
                            {/* <td>{itemBoleto.IDBOLETO}</td> */}
                            <td>{itemBoleto.IDBOLETO}</td>
                            <td>{itemBoleto.VENCIMENTO}</td>
                            <td>{itemBoleto.VALOR}</td>
                            <td>
                              {/* <span>{hj +' / '+ vencto}</span> */}
                              <Badge color="" className="badge-dot mr-4">
                                {/* {
                                  <>
                                  <i className="bg-success" />
                                    {itemBoleto.LAN_STATUS}
                                  </>
                                } */}
                                
                                {itemBoleto.STATUSLAN+','+itemBoleto.STATUS+','+itemBoleto.CNABSTATUS+' - '}
                                {itemBoleto.LAN_STATUS}
                                
                                {/* {itemBoleto.STATUS == 1 ? (
                                  <>
                                    <i className="bg-success" />
                                      {itemBoleto.STATUSLAN+','+itemBoleto.STATUS+','+itemBoleto.CNABSTATUS+' - '}
                                      {itemBoleto.LAN_STATUS}
                                  </>
                                ) : hj > vencto ? (
                                  itemBoleto.CNABSTATUS == 2 ? (
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
                                )} */}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {
                                  itemBoleto.BTN_STATUS == 'Imprimir' ? (
                                    <>
                                      <BtnBoleto
                                          idboleto={itemBoleto.IDBOLETO}
                                          statusboleto={statucnab}
                                          ipte={itemBoleto.IPTE}
                                          codbarras={itemBoleto.CODIGOBARRAS}
                                          tipo="mensalidade"
                                      />
                                      <br />
                                      <BtnCartao
                                          idboleto={itemBoleto.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      />
                                      <br />
                                      {/* <BtnPix
                                          idboleto={itemBoleto.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      /> */}
                                    </>
                                  ) : null

                                }
                                
                                {
                                  itemBoleto.BTN_STATUS == 'NExibir' ? (
                                    <>
                                      
                                    </>
                                  ) : null

                                }

                                {
                                  itemBoleto.BTN_STATUS == 'Pago' ? (
                                    <>
                                      <a
                                        class={`btn btn-${localStorage.getItem(
                                          "@meuboleto-app/bgcolor"
                                        )} btn-block`}
                                      >
                                        PAGO
                                      </a>
                                    </>
                                  ) : null

                                }
                                
                                {
                                  itemBoleto.BTN_STATUS == 'Solicitar' ? (
                                    <>
                                      <SolicitarBoletos
                                        statucnab={itemBoleto.statucnab}
                                        codcoligada={localStorage.getItem(
                                          "@meuboleto-app/coligada"
                                        )}
                                        idboleto={itemBoleto.IDBOLETO}
                                      />
                                      <br />
                                      <BtnCartao
                                          idboleto={itemBoleto.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      />
                                      {/* <br />
                                      <BtnPix
                                          idboleto={itemBoleto.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      /> */}

                                    </>
                                  ) : null

                                }

                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                      {dadosmensalidades.length === 0 ? (
                        <TableSkeleton />
                      ) : (
                        <span>
                          Não foram encontrados dados a serem exibidos...
                        </span>
                      )}
                      </>
                    )}
                  </tbody>
                </Table>
              ) : (
                // <span> Tabela </span>
                <CardBody>
                  {dadosmensalidades.length > 0 ? (
                    dadosmensalidades.map((itemBoleto, index) => {
                      var hj = new Date();
                      var vencto = new Date(itemBoleto.DTVENCTO); // já está no formato "DD/MM/YYYY"
                      var statusbol = "";
                      var statucnab = itemBoleto.CNABSTATUS;

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
                                }}
                              >
                                <span
                                  style={{
                                    float: "left",
                                    color: "#707070",
                                    textAlign: "left",
                                    fontSize: 14,
                                    marginTop: 3,
                                    marginLeft: 10,
                                  }}
                                >
                                  Vencimento: {itemBoleto.VENCIMENTO}
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
                                    {itemBoleto.STATUS == 1 ? (
                                      <>
                                        <i className="bg-success" />
                                        Pago
                                      </>
                                    ) : vencto < hj ? (
                                      itemBoleto.CNABSTATUS == 2 ? (
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
                                  marginLeft: 10,
                                  marginTop: 5,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                <a className="avatar rounded-circle mr-3">
                                  {itemBoleto.STATUS == 1 ? (
                                    <img
                                      alt="..."
                                      src={
                                        require("../assets/img/theme/pago.jpg")
                                          .default
                                      }
                                    />
                                  ) : vencto < hj ? (
                                    itemBoleto.CNABSTATUS == 2 ? (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/vencido.jpg")
                                            .default
                                        }
                                      />
                                    ) : (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/indiponivel.jpg")
                                            .default
                                        }
                                      />
                                    )
                                  ) : (
                                    <img
                                      alt="..."
                                      src={
                                        require("../assets/img/theme/imprimir.jpg")
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
                                    color: "#000",
                                  }}
                                >
                                  <span className="mb-0 text-sm">
                                    {itemBoleto.QTDLANCAMENTOS > 1 ? (
                                      <>
                                        {" "}
                                        <span>{itemBoleto.VALOR}</span> -{" "}
                                        <Diversos
                                          idboleto={itemBoleto.IDBOLETO}
                                        />{" "}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <span>{itemBoleto.VALOR}</span> -{" "}
                                        <Servico
                                          idboleto={itemBoleto.IDBOLETO}
                                        />{" "}
                                      </>
                                    )}
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
                                className="d-flex align-items-center"
                              >
                                {itemBoleto.STATUS == 1 ? (
                                  <span />
                                ) : // <a
                                //   class={`btn btn-${localStorage.getItem(
                                //     "@meuboleto-app/bgcolor"
                                //   )} btn-block`}
                                // >
                                //   PAGO
                                // </a>
                                vencto < hj ? (
                                  itemBoleto.CNABSTATUS == 2 ? (
                                    <>
                                      <BtnBoleto
                                        idboleto={itemBoleto.IDBOLETO}
                                        ipte={itemBoleto.IPTE}
                                        codbarras={itemBoleto.CODIGOBARRAS}
                                        tipo="mensalidade"
                                      />
                                      <br />
                                      <BtnCartao
                                        idboleto={itemBoleto.IDBOLETO}
                                        tipoparcelamento="Mensalidade"
                                      />
                                      <br />
                                    </>
                                  ) : (
                                    <SolicitarBoletos
                                      statucnab={itemBoleto.statucnab}
                                      codcoligada={localStorage.getItem(
                                        "@meuboleto-app/coligada"
                                      )}
                                      idboleto={itemBoleto.IDBOLETO}
                                    />
                                  )
                                ) : (
                                  <>
                                    <BtnBoleto
                                      idboleto={itemBoleto.IDBOLETO}
                                      ipte={itemBoleto.IPTE}
                                      codbarras={itemBoleto.CODIGOBARRAS}
                                      tipo="mensalidade"
                                    />
                                    <br />
                                    <BtnCartao
                                      idboleto={itemBoleto.IDBOLETO}
                                      tipoparcelamento="Mensalidade"
                                    />
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
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {dadosmensalidades.length === 0 ? (
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
                      )}
                    </div>
                  )}
                </CardBody>

                // <span> Card </span>
              )}

              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
        <div style={{ marginTop: "40px" }}>
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
                        <span className="h2 font-weight-bold mb-0">
                          {totmmaterial}
                        </span>
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Boletos de material</span>
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
                      <span className="h2 font-weight-bold mb-0">
                        {totmaterialpagas}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-chart-pie" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap">
                      Boletos de material pagos
                    </span>
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
                      <span className="h2 font-weight-bold mb-0">
                        {totmaterialabertas}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                        <i className="ni ni-calendar-grid-58" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap">
                      Boletos de material aberto
                    </span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ marginTop: "30px" }}>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Material Didático - {codperlet} </h3>
                </CardHeader>
                {width > 426 ? (
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
                                          require("../assets/img/theme/pago.jpg")
                                            .default
                                        }
                                      />
                                    ) : vencto < hj ? (
                                      itemMaterial.CNABSTATUS == 2 ? (
                                        <img
                                          alt="..."
                                          src={
                                            require("../assets/img/theme/vencido.jpg")
                                              .default
                                          }
                                        />
                                      ) : (
                                        <img
                                          alt="..."
                                          src={
                                            require("../assets/img/theme/indiponivel.jpg")
                                              .default
                                          }
                                        />
                                      )
                                    ) : (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/imprimir.jpg")
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
                                  {itemMaterial.STATUSLAN+','+itemMaterial.STATUS+','+itemMaterial.CNABSTATUS+' - '}
                                  {itemMaterial.LAN_STATUS}

                                  {/* {itemMaterial.STATUS == 1 ? (
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
                                  )} */}
                                </Badge>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                {
                                  itemMaterial.BTN_STATUS == 'Imprimir' ? (
                                    <>
                                      <BtnBoleto
                                        idboleto={itemMaterial.IDBOLETO}
                                        ipte={itemMaterial.IPTE}
                                        codbarras={
                                          itemMaterial.CODIGOBARRAS
                                        }
                                        tipo="material"
                                      />
                                      <br/>
                                        {
                                          dadosparamsmd !== undefined ? (
                                            dadosparamsmd.PAGAGENDADOMD == "S" ? (
                                              itemMaterial.AGENDAMENTOSTATUS == "AGENDADO" ? (
                                                <>
                                                  <BtnAgendamento
                                                    idboleto={itemMaterial.IDBOLETO}
                                                    idlan={itemMaterial.IDLAN}
                                                    status={
                                                      itemMaterial.AGENDAMENTOSTATUS
                                                    }
                                                    tipoparcelamento="MD"
                                                    tipo="material"
                                                    titulobtn="PGTO. AGENDADO"
                                                  />
                                                  <br />
                                                </>
                                              ) : (
                                                itemMaterial.AGENDAMENTOSTATUS ==
                                                "CONCLUIDO" ||
                                                itemMaterial.AGENDAMENTOSTATUS ==
                                                  "CANCELADO" ? (
                                                  <>
                                                    <BtnAgendamento
                                                      idboleto={itemMaterial.IDBOLETO}
                                                      idlan={itemMaterial.IDLAN}
                                                      status={
                                                        itemMaterial.AGENDAMENTOSTATUS
                                                      }
                                                      tipoparcelamento="MD"
                                                      tipo="material"
                                                      titulobtn="REFAZER AGENDAMENTO"
                                                    />
                                                  </>
                                                ) : (
                                                  <>
                                                    <BtnCartaoMD
                                                      idboleto={itemMaterial.IDBOLETO}
                                                      idlan={itemMaterial.IDLAN}
                                                      tipoparcelamento="MD"
                                                    />
                                                    <br />
                                                  </>
                                                )
                                              )
                                            ) : (
                                              <>
                                                <BtnCartao
                                                  idboleto={itemMaterial.IDBOLETO}
                                                  idlan={itemMaterial.IDLAN}
                                                  tipoparcelamento="MD"
                                                />
                                                <br />
                                              </>
                                            )
                                          ) : (
                                            <>
                                              <BtnCartao
                                                idboleto={itemMaterial.IDBOLETO}
                                                idlan={itemMaterial.IDLAN}
                                                tipoparcelamento="MD"
                                              />
                                              <br />
                                            </>
                                          )
                                        }
                                        

                                      {/* <BtnBoleto
                                        idboleto={itemMaterial.IDBOLETO}
                                        ipte={itemMaterial.IPTE}
                                        codbarras={
                                          itemMaterial.CODIGOBARRAS
                                        }
                                        tipo="material"
                                      />
                                      <br />
                                      <BtnCartao
                                        idboleto={itemMaterial.IDBOLETO}
                                        idlan={itemMaterial.IDLAN}
                                        tipoparcelamento="MD"
                                      />
                                      <br />
                                      <BtnPix
                                          idboleto={itemMaterial.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      /> */}
                                    </>
                                  ) : null

                                }
                                
                                {
                                  itemMaterial.BTN_STATUS == 'NExibir' ? (
                                    <>
                                      
                                    </>
                                  ) : null

                                }

                                {
                                  itemMaterial.BTN_STATUS == 'Pago' ? (
                                    <>
                                      <a
                                        class={`btn btn-${localStorage.getItem(
                                          "@meuboleto-app/bgcolor"
                                        )} btn-block`}
                                      >
                                        PAGO
                                      </a>
                                    </>
                                  ) : null

                                }
                                
                                {
                                  itemMaterial.BTN_STATUS == 'Solicitar' ? (
                                    <>
                                      <SolicitarBoletos
                                        statucnab={itemMaterial.statucnab}
                                        codcoligada={localStorage.getItem(
                                          "@meuboleto-app/coligada"
                                        )}
                                        idboleto={itemMaterial.IDBOLETO}
                                      />
                                      <br />
                                      <BtnCartao
                                          idboleto={itemMaterial.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      />
                                      {/* <br />
                                      <BtnPix
                                          idboleto={itemMaterial.IDBOLETO}
                                          tipoparcelamento="Mensalidade"
                                      /> */}

                                    </>
                                  ) : null

                                }

                                
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                        {dadosmaterial.length === 0 ? (
                          <TableSkeleton />
                        ) : (
                          <span>
                            Não foram encontrados dados a serem
                            exibidos...
                          </span>
                        )}
                        </>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <CardBody>
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
                                  }}
                                >
                                  <span
                                    style={{
                                      float: "left",
                                      color: "#707070",
                                      textAlign: "left",
                                      fontSize: 14,
                                      marginTop: 3,
                                      marginLeft: 10,
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
                                    marginLeft: 10,
                                    marginTop: 5,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <a className="avatar rounded-circle mr-3">
                                    {itemMaterial.STATUS == 1 ? (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/pago.jpg")
                                            .default
                                        }
                                      />
                                    ) : vencto < hj ? (
                                      itemMaterial.CNABSTATUS == 2 ? (
                                        <img
                                          alt="..."
                                          src={
                                            require("../assets/img/theme/vencido.jpg")
                                              .default
                                          }
                                        />
                                      ) : (
                                        <img
                                          alt="..."
                                          src={
                                            require("../assets/img/theme/indiponivel.jpg")
                                              .default
                                          }
                                        />
                                      )
                                    ) : (
                                      <img
                                        alt="..."
                                        src={
                                          require("../assets/img/theme/imprimir.jpg")
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
                                      color: "#000",
                                    }}
                                  >
                                    <span className="mb-0 text-sm">
                                      {itemMaterial.QTDLANCAMENTOS > 1 ? (
                                        <>
                                          {" "}
                                          <span>{itemMaterial.VALORLIQ}</span> -
                                          Material didático{" "}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <span>{itemMaterial.VALORLIQ}</span> -
                                          Material didático{" "}
                                        </>
                                      )}
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
                                  className="d-flex align-items-center"
                                >
                                  {itemMaterial.STATUS == 1 ? (
                                    <span />
                                  ) : // <a
                                  //   class={`btn btn-${localStorage.getItem(
                                  //     "@meuboleto-app/bgcolor"
                                  //   )} btn-block`}
                                  // >
                                  //   PAGO
                                  // </a>
                                  vencto < hj ? (
                                    itemMaterial.CNABSTATUS == 2 ? (
                                      <>
                                        <BtnBoleto
                                          idboleto={itemMaterial.IDBOLETO}
                                          ipte={itemMaterial.IPTE}
                                          codbarras={itemMaterial.CODIGOBARRAS}
                                          tipo="material"
                                        />
                                        <br />
                                        <BtnCartaoMD
                                          idboleto={itemMaterial.IDBOLETO}
                                          idlan={itemMaterial.IDLAN}
                                          tipoparcelamento="MD"
                                        />
                                        <br />
                                      </>
                                    ) : (
                                      <a class={`btn btn-warning btn-block`}>
                                        {statusbol.toUpperCase()}
                                      </a>
                                    )
                                  ) : (
                                    <>
                                      <BtnBoleto
                                        idboleto={itemMaterial.IDBOLETO}
                                        ipte={itemMaterial.IPTE}
                                        codbarras={itemMaterial.CODIGOBARRAS}
                                        tipo="material"
                                      />
                                      <br />
                                      <BtnCartaoMD
                                        idboleto={itemMaterial.IDBOLETO}
                                        idlan={itemMaterial.IDLAN}
                                        tipoparcelamento="MD"
                                      />
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
                        );
                      })
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {dadosmensalidades.length === 0 ? (
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
                        )}
                      </div>
                    )}
                  </CardBody>

                  // <span> Card </span>
                )}
                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Tables;
