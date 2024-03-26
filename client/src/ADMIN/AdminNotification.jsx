/* eslint-disable react-hooks/exhaustive-deps */
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
  const [notifOverStocks, setNotifOverStocks] = useState([]);

  const [detailsNotif, setDetailsNotif] = useState(false);
  const [selectedItem, setSelectedItem] = useState('newOrder');
  const [detailsOrders, setDetailsOrders] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState('');

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
    axios.get('/api/notification/overStock').then(response => {
      setNotifOverStocks(response.data);
    })
  }, [])

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/product/${id}`)
      .then(response => {
        setProductById(response.data);
      })
  }, [id])


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
  
  const adminCheckInventory = (id) => {
    axios.put(`/api/inventory/product/${id}`,{iventory: true})
    .then(response => {
      console.log(response.data);
      alert('The product has been moved to Inventory')
    })
    .catch(error => {
      console.log('wrong')
    })
  }

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
            <p className="quantity-notification">{notifNewOrders.length}</p>
            <div className={selectedItem === 'outOfStock' ? 'notification-nav-item-click' : 'notification-nav-item'}
              onClick={() => chooseItem('outOfStock')}>Out of Stock
            </div>
            <p className="quantity-notification">{notifStockOuts.length}</p>
            <div className={selectedItem === 'overStock' ? 'notification-nav-item-click' : 'notification-nav-item'}
              onClick={() => chooseItem('overStock')}>OverStock
            </div>
            <p className="quantity-notification">{notifOverStocks.length}</p>
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
            {/*------------end notification neworder-----------------*/}

            {/* if selected notification out of stock */}
            {selectedItem === 'outOfStock' && (
              <div>
                {notifStockOuts.length > 0 && notifStockOuts.map(notifStockOut => (
                  <Link to={'/adminpage/notification/'} className="notification" key={notifStockOut}>
                    <div className="notification-info">
                      <div>
                        <FontAwesomeIcon icon={faBell} />
                        <b>Out Of Stock!!</b>
                      </div>
                      <div>
                        <div>The number of products in stock is almost out</div>
                        <div className="notification-time">{new Date(notifStockOut.updatedAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* -----------End notification out of stock-------- */}

            {/* if selected notification over stock */}
            {selectedItem === 'overStock' && (
              <div>
                {notifOverStocks.length > 0 && notifOverStocks.map(notifOverStock => (
                  <Link to={'/adminpage/notification/' + notifOverStock._id} className="notification" key={notifOverStock}>
                    <div className="notification-info">
                      <div>
                        <FontAwesomeIcon icon={faBell} />
                        <b>Over Stock!!</b>
                      </div>
                      <div>
                        <div>Product is in stock</div>
                        <div className="notification-time">{new Date(notifOverStock.updatedAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                ))}

              </div>
            )}

            {/* -----------End notification over stock-------- */}

          </div>
        </div>
        {id &&
          <div className="details-notification-container">
            <div className="hideDetailsNotif">
              <FontAwesomeIcon icon={faX} onClick={hideDetailsNotif} />
            </div>
            {selectedItem === "overStock" && (
              <div className="dt-notification">
                <div className="notif-product-img">
                <img src={'http://localhost:4000/' + productById.imagePaths[0]} alt="" />
                </div>
                <div className="notif-product-info">
                  <div>Brand:{productById.brand}</div>
                  <div>Name:{productById.name}</div>
                  <div>Quantity:{productById.quantity}</div>
                  <div>Price:{productById.price}</div>
                </div>
                <div>
                  <button onClick={() => adminCheckInventory(productById._id)}>Inventory</button>
                </div>
              </div>
            )}

            {selectedItem === "newOrder" && (
              <div className="dt-notification">
                neworder
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
}
