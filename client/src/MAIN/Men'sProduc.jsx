/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleUp, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function MensProduct() {

    const [products, setProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);
    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    const handleBrandChange = (brand) => {
        const isChecked = selectedBrands.includes(brand);
        setSelectedBrands(isChecked ? selectedBrands.filter((b) => b !== brand) : [...selectedBrands, brand]);
    };

    const handleCategoryChange = (category) => {
        const isChecked = selectedCategory.includes(category);
        setSelectedCategory(isChecked ? selectedCategory.filter((c) => c !== category) : [...selectedCategory, category]);
    };

    const handlePriceChange = (price) => {
        const isChecked = selectedPrice.includes(price);
        setSelectedPrice(isChecked ? selectedPrice.filter((c) => c !== price) : [...selectedPrice, price]);
    }


    return (
        <>

            <div className="container">
                <div className="filter">
                    <div className="filter-title">
                        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                        <h5>Filter on Store</h5>
                    </div>
                    <div className="filterByBrand">
                        <div>
                            <input type="checkbox" onChange={() => handleBrandChange('Nike')} className="checkbox-filter" />
                            <span>NIKE</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handleBrandChange('Adidas')} className="checkbox-filter" />
                            <span>ADIDAS</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handleBrandChange('Jordan')} className="checkbox-filter" />
                            <span>JORDAN</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handleBrandChange('Puma')} className="checkbox-filter" />
                            <span>PUMA</span>
                        </div>
                    </div>

                    <div className="filterByCategory">
                        <div>
                            <input type="checkbox" onChange={() => handleCategoryChange('Sneaker')} className="checkbox-filter" />
                            <span>Sneaker</span>
                        </div>
                        <div>
                            <input type="checkbox" className="checkbox-filter" />
                            <span>Clothe</span>
                        </div>
                        <div>
                            <input type="checkbox" onChange={() => handleCategoryChange('Accessories')} className="checkbox-filter" />
                            <span>Accessories</span>
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
                                product.gender === 'male' &&
                                (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
                                (selectedCategory.length === 0 || selectedCategory.includes(product.category)) &&
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
                                        {product.quantity}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>

        </>
    )
}