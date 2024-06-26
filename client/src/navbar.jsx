/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "./userContext";
import { faAdd, faBoxOpen, faCaretDown, faCartPlus, faCartShopping, faDiamond, faFaceSmile, faHeart, faHeartBroken, faHeartCircleBolt, faHeartCrack, faHome, faHomeLgAlt, faHomeUser, faMessage, faPaperPlane, faPhone, faSearch, faStar, faTruck, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "./MAIN/Cart";
import axios from "axios";
import ChatList from "./MAIN/Chat";
import Favorite from "./MAIN/favorite";


export default function Navbar() {
    const { user } = useContext(UserContext);
    const [yourCart, setYourCart] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [mess, setMess] = useState(false);
    const [content, setContent] = useState('')
    const [image, setImage] = useState('');
    const [sendMess, setSendMess] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [searching, setSearching] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('');
    


    useEffect(() => {
        axios.get('/api/product').then(response => {
            setAllProduct(response.data)
        })
    })

    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.keyCode === 27) { // 27 is the keycode for the 'Esc' key
                outSearch();
            }
        };

        document.addEventListener("keydown", handleEscKeyPress);

        return () => {
            document.removeEventListener("keydown", handleEscKeyPress);
        };
    }, []);

    function onSearch() {
        if (!searching) {
            setSearching(true);
        }
    }

    function outSearch() {
        setSearching(false);
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const location = useLocation();
    const getItemClassName = (path) => { 
        return location.pathname === path ? "active-item" : "";
    };

    function showCart() {
        setYourCart(true);
    }
    function hideCart() {
        setYourCart(false);
    } 
    function handleCart() {
        if (yourCart) {
            hideCart();
        } else {
            showCart();
        }
    }

    function showMess() {
        setMess(true);
    }
    function hideMess() {
        setMess(false);
    }

    async function sendMessages(ev) {
        ev.preventDefault(ev);
        try {
            await axios.post('/api/chats', {
                content
            });
            setContent('')
        } catch (error) {
            console.error(error);
            alert('fail');
        }
    }
    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            sendMess(ev);
        }
    }

    function showFavorite() {
        setFavorites(true);
    }
    function hideFavorites() {
        setFavorites(false);
    }

    return (
        <>
            <div className="nav-container">
                <nav className="navbar">
                    <div className="nav-above">
                        <Link to={'/'} className="brand-name">
                            <img src="./Images/K-sneaker.png" alt="" />
                            K-Sneaker
                        </Link>
                        <div className="search-bar" onClick={onSearch}>
                            <input type="text" name="" id="" placeholder="Search anything...."
                                value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '5%' }} />

                        </div>
                        <div className="user-login">
                            <h4>
                                <FontAwesomeIcon icon={faUser} />
                                WelCome,</h4>
                            <div>
                                {user ? (
                                    <Link to={'/personal'}>
                                        <div className={getItemClassName('/personal')}> {user.name}</div>
                                    </Link>
                                ) : (
                                    <Link to={'/login'}>
                                        Sign In
                                    </Link>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="nav-below">
                        <div className="nav-menu">
                            <ul>
                                <Link to={'/'}>
                                    <li className={getItemClassName("/")}>
                                        HOME
                                    </li>
                                </Link>

                                <Link to={'/pd/men/'}>
                                    <li className={getItemClassName('/pd/men/')}>
                                        MEN
                                    </li>
                                </Link>
                                <Link to={'/pd/women/'}>
                                    <li className={getItemClassName('/pd/women/')}>
                                        WOMEN
                                    </li>
                                </Link>
                                <Link to={'/pd/accessories'}>
                                    <li className={getItemClassName('/pd/accessories')}>
                                        Accessories
                                    </li>
                                </Link>
                                <Link to={'/pd/sneaker'}>
                                    <li className={getItemClassName('/pd/sneaker')}>
                                        Sneakers
                                    </li>
                                </Link>
                                <Link><li>Clothes</li></Link>
                                <Link to={'/pd/sale'}>
                                    <li className={getItemClassName('/pd/sale')}>
                                        Sale 40%
                                    </li>
                                </Link>

                            </ul>
                        </div>
                        {user ? (
                            <div className="user-careAbout">
                                <FontAwesomeIcon icon={faMessage} className="careAbout-icon" onClick={showMess} />
                                <FontAwesomeIcon icon={faHeart} className="careAbout-icon" onClick={showFavorite} />
                                <FontAwesomeIcon icon={faCartPlus}
                                    className="careAbout-icon"
                                    onClick={handleCart} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    {yourCart &&
                        <div className="overlay">
                            <div className="cart-container">
                                <div className="cart-title">
                                    <div className="cart-title">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="red" viewBox="0 0 576 512">
                                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 
                                                    45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 
                                                    11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 
                                                    0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 
                                                    24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                        </svg>
                                        YOUR CART
                                    </div>
                                    <svg onClick={hideCart} xmlns="http://www.w3.org/2000/svg" cursor="pointer" height="1em" viewBox="0 0 448 512" fill="red">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 
                                                0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </div>
                                <div className="cart-content">
                                    <Cart />
                                </div>
                            </div>
                        </div>
                    }
                    {favorites &&
                        <div className="overlay">
                            <div className="cart-container">
                                <div className="cart-title">
                                    <div className="cart-title">
                                       <FontAwesomeIcon icon={faHeart} />
                                        YOUR FAVORITE
                                    </div>
                                    <svg onClick={hideFavorites } xmlns="http://www.w3.org/2000/svg" cursor="pointer" height="1em" viewBox="0 0 448 512" fill="red">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 
                                                0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </div>
                                <div className="cart-content">
                                    <Favorite />
                                </div>
                            </div>
                        </div>
                    }
                    {mess &&
                        (
                            <div className="mess-container">
                                <div className="mess-title">
                                    <h3>Chat With Admin</h3>
                                    <FontAwesomeIcon icon={faX} onClick={hideMess} style={{ color: 'red', cursor: 'pointer' }} />
                                </div>
                                <ChatList/>
                            </div>
                        )}
                    {searching && (
                        <div className="onSearch-box">
                            {allProduct.length > 0 && allProduct
                                .filter(product =>
                                    (searchKeyword === '' || product.name.toLowerCase().includes(searchKeyword.toLowerCase()))
                                )
                                .map(product => (
                                    <Link to={'/product/'+product._id} key={product} className="product-on-search">
                                        <div className="product-on-search-img">
                                            <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                        </div>
                                        <div>
                                            {product.name}
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    )}
                </nav>
            </div>

        </>
    )
}