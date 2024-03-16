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
                                                        <div className="pucharseOrder-container">
                                                            <div className="bill-and-animation">
                                                                <div className="pucharseOrder-bill">
                                                                    <div className="img-pucharseOrder-bill">
                                                                        <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                                    </div>
                                                                    <div className="info-pucharseOrder-bill">
                                                                        <b style={{ fontSize: '20px' }}>{product.name} - {product.price}</b>
                                                                        <div className="product-info-pucharseOrder-bill">
                                                                            x{pucharseOrder.quantity} - {pucharseOrder.size} - {pucharseOrder.totalPrice}$
                                                                        </div>
                                                                        <div className="customer-info-pucharseOrder-bill">
                                                                            <b>{pucharseOrder.address}</b>
                                                                            <b>{pucharseOrder.nameOfCus}-{pucharseOrder.PhNb}</b>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="animation-pucharseOrder">
                                                                    <img src="https://blog.staktradefinance.com/wp-content/uploads/2019/10/reality.gif" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="notification-pucharseOrder">
                                                                <b>Order is awaiting confirmation</b>
                                                                <button>
                                                                    <FontAwesomeIcon style={{color:'#ff6363'}} icon={faCancel} /> Cancel
                                                                </button>
                                                            </div>
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
                                                    <div className="pucharseOrder-container">
                                                        <div className="bill-and-animation">
                                                            <div className="pucharseOrder-bill">
                                                                <div className="img-pucharseOrder-bill">
                                                                    <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                                </div>
                                                                <div className="info-pucharseOrder-bill">
                                                                    <b style={{ fontSize: '20px' }}>{product.name} - {product.price}</b>
                                                                    <div className="product-info-pucharseOrder-bill">
                                                                        x{pucharseOrder.quantity} - {pucharseOrder.size} - {pucharseOrder.totalPrice}$
                                                                    </div>
                                                                    <div className="customer-info-pucharseOrder-bill">
                                                                        <b>{pucharseOrder.address}</b>
                                                                        <b>{pucharseOrder.nameOfCus}-{pucharseOrder.PhNb}</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="animation-pucharseOrder">
                                                               <img src="https://cdn.dribbble.com/userupload/3249160/file/original-54e6c1d18d61f8f8aa2ed95caaf197ae.gif" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="notification-pucharseOrder">
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