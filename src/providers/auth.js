import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    logado: false,
    nome: "",
    ra: "",
    email: "",
    dtnasc: "",
    turma: "",
    perlet: "",
    color: "",
    rsmaterial: [],
    rsmensalidades: [],
    rstotal: 0,
    rstotalpagas: 0,
    rstotalabertas: 0,
    bgcolor: ""
});

  useEffect(() => {
    //setUser({ name: "Alessandro"});
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);