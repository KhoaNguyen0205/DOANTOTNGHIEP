/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import axios from "axios";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfo, faInfoCircle, faMoneyCheckDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Cart() {
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [showButton, setShowButton] = useState(false);


    useEffect(() => {
        axios.get('/user-cart').then(response => {
            setCarts(response.data);
        })
    })

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    const price = products.price;
    const quantity = carts.quantity;

    const totalPrice = (parseInt(price), 10) * quantity

    function showBtn() {
        setShowButton(true);
    }
    function hideBtn() {
        setShowButton(false);
    }

    function handleProductBtn() {
        if (showButton) {
            hideBtn()
        } else {
            showBtn();
        }
    }

    return (
        <>
            <div className="cart-content-header">
                <div className="column">Product</div>
                <div className="column">Size</div>
                <div className="column">Quantity</div>
                <div className="column">Price</div>
                <div className="column">TotalPrice</div>
            </div>
            <div className="all-product-onCart ">
                {carts.length > 0 && carts.map(cart => (
                    <div key={cart} className="">
                        {products.length > 0 && products.filter(product => product._id === cart.productId)
                            .map(product => (
                                <div key={product} className="cart-content-product"
                                    onClick={handleProductBtn}>
                                    <div className="ccp-img-name">
                                        <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                        <p>{product.name}</p>
                                    </div>
                                    <div className="">
                                        {cart.size}
                                    </div>
                                    <div className="">
                                        {cart.quantity}
                                    </div>
                                    <div className="">
                                        {product.price}
                                    </div>
                                    <div className="totalprice">
                                        <p> {parseInt(product.price) * cart.quantity}$</p>
                                    </div>

                                    <div className="directional-icon">
                                        <Link>
                                            <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                                        </Link>
                                        <Link to={'/order/'+cart._id}>
                                            <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: 'green' }} />
                                        </Link>
                                        <Link>
                                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#0099ff' }} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <div>
                TotalPrice In Cart:xxx$
            </div>
        </>
    )
}