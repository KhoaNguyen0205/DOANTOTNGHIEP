/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import Navbar from "../navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";

export default function NikeProduct() {

    const [products,setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [productName, setProductName] = useState('');
    const {user} = useContext(UserContext);
    const [favorite,setFavorite] = useState([]);
    const [showFavorite,setShowFavorite] = useState(false);
    

    function showCart(){
        setShowFavorite(true);
    }
    function hideCart(){
        setShowFavorite(false);
    }
    function handleCart(){
        if(showFavorite){
            hideCart();
        }else{
            showCart();
        }
    }

   

     function reloadWindow() {
        window.location.reload();
    }

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get('/user-favorite').then(response => {
            setFavorite(response.data);
        });
    }, [favorite]);

    const numberOfFavorite = favorite.length;
    
    const addToFavorite = async (productId) => {
        try {
          const response = await axios.post('/add-to-favorite', {
            productId,
          });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('This product had on Favorite');
            } else {
                alert('fail');
            }
        }
      };
    
    
    return(
       <>
       <Navbar/>
       {/* <div className="nike-product">
            <div className="product-filter-favorite">
                <div className="product-favorite">
                    
                    <div className="favorite" onClick={handleCart} >
                                <svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="#F17038" viewBox="0 0 576 512">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 
                                    1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 
                                    31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 
                                    12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                </svg>
                        <text className={`text-bounce`}>{numberOfFavorite}</text>
                    </div>
                    
                </div>
                <div className="filter">
                    <button>Search</button>
                    <button onClick={reloadWindow}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="green">
                            <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 
                            0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 
                            229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 
                            0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="all-product">
                <div className="product-container">
                {products.length > 0 && products
                    .filter(product => product.brand === 'Nike')
                    .map(product => (
                      <div className="product" key={product}>
                          <div className="product-img">
                            <img src={'http://localhost:4000/'+product.imagePaths[0]} alt="" />
                        </div>

                          <div className="product-name">
                               <b>{product.name}</b>
                          </div>
                          <div className="product-price">
                            <h4>Price: {product.price}</h4>
                          </div>
                          <div className="button">
                            
                                <button className="add-button" onClick={() => addToFavorite(product._id)}>
                                            
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#F17038" viewBox="0 0 576 512">
                                               <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 
                                               1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 
                                               31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 
                                               12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                            </svg>
                                </button>
                                <Link to={'/product/'+product._id} className="details-button">
                                              Details
                                              <svg xmlns="http://www.w3.org/2000/svg" height="3.5vh" viewBox="0 0 512 512" fill="#8DF9F3">
                                                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 
                                                  0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 
                                                  0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 
                                                  32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 
                                                  0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                                              </svg>
                                </Link>    
                          </div>
                          
                      </div>
                ))}
                </div>
            </div>
       </div>
       {showFavorite &&(
        <div className="details-cart">
            <b>YOUR CARD</b>
            <div className="details-cart-list">
                <div className="details-cart-product">
                    <img src="/Images/Jd4.jpg" className="details-cart-product-img"/>
                    <div className="name-and-timestamps">
                         <h3>NIKE AF1</h3>
                        <div>20/10/2023</div>
                    </div>
                    <button className="">Details</button>
                    <button>Delete</button>
                </div>
            </div>

            

        </div>
       )} */}
    
       </>
    )
}