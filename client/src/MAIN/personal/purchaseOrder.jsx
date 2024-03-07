/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PersonalPage from "./Personal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faDeleteLeft, faEdit, faSpinner, faTruckLoading, faTruckRampBox } from "@fortawesome/free-solid-svg-icons";


export default function PucharseOrder() {

    const [pucharseOrders, setPucharseOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState('Processing');
    const [products, setProducts] = useState([]);
    const [choice, setChoice] = useState(false);

    const chooseItem = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        axios.get('/user-order').then(response => {
            setPucharseOrders(response.data)
        })
    })

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data)
        })
    })

    function onChoice() {
        setChoice(true);
    }
    function hideChoice() {
        setChoice(false)
    }

    return (
        <>
            <PersonalPage />
            <div className="pucharseorder-container">
                <div className="pucharseOrder-navbar">
                    <div className={selectedItem === 'Processing' ? 'pO-nav-item-click' : 'pO-nav-item'}
                        onClick={() => chooseItem('Processing')} >
                        <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '10px', height: '20px', width: '20px', color: 'black' }} />Processing
                    </div>
                    <div className={selectedItem === 'Delivering' ? 'pO-nav-item-click' : 'pO-nav-item'}
                        onClick={() => chooseItem('Delivering')} >
                        <FontAwesomeIcon icon={faTruckRampBox} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#ffd24d' }} /> Delivering
                    </div>
                    <div className={selectedItem === 'Success' ? 'pO-nav-item-click' : 'pO-nav-item'}
                        onClick={() => chooseItem('Success')} >
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#39e600' }} />Success
                    </div>
                    <div className={selectedItem === 'Canceled' ? 'pO-nav-item-click' : 'pO-nav-item'}
                        onClick={() => chooseItem('Canceled')} >
                        <FontAwesomeIcon icon={faCancel} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#ff1a1a' }} /> Canceled
                    </div>
                </div>
                <div className="pucharseOrder-body">
                    <div>
                        {selectedItem === "Processing" &&
                            <div>
                                {pucharseOrders.length > 0 && pucharseOrders.filter(pucharseOrder => pucharseOrder.approve === false && pucharseOrder.confirmed === true)
                                    .map(pucharseOrder => (
                                        <div key={pucharseOrder} >
                                            {products.length > 0 && products.filter(product => product._id === pucharseOrder.productId)
                                                .map(product => (
                                                    <div key={product}>
                                                        <div>
                                                            {!choice ? (
                                                                <>
                                                                    <div className="order-processing" onDoubleClick={onChoice} title="Double click to select options">
                                                                        <div className="img-order-processing">
                                                                            <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                                        </div>
                                                                        <div className="info-order-processing">
                                                                            <b style={{ fontSize: '20px' }}>{product.name} - {product.price}</b>
                                                                            <div className="product-info-order-processing">
                                                                                x{pucharseOrder.quantity} - {pucharseOrder.size} - {pucharseOrder.totalPrice}$
                                                                            </div>
                                                                            <div className="customer-info-order-processing">
                                                                                <b>{pucharseOrder.address}</b>
                                                                                <b>{pucharseOrder.nameOfCus}-{pucharseOrder.PhNb}</b>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="order-processing" onDoubleClick={hideChoice} title="Double click to info order pucharse">
                                                                        <div className="btn-select-options">
                                                                            <button style={{ backgroundColor: '#ff6666' }}>
                                                                                <FontAwesomeIcon icon={faCancel} /> Delete
                                                                            </button>

                                                                            <button style={{ backgroundColor: '#bfff80' }}>
                                                                                <FontAwesomeIcon icon={faEdit} /> Edit
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        }
                        {selectedItem === 'Delivering' &&
                            <div>
                                {pucharseOrders.length > 0 && pucharseOrders.filter(pucharseOrder => pucharseOrder.approve === true)
                                    .map(pucharseOrder => (
                                        <div key={pucharseOrder} >
                                            {products.length > 0 && products.filter(product => product._id === pucharseOrder.productId)
                                                .map(product => (
                                                    <div key={product}>
                                                        <div className="delivering-container">
                                                            <div className="order-delivering">
                                                                <div className="img-order-processing">
                                                                    <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                                </div>
                                                                <div className="info-order-processing">
                                                                    <b style={{ fontSize: '20px' }}>{product.name} - {product.price}</b>
                                                                    <div className="product-info-order-processing">
                                                                        x{pucharseOrder.quantity} - {pucharseOrder.size} - {pucharseOrder.totalPrice}$
                                                                    </div>
                                                                    <div className="customer-info-order-processing">
                                                                        <b>{pucharseOrder.address}</b>
                                                                        <b>{pucharseOrder.nameOfCus}-{pucharseOrder.PhNb}</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="handle-order-delivering">
                                                                {pucharseOrder.adminCheck == false ? (
                                                                     <div>
                                                                     <b>
                                                                         Your order is on its way to you
                                                                     </b>
                                                                 </div>
                                                                ) : (
                                                                    <div>
                                                                       <b>The product has been delivered to you. Please confirm on the button below</b>
                                                                       <br />
                                                                       <button>
                                                                            Received
                                                                       </button>
                                                                    </div>
                                                                )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}