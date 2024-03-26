/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cart from "./Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faComment, faCommentMedical, faCommentSlash, faCommentSms, faComments, faStairs, faStar, faX } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../userContext";

export default function DetailsProduct() {

    const [products, setProducts] = useState('');
    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState(0);
    const [error, setError] = useState(null);
    const [toComment, setToComment] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(36);
    const [yourCart, setYourCart] = useState(false);
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(true);
    const [toOrder, setToOrder] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [nameOfCus, setNameOfCus] = useState('');
    const [PhNb, setPhNb] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedVoucher, setSelectedVoucher] = useState(false);
    const [selectedVoucherInfo, setSelectedVoucherInfo] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const { user } = useContext(UserContext)
    const handleRatingChange = (value) => {
        setRating(value);
    };

    const selectImage = (index) => {
        setCurrentImage(index);
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/product/${id}`).then(response => {
            setProducts(response.data);
        })
    }, [id])

    useEffect(() => {
        axios.get('/api/voucher').then(response => {
            setVouchers(response.data);
        })
    })

    // const quantiyOfCart = cart.length;
    const finalPrice = parseInt(products.price) * quantity

    function showOrder() {
        setToOrder(true);
    }
    function hideOrder() {
        setToOrder(false);
    }

    function GotoComment() {
        setToComment(true);
    }
    function HideComment() {
        setToComment(false);
    }
    function handleComment() {
        if (toComment) {
            HideComment();
        } else {
            GotoComment();
        }
    }

    function showListVoucher() {
        setSelectedVoucher(true);
    }
    function hideListVoucher() {
        setSelectedVoucher(false);
    }

    function selectVoucher(voucher) {
        setSelectedVoucherInfo(voucher);
        hideListVoucher();
    }

    async function handleAddToCart(ev) {
        ev.preventDefault();
        try {
            await axios.post(`/api/add/${id}/to-cart`, {
                size,
                quantity,
            });
            alert('Success')
            window.location.reload;
        } catch (e) {
            alert('wrong')
            window.location.reload();
        }
    }

    async function handleOrder(ev) {
        ev.preventDefault();
        try {
            const calculatedTotalPrice = products.iventory
                ? selectedVoucherInfo
                    ? (finalPrice * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100) * 0.6
                    : finalPrice * 0.6
                : selectedVoucherInfo
                    ? finalPrice * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100
                    : finalPrice

            await axios.post('/api/order', {
                productId: products.id,
                quantity: quantity,
                addVoucher: selectedVoucherInfo ? selectedVoucherInfo.valueVoucher : 'none',
                totalPrice: calculatedTotalPrice,
                address,
                PhNb,
                nameOfCus,
                paymentMethod,
            })
            alert('Success');
            // window.location.reload();
        } catch (error) {
            alert('wrong')

        }
    }

    return (
        <>
            <div className="dp-container">
                <Navbar />
                <div className="dp-product">
                    {products.imagePaths?.[0] && (
                        <div className="dp-product-img">
                            <div className="dp-product-img-orther">
                                {products.imagePaths?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:4000/${image}`}
                                        alt=""
                                        onClick={() => selectImage(index)}
                                    />
                                ))}
                            </div>
                            <div className="dp-product-img-main">
                                {products.imagePaths?.[currentImage] && (
                                    <img src={`http://localhost:4000/${products.imagePaths[currentImage]}`} alt="" />
                                )}
                            </div>
                        </div>
                    )}

                    <div className="dp-product-description">
                        <div className="dp-product-description-name">
                            <h2>{products.name}</h2>
                        </div>
                        <div className="dp-product-description-">

                        </div>
                        {products.iventory === true ? (
                            <div className="dp-product-description-price">
                                Price: <h3 style={{ textDecoration: 'line-through', marginRight: '5px' }}>{products.price}</h3> - <h3>{parseInt(products.price) * 0.6}$</h3>
                            </div>
                        ) : (
                            <div className="dp-product-description-price">Price: <h3>{products.price}</h3></div>
                        )}
                        <div className="dp-product-description-">
                            Rating:
                        </div>
                        <div>
                            The remaining amount: {products.quantity}
                        </div>
                        <div className="dp-product-description-size">
                            <h3>Chose Size</h3>
                            <div className="chose-size" >
                                <div>
                                    <input name="size" type="radio" value='36' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="36">36</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='37' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="37">37</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='38' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="38">38</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='39' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="39">39</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='40' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="40">40</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='41' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="41">41</label>
                                </div>
                                <div>
                                    <input name="size" type="radio" value='42' onChange={ev => setSize(ev.target.value)} />
                                    <label htmlFor="42">42</label>
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="dp-product-description-quantity">
                            Quantity:
                            <input type="number" min={1} max={5} value={quantity} onChange={ev => setQuantity(ev.target.value)} />
                        </div>

                        {user ?
                            (
                                <div className="dp-product-description-button">
                                    <button onClick={handleAddToCart} className="add-to-cart">
                                        <h4>Add to cart</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512" fill="red">
                                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 
                                0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 
                                28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 
                                24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7
                                 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 
                                 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 
                                 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20
                                  9-20 20v44H272c-11 0-20 9-20 20z"/>
                                        </svg>
                                    </button>
                                    <button onClick={showOrder} className="order-now">
                                        <h4>Order now</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" fill="green">
                                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 
                                12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 
                                393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                        </svg>
                                    </button>
                                    {
                                        toOrder &&
                                        <div className="overlay">
                                            <div className="dtPro-order">
                                                <div onClick={hideOrder} className="dtPro-hide-order">
                                                    <FontAwesomeIcon icon={faX} />
                                                </div>
                                                <div className="dtPro-main">
                                                    <div className="dtPro-main-os">
                                                        <b className="os-title">Order summary</b>
                                                        <div className="os-img">
                                                            <img src={'http://localhost:4000/' + products.imagePaths[0]} alt="" />
                                                        </div>
                                                        <div className="os-pro-info">
                                                            <div className="os-pro-name-and-price">
                                                                <div>{products.name}</div>
                                                                <div>{products.price}</div>
                                                            </div>
                                                            <div className="os-pro-gender-and-quantity">
                                                                <div>{size}</div>
                                                                <div>Qty: {quantity}</div>
                                                            </div>
                                                            <div className="os-select-voucher" onClick={showListVoucher} >
                                                                {selectedVoucherInfo ? (
                                                                    <div>
                                                                        {selectedVoucherInfo.title} - {selectedVoucherInfo.valueVoucher}%
                                                                    </div>
                                                                ) : (
                                                                    <div>Select voucher to receive discount</div>
                                                                )}
                                                            </div>
                                                            {selectedVoucher && (
                                                                <div className="overlay">
                                                                    <div className="os-list-vouchers">
                                                                        <div className="icon-hide-list-voucher"
                                                                            onClick={hideListVoucher}>
                                                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faX} />
                                                                        </div>
                                                                        {vouchers.length > 0 && vouchers.map(voucher => (
                                                                            <div className="os-voucher" key={voucher} onClick={() => selectVoucher(voucher)}>
                                                                                <div className="voucher-details">
                                                                                    <div className="voucher-percent">
                                                                                        <div className="voucher-value">{voucher.valueVoucher}%</div>
                                                                                    </div>
                                                                                    <div className="voucher-des">
                                                                                        <div className="voucher-title">{voucher.title}</div>
                                                                                        <div className="">{voucher.description}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="os-pro-price">
                                                                <b>
                                                                    <b>Total Price:</b>
                                                                    {products.iventory ? (
                                                                        <div>
                                                                            {selectedVoucherInfo ? (
                                                                                <div>
                                                                                    {(finalPrice * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100) *0.6} $ (-40%)
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    {finalPrice * 0.6}$ (-40%)
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            {selectedVoucherInfo ? (
                                                                                <div>
                                                                                    {finalPrice * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100} $
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    {finalPrice}$
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dtPro-main-pd">
                                                        <b className="pd-title">Payment Details</b>
                                                        <form className="pd-content" >
                                                            <div className="pd-address">
                                                                <b>Shipping Address:</b>
                                                                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Your Address" required />
                                                            </div>
                                                            <div className="pd-contact-us">
                                                                <b>Contact Us:</b>
                                                                <input required type="text" value={nameOfCus} onChange={ev => setNameOfCus(ev.target.value)} placeholder="Your Name" />
                                                                <input required type="text" value={PhNb} onChange={ev => setPhNb(ev.target.value)} placeholder="Your PhNB" />
                                                            </div>

                                                            <div className="pd-payment-menthod">
                                                                <b>Payments Menthod:</b>
                                                                <div className="method-POD">
                                                                    <input type="radio" name="PaymentsMethod" value='POD' onChange={ev => setPaymentMethod(ev.target.value)} required />POD
                                                                </div>
                                                                <div className="method-QR">
                                                                    <input type="radio" name="PaymentsMethod" value='QRCODE' onChange={ev => setPaymentMethod(ev.target.value)} required />QR CODE:
                                                                </div>
                                                            </div>
                                                            <div className="pd-button">
                                                                <button>Continue</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ) : (
                                <Link to={'/login'}>
                                    Login for continue
                                </Link>
                            )
                        }

                    </div>
                    {toComment &&
                        <div className="overlay">
                            <div className="comment-box">
                                <div className="cmt-title" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2%' }}>
                                        <FontAwesomeIcon icon={faComments}
                                            style={{
                                                margin: '2% 2% 0 0',
                                                height: '1.5em', color: "red", cursor: 'pointer',
                                            }} />
                                        <p style={{
                                            fontFamily: 'inherit', fontWeight: '700',
                                            fontSize: '20px',
                                        }}>Reviews Product</p>
                                    </div>
                                    <FontAwesomeIcon icon={faCircleMinus}
                                        style={{
                                            right: '0', position: 'absolute', margin: '2% 2% 0 0',
                                            height: '1.5em', color: '#E74C3C', cursor: 'pointer'
                                        }}
                                        onClick={HideComment} />
                                </div>
                                <div className="rating">
                                    <div>Rating</div>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <div key={value}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={value}
                                                id={`rating-${value}`}
                                                checked={value === rating}
                                                onChange={() => handleRatingChange(value)}
                                            />
                                            <label htmlFor={`rating-${value}`} className={`star ${value <= rating ? 'selected' : ''}`}>
                                                <FontAwesomeIcon icon={faStar} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="cmt-content">
                                    {products.description}
                                </div>
                                <div className="cmt-input">
                                    {/* <textarea name="" id="" height='20px' width='100px'></textarea> */}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="dp-handle-details">
                    <ul>
                        <li>Description</li>
                        <li>Reviews</li>

                    </ul>
                    <div className="dp-handle-details-content">
                        {/* {products.description} */}
                    </div>
                </div>

            </div>
        </>
    )
}