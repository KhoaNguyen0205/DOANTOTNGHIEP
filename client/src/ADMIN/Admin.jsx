/* eslint-disable no-unused-vars */
import { faA, faB, faBell, faBox, faBoxOpen, faC, faChartColumn, faHome, faMessage, faMoneyBill, faMoneyBill1Wave, faPeopleArrows, faPeopleCarry, faPeopleGroup, faRing, faSignOut, faTicket, faTicketAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../userContext";
import Dashboard from "./DashBoard";

export default function Admin() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext)
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  const [notifNewOrders, setNotifNewOrder] = useState([]);
  const [notifStockOuts, setNotifStockOuts] = useState([]);
  const [notifOverStocks, setNotifOverStocks] = useState([]);
  useEffect(() => {
    axios.get('/api/notification/new-order').then(response => {
      setNotifNewOrder(response.data);
      console.log(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get('/api/notification/out-of-stock').then(response => {
      setNotifStockOuts(response.data);
      console.table(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get('/api/notification/overStock').then(response => {
      setNotifOverStocks(response.data);
    })
  }, [])

  const allNotif = [...notifNewOrders, ...notifOverStocks, ...notifStockOuts];

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
        return 'Product Management';
      case 'adminpage/voucher':
        return 'Voucher';
      case 'adminpage/order':
        return 'Order Management';

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
          <li className={getItemClassName('/adminpage/notification')}>
            <div className="total-quantity-notification">{allNotif.length}</div>
            <Link to={'/adminpage/notification'} >
              <FontAwesomeIcon icon={faBell} className="admin-aside-icon" /> Notification
            </Link>
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
          <li className={getItemClassName('/adminpage/chat/')}>
            <Link to={'/adminpage/chat/'}>
              <FontAwesomeIcon icon={faMessage} className="admin-aside-icon" />Chat
            </Link>
          </li>
          <li className={getItemClassName('/adminpage/voucher')}>
            <Link to={'/adminpage/voucher'}>
              <FontAwesomeIcon icon={faTicket} className="admin-aside-icon" /> Voucher
            </Link>
          </li>
          <li className={getItemClassName('/adminpage/voucher')}>
            <Link to={'/adminpage/voucher'}>
              <FontAwesomeIcon icon={faTicket} className="admin-aside-icon" /> Inventory
            </Link>
          </li>
        </ul>
      </aside>
      <div className="admin-content-container">
        <Dashboard />
      </div>
    </div>
  );
}
