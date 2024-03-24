/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { faArrowAltCircleUp, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SneakerProduct() {

    const [products, setProducts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [selectedGender,setSelectedGender] = useState([]);
    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [products])

    const handlePriceChange = (price) => {
        const isChecked = selectedPrice.includes(price);
        setSelectedPrice(isChecked ? selectedPrice.filter((c) => c !== price) : [...selectedPrice, price]);
    }
    const handleGenderChange = (gender) => {
        const isChecked = selectedGender.includes(gender);
        setSelectedGender(isChecked ? selectedGender.filter((c) => c !== gender) : [...selectedGender, gender]);
    }
    

    return (
        <>
            <div className="container">
                <div className="filter">
                    <div className="filter-title">
                        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                        <h5>Filter on Store</h5>
                    </div>
                    <div className="filterByGender">
                        <div>
                            <input type="checkbox" onChange={() => handleGenderChange('male')} className="checkbox-filter"/>
                            <span><FontAwesomeIcon /> Men's</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handleGenderChange('female')} className="checkbox-filter"/>
                            <span>Women's</span>
                        </div>
                    </div>
                    <div className="filterByPrice">
                        <div>
                            <input type="checkbox" onChange={() => handlePriceChange('0-100')} className="checkbox-filter" />
                            <span>0-100$</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handlePriceChange('101-150')} className="checkbox-filter" />
                            <span>101-150$</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handlePriceChange('150')} className="checkbox-filter" />
                            <span>
                                <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                150$
                            </span>
                        </div>
                    </div>

                </div>
                <div className="product-container">
                    <div className="list-product">
                    {products.length > 0 && products
                            .filter((product) =>
                                product.category === 'Sneaker' &&
                                (selectedGender.length === 0 || selectedGender.includes(product.gender)) &&
                                (selectedPrice.length === 0 || selectedPrice.includes(product.price) ||
                                    (selectedPrice.includes('0-100') && parseFloat(product.price) >= 0 && parseFloat(product.price) <= 100) ||
                                    (selectedPrice.includes('101-150') && parseFloat(product.price) > 100 && parseFloat(product.price) <= 150) ||
                                    (selectedPrice.includes('150') && parseFloat(product.price) > 150)
                                )
                            )
                            .map((product) => (
                                <Link to={'/product/' + product._id} target="_blank" className="product" key={product}>
                                    <div className="product-image">
                                        <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                    </div>
                                    <div className="">
                                        <div className="product-name">
                                            {product.name}
                                        </div>
                                        {product.price} <br />
                                        {product.quantity} <br />
                                        {product.gender}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}