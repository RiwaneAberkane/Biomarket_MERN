import { useState } from "react";
import {
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  let menu: any[] = [];
  const { user } = useUserContext();

  const menuItemAdmin = [
    {
      path: "/product",
      name: "Produits",
      icon: <FaShoppingBag />,
    },
    {
      path: "/supplier",
      name: "Fournisseurs",
      icon: <FaUserAlt />,
    },

    {
      path: "/sale",
      name: "Ventes",
      icon: <FaRegChartBar />,
    },
    {
      path: "/order",
      name: "Commandes",
      icon: <FaCommentAlt />,
    },
    {
      path: "/signup",
      name: "Employés",
      icon: <FaUserAlt />,
    },
  ];

  const menuItemManager = [
    {
      path: "/product",
      name: "Produits",
      icon: <FaShoppingBag />,
    },
    {
      path: "/supplier",
      name: "Fournisseurs",
      icon: <FaUserAlt />,
    },

    {
      path: "/sale",
      name: "Ventes",
      icon: <FaRegChartBar />,
    },
    {
      path: "/order",
      name: "Commandes",
      icon: <FaCommentAlt />,
    },
  ];

  const menuItemEmployees = [
    {
      path: "/product",
      name: "Produits",
      icon: <FaShoppingBag />,
    },
  ];

  switch (user?.role) {
    case "admin":
      menu = menuItemAdmin;
      break;
    case "manager":
      menu = menuItemManager;
      break;
    case "employees":
      menu = menuItemEmployees;
      break;
    default:
      break;
  }
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => (
          <Link to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
