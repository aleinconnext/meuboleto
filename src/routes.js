import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Material from "views/examples/Material.js";
import Icons from "views/examples/Icons.js";
import Declaracao from "views/examples/Declaracao.js";
import DeclaracaoIR from "views/examples/DeclaracaoIR.js";

var routes = [
  {
    path: "/index",
    name: "Mensalidades / Material",
    icon: "ni ni-hat-3",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/material",
    name: "Material",
    icon: "ni ni-books",
    component: Material,
    layout: "/admin",
  },
  // {
  //   path: "/acordos",
  //   name: "Acordos",
  //   icon: "ni ni-briefcase-24",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/irrf",
    name: "Declaração de IRRF",
    icon: "ni ni-paper-diploma",
    component: DeclaracaoIR,
    layout: "/admin",
  },
  {
    path: "/quitacao",
    name: "Declaração de Quitação",
    icon: "ni ni-archive-2",
    component: Declaracao,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "FAQ - Perguntas",
    icon: "ni ni-key-25",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
