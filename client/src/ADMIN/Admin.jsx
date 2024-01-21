/* eslint-disable no-unused-vars */
import { faBox, faBoxOpen, faChartColumn, faMoneyBill, faSignOut, faTicket, faTicketAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../userContext";

export default function Admin() {
  const[redirect, setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext)
  const location = useLocation();
  const getItemClassName = (path) => {
    return location.pathname === path ? "admin-active-item" : "";
  };
  async function logout() {
    await axios.post('logout');
    setRedirect('/adminpage')
    setUser(null);
 }
  return (
    <div className="admin-container">
      <aside>
        <div className="admin-menu">
          <Link title="Product" className={getItemClassName('/adminpage/product')}
            to={'/adminpage/product'}>
            <FontAwesomeIcon icon={faBoxOpen} />
          </Link>
          <Link className="">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link className="">
            <FontAwesomeIcon icon={faChartColumn} />
          </Link>
          <Link className="">
            <FontAwesomeIcon icon={faMoneyBill} />
          </Link>
          <Link className="">
            <FontAwesomeIcon icon={faTicketAlt} />
          </Link>
        </div>
        <div>
          <FontAwesomeIcon icon={faSignOut} onClick={logout} style={{color: "red", marginLeft:'20px',height:'1.3em'}} />
        </div>
        </aside>
     
    </div>
  );
}
