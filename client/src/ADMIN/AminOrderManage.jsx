/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Admin from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AdminOrderManage() {
    const [selectedItem, setSelectedItem] = useState('Processing');
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const chooseItem = (item) => {
        setSelectedItem(item);
    };
    const [AllOrders, setAllOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/order').then(response => {
            setAllOrders(response.data);
        })
    }, [AllOrders])

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get('/api/user').then(response => {
            setCustomers(response.data)
        })
    })

    const approveOrder = (id) => {
        axios.put(`/order/${id}`, { approve: true })
            .then(response => {
                console.log(response.data);
                alert('Approve Order Successfully')
            })
            .catch(error => {
                console.log(error);
                alert('Wrong')
            })
    }

    const adminCheckOrder = (id) => {
        axios.put(`/order/${id}`, { adminCheck: true })
            .then(response => {
                console.log(response.data);
                alert('The order has been confirmed by Admin to be delivered successfully')
            })
            .catch(error => {
                console.log(error);
                alert('Wrong')
            })
    }

    return (
        <>
            <Admin />
            <div className="admin-content-container">
                <div className="order-manage-nav">
                    <div className={selectedItem === 'Processing' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Processing')}>
                        <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '10px', height: '20px', width: '20px', color: 'black' }} /> Processing
                    </div>
                    <div className={selectedItem === 'Delivering' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Delivering')}>
                        <FontAwesomeIcon icon={faTruckRampBox} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#ffd24d' }} /> Delivering
                    </div>
                    <div className={selectedItem === 'Success' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Success')}>
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#39e600' }} />Success
                    </div>
                </div>
                <div className="order-manage-body">
                    {selectedItem === 'Processing' &&
                        <div>
                            {
                                AllOrders.length > 0 && AllOrders.filter(allOrder => allOrder.approve === false && allOrder.confirmed === true)
                                    .map(allOrder => (
                                        <div key={allOrder}>
                                            <div className="order-manage-info">

                                                {products.length > 0 && products.filter(product => product._id == allOrder.productId)
                                                    .map(product => (
                                                        <div key={product} className="order-manage-info-product">
                                                            <div className="order-manage-info-product-img">
                                                                <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                            </div>
                                                            <div className="order-manage-info-product-description">
                                                                <b>{product.name}</b>
                                                                {product.iventory 
                                                                ? ( <b>{parseInt(product.price)*0.6}$ (-40%)</b>)
                                                                : ( <b>{product.price}</b>)}
                                                                <b>x{allOrder.quantity} - {allOrder.size}</b>
                                                                <b>{allOrder.totalPrice}$</b>
                                                                <b>{allOrder.paymentMethod}</b>
                                                            </div>
                                                        </div>
                                                    ))}
                                                {customers.length > 0 && customers.filter(customer => customer._id == allOrder.user)
                                                    .map(customer => (
                                                        <div key={customer} className="order-manage-info-customer">
                                                            <b>Account: {customer.name}</b>
                                                            <b>Bill: {new Date(allOrder.createdAt).toLocaleDateString()}</b>
                                                            <b>{allOrder.address}</b>
                                                            <b>{allOrder.PhNb}</b>
                                                            <b>Receiver: {allOrder.nameOfCus}</b>
                                                        </div>
                                                    ))}
                                                <div className="approve-order-processing">
                                                    <button onClick={() => approveOrder(allOrder._id)}
                                                        title="Approve">
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    }

                    {selectedItem === 'Delivering' &&
                        <div>
                            {
                                AllOrders.length > 0 && AllOrders.filter(allOrder => allOrder.approve === true && allOrder.adminCheck === false)
                                    .map(allOrder => (
                                        <div key={allOrder}>
                                            <div className="order-manage-info">

                                                {products.length > 0 && products.filter(product => product._id == allOrder.productId)
                                                    .map(product => (
                                                        <div key={product} className="order-manage-info-product">
                                                            <div className="order-manage-info-product-img">
                                                                <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                            </div>
                                                            <div className="order-manage-info-product-description">
                                                                <b>{product.name}</b>
                                                                <b>{product.price}</b>
                                                                <b>x{allOrder.quantity} - {allOrder.size}</b>
                                                                <b>{allOrder.totalPrice}$</b>
                                                                <b>{allOrder.paymentMethod}</b>
                                                            </div>
                                                        </div>
                                                    ))}
                                                {customers.length > 0 && customers.filter(customer => customer._id == allOrder.user)
                                                    .map(customer => (
                                                        <div key={customer} className="order-manage-info-customer">
                                                            <b>Account: {customer.name}</b>
                                                            <b>Bill: {new Date(allOrder.createdAt).toLocaleDateString()}</b>
                                                            <b>{allOrder.address}</b>
                                                            <b>{allOrder.PhNb}</b>
                                                            <b>Receiver: {allOrder.nameOfCus}</b>
                                                        </div>
                                                    ))}
                                                <div className="approve-order-processing">
                                                    <button onClick={() => adminCheckOrder(allOrder._id)} >
                                                        Delivered <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    }

                </div>
            </div>
        </>
    )
}