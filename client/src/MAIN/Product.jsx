/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { faDesktopAlt, faHeart, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

export default function Product() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    return (
        <>
        <Navbar/>
            <div className="container">
                <div className="product-container">
                    <div className="list-product">
                        {products.length > 0 && products
                            .map(product => (
                                <Link to={'/product/'+product._id} target="_blank"  className="product" key={product}>
                                    <div className="product-image">
                                         <img src={'http://localhost:4000/'+product.imagePaths[0]} alt="" />
                                    </div>
                                    <div className="">
                                        <div className="product-name">
                                            {product.name}
                                        </div>
                                        {product.price}
                                        
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>

        </>
    )
}