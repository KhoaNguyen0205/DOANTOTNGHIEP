/* eslint-disable no-unused-vars */
import { faInfoCircle, faMoneyCheckDollar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios  from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Favorite() {

    const [favoriteList, setFavoriteList] = useState([])
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get('/user-favorite').then(response => {
            setFavoriteList(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get('api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    return(
        <>
            <div className="cart-content-header">
                <div className="column">Product</div>
                <div className="column">Price</div>
            </div>
            <div className="all-product-onCart ">
                {favoriteList.length > 0 && favoriteList.map(cart => (
                    <div key={cart} className="">
                        {products.length > 0 && products.filter(product => product._id === cart.productId)
                            .map(product => (
                                <div key={product} className="cart-content-product"
                                    >
                                    <div className="ccp-img-name">
                                        <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                        <p>{product.name}</p>
                                    </div>
                                   
                                    
                                    {product.iventory ? (
                                        <div className="">
                                            <b style={{ textDecoration: 'line-through', marginRight: '5px' }}>{product.price}</b> <br />
                                            <b>{parseInt(product.price) * 0.6}$</b>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <b>{product.price}</b>
                                        </div>
                                    )}

                                    <div className="directional-icon">
                                        <Link>
                                            <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                                        </Link>
                                        <Link to={'/order/' + cart._id} target="_blank">
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
        </>
    )
}