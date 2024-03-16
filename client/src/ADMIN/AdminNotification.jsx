/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Admin from "./Admin";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminNotification() {

  const [notifNewOrders, setNotifNewOrder] = useState([]);
  const [notifStockOuts, setNotifStockOuts] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [detailsNotif, setDetailsNotif] = useState(false);
  const [selectedItem, setSelectedItem] = useState('newOrder');
  const [detailsOrders,setDetailsOrders] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [products,setProducts] = useState([]);

  const chooseItem = (item) => {
    setSelectedItem(item);
  };

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
    if (!id) {
        return;
    }
    axios.get(`/api/order/${id}`).then(response => {
        setDetailsOrders(response.data);
    })
}, [id])

  useEffect(() => {
    navigate('/adminpage/notification');
  }, [selectedItem]);

  useEffect(() => {
    axios.get('/api/product/').then(response => {
      setProducts(response.data);
    })
  })

  function hideDetailsNotif() {
    setDetailsNotif(false);
    navigate('/adminpage/notification')
  }

  function hanldeDetailsNotif() {
    if (detailsNotif) {
      setDetailsNotif(false);
    } else {
      setDetailsNotif(true);
    }
  }
  const NewOrder = notifNewOrders.length;

  return (
    <>
      <Admin />
      <div className="admin-content-container">
        <div className="admin-notification-content">
          <div className="notification-title">
            <h3>
              <FontAwesomeIcon icon={faBell} />  Notification
            </h3>
          </div>
          <div className="notification-nav">
            <div className={selectedItem === 'newOrder' ? 'notification-nav-item-click' : 'notification-nav-item'}
              onClick={() => chooseItem('newOrder')}>
              <p>New Order</p>
            </div>
            <p className="quantity-notification">{NewOrder}</p>
            <div className={selectedItem === 'outOfStock' ? 'notification-nav-item-click' : 'notification-nav-item'}
              onClick={() => chooseItem('outOfStock')}>Out of Stock
            </div>
            <p className="quantity-notification">x</p>
            <div className={selectedItem === 'overStock' ? 'notification-nav-item-click' : 'notification-nav-item'}
              onClick={() => chooseItem('overStock')}>OverStock
            </div>
            <p className="quantity-notification">x</p>
          </div>
          <div className="notification-content">
            {/* if selected notification neworder */}
            {selectedItem === 'newOrder' && (
              <div>
                {notifNewOrders.length > 0 && notifNewOrders.map(notifNewOrder => (
                  <Link to={'/adminpage/notification/' + notifNewOrder._id} key={notifNewOrder}
                    className="notification" onClick={hanldeDetailsNotif}>
                    <div className="notification-info">
                      <div>
                        <FontAwesomeIcon icon={faBell} />
                        <b>New Order!</b>
                      </div>
                      <div>
                        <div>You have a new order.Please see and process </div>
                        <div className="notification-time">{new Date(notifNewOrder.updatedAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {/*------------------------------------*/}

          </div>
        </div>
        {id &&
          <div className="details-notification-container">
            <div className="hideDetailsNotif">
              <FontAwesomeIcon icon={faX} onClick={hideDetailsNotif} />
            </div>
            <div className="dt-notification">
                <h1>Notification's Data</h1>
            </div>  
          </div>
        }
      </div>
    </>
  );
}
