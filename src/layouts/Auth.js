import React, { useState } from "react";
import { BrowserRouter as Router, useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
// import Login from "../views/examples/Login";
import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const [coligada, setColigada] = useState(12);
  const [color, setColor] = useState('');
  const [bgcolor, setBgcolor] = useState('');

  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;

    const search = props.location.search; 
    const params = new URLSearchParams(search);
    const _coligada = params.get('coligada');
    // console.log(_coligada);
    setColigada(_coligada);
    localStorage.setItem("@meuboleto-app/coligada",_coligada);

    if (_coligada === '1' ) {
      document.body.classList.add("bg-physics");
      setBgcolor("bg-physics py-7 py-lg-8");
      setColor("physics");
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '2' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      setColor("physics");
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '3' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      setColor("physics");
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '4' ){
      document.body.classList.add("bg-enfase");
      setBgcolor('bg-enfase py-7 py-lg-8');
      setColor("enfase");
      localStorage.setItem("@meuboleto-app/bgcolor",'enfase');
    } else if ( _coligada  === '7' ){
      document.body.classList.add("bg-stella");
      setBgcolor('bg-stella py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'stella');
    } else if ( _coligada  === '10' ){
      document.body.classList.add("bg-joaopaulo");
      setBgcolor('bg-joaopaulo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'joaopaulo');
    } else if ( _coligada  === '12' ){
      document.body.classList.add("bg-inspira");
      setBgcolor('bg-inspira py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'inspira');
    } else if ( _coligada  === '14' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '15' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '17' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '18' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '19' ){
      document.body.classList.add("bg-stella");
      setBgcolor('bg-stella py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'stella');
    } else if ( _coligada  === '20' ){
      document.body.classList.add("bg-stella");
      setBgcolor('bg-stella py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'stella');
    } else if ( _coligada  === '21' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '22' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '23' ){
      document.body.classList.add("bg-acesso");
      setBgcolor('bg-acesso py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'acesso');
    } else if ( _coligada  === '32' ){
      document.body.classList.add("bg-pmundo");
      setBgcolor('bg-pmundo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'pmundo');
    } else if ( _coligada  === '34' ){
      document.body.classList.add("bg-pmundo");
      setBgcolor('bg-pmundo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'pmundo');
    } else if ( _coligada  === '35' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '36' ){
      document.body.classList.add("bg-over");
      setBgcolor('bg-over py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'over');
    } else if ( _coligada  === '37' ){
      document.body.classList.add("bg-over");
      setBgcolor('bg-over py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'over');
    } else if ( _coligada  === '38' ){
      document.body.classList.add("bg-over");
      setBgcolor('bg-over py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'over');
    } else if ( _coligada  === '39' ){
      document.body.classList.add("bg-portinari");
      setBgcolor('bg-portinari py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'portinari');
    } else if ( _coligada  === '41' ){
      document.body.classList.add("bg-joaopaulo");
      setBgcolor('bg-joaopaulo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'joaopaulo');
    } else if ( _coligada  === '43' ){
      document.body.classList.add("bg-universitario");
      setBgcolor('bg-universitario py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'universitario');
    } else if ( _coligada  === '44' ){
      document.body.classList.add("bg-contemporaneo");
      setBgcolor('bg-contemporaneo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'contemporaneo');
    } else if ( _coligada  === '47' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '48' ){
      document.body.classList.add("bg-montessori");
      setBgcolor('bg-montessori py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'montessori');
    } else if ( _coligada  === '49' ){
      document.body.classList.add("bg-pmundo");
      setBgcolor('bg-pmundo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'pmundo');
    } else if ( _coligada  === '51' ){
      document.body.classList.add("bg-ita");
      setBgcolor('bg-ita py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'ita');
    } else if ( _coligada  === '52' ){
      document.body.classList.add("bg-domus");
      setBgcolor('bg-domus py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'domus');
    } else if ( _coligada  === '54' ){
      document.body.classList.add("bg-physics");
      setBgcolor('bg-physics py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'physics');
    } else if ( _coligada  === '55' ){
      document.body.classList.add("bg-marilia");
      setBgcolor('bg-marilia py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'marilia');
    } else if ( _coligada  === '56' ){
      document.body.classList.add("bg-novotempo");
      setBgcolor('bg-novotempo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'novotempo');
    } else if ( _coligada  === '57' ){
      document.body.classList.add("bg-novotempo");
      setBgcolor('bg-novotempo py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'novotempo');
    } else if ( _coligada  === '58' ){
      document.body.classList.add("bg-simbios");
      setBgcolor('bg-simbios py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'simbios');
    } else if ( _coligada  === '59' ){
      document.body.classList.add("bg-simbios");
      setBgcolor('bg-simbios py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'simbios');
    } else if ( _coligada  === '64' ){
      document.body.classList.add("bg-magnum");
      setBgcolor('bg-magnum py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'magnum');
    } else if ( _coligada  === '65' ){
      document.body.classList.add("bg-marilia");
      setBgcolor('bg-marilia py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'marilia');
    } else if ( _coligada  === '66' ){
      document.body.classList.add("bg-marilia");
      setBgcolor('bg-marilia py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'marilia');
    } else {
      document.body.classList.add("bg-inspira");
      setBgcolor('bg-inspira py-7 py-lg-8');
      localStorage.setItem("@meuboleto-app/bgcolor",'inspira');
    }

  }, [location]);


  React.useEffect(() => {
    //document.body.classList.add("bg-domus");
  return () => {
    document.body.classList.remove("bg-default");
  };
}, []);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <>
            {/* <Route
              path="/login"
              component={Login}
              key="KPDLOG"
            /> */}
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          </>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        {/* <AuthNavbar /> */}
        <div className={bgcolor}>
          
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </>
  );
};

export default Auth;
