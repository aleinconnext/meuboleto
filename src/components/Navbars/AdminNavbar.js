import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useAuth } from "../../providers/auth";

const AdminNavbar = (props) => {
  const history = useHistory();
  const { user, setUser } = useAuth();

  function logout() {
    var data = new Date();
    var ano = data.getFullYear();
    var _coligada = localStorage.getItem("@meuboleto-app/coligada");
    setUser({ 
      nome: "",
      ra: "",
      email: "",
      coligada: _coligada,
      dtnasc: "",
      bgcolor: "",
      turma: "",
      perlet: ano,
      logado: false,
    });
    localStorage.removeItem("@meuboleto/perlet");
    localStorage.removeItem("@meuboleto/email");
    localStorage.removeItem("@meuboleto/logado");
    localStorage.removeItem("@meuboleto/nome");
    localStorage.removeItem("@meuboleto/ra");
    localStorage.removeItem("@meuboleto/dtnasc");
    localStorage.removeItem("@meuboleto/turma");
    history.push(`/auth/login?coligada=${_coligada}`);
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/no-avatar.png")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    {localStorage.getItem("@meuboleto/nome")}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem> 
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Selecione a Turma</span>
                </DropdownItem>*/}
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> 
                <DropdownItem divider />*/}
                <DropdownItem onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Sair</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
