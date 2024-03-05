/* eslint-disable no-unused-vars */
import { faA, faB, faBell, faBox, faBoxOpen, faC, faChartColumn, faDashboard, faHome, faMessage, faMoneyBill, faMoneyBill1Wave, faPeopleArrows, faPeopleCarry, faPeopleGroup, faRing, faSignOut, faTicket, faTicketAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../userContext";

export default function Admin() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext)
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Khi location thay đổi, cập nhật selectedItem
    const path = location.pathname;
    const selectedItemName = getItemNameFromPath(path);
    setSelectedItem(selectedItemName);
  }, [location.pathname]);

  const getItemNameFromPath = (path) => {
    const cleanedPath = path.replace(/^\/|\/$/g, '');

    switch (cleanedPath) {
      case 'adminpage':
        return 'Dashboard';
      case 'adminpage/product':
        return 'Product';
      case 'adminpage/voucher':
        return 'Voucher';
      case 'adminpage/order':
        return 'Order Management'

    }
  }


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
      <nav>
        <div className="nav-adminator">
          ADMINATOR
        </div>
        <div className="content-aside">
          {selectedItem}
        </div>
      </nav>

      <aside>
        <ul>
          <li className={getItemClassName('/adminpage')}>
            <Link to={'/adminpage'}>
              <FontAwesomeIcon icon={faHome} className="admin-aside-icon" />Dashboard
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} className="admin-aside-icon" /> Notification
          </li>
          <li className={getItemClassName('/adminpage/product')}>
            <Link to={'/adminpage/product'}>
              <FontAwesomeIcon icon={faBoxOpen} className="admin-aside-icon" /> Product
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} className="admin-aside-icon" /> Customer
          </li>
          <li>
            <FontAwesomeIcon icon={faChartColumn} className="admin-aside-icon" /> Charts
          </li>
          <li className={getItemClassName('/adminpage/order')}>
            <Link to={'/adminpage/order'}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} className="admin-aside-icon" /> Order
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faMessage} className="admin-aside-icon" />Chat
          </li>
          <li className={getItemClassName('/adminpage/voucher')}>
            <Link to={'/adminpage/voucher'}>
              <FontAwesomeIcon icon={faTicket} className="admin-aside-icon" /> Voucher
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
