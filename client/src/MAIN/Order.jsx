/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import { UserContext } from "../userContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function OrderPage() {
    const { user } = useContext(UserContext);
    const [pdCart, setPdCart] = useState('');
    const [products, setProducts] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(false);
    const [selectedVoucherInfo, setSelectedVoucherInfo] = useState(null);
    const { id } = useParams();
    // data of order
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [size, setSize] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [addVoucher, setAddVoucher] = useState('');
    const [address, setAddress] = useState('');
    const [nameOfCus, setNameOfCus] = useState('');
    const [PhNb, setPhNb] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/api/cart/${id}`).then(response => {
            setPdCart(response.data);
        });
    }, [id]);

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('/api/voucher').then(response => {
            setVouchers(response.data);
        })
    })

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

    async function handleOrder(ev) {
        ev.preventDefault();
        try {
        const currentProduct = products.find(product => product._id === pdCart.productId);

        if (!currentProduct) {
         
            alert('wrong');
            return;
        }

        const calculatedTotalPrice = selectedVoucherInfo
            ? parseInt(currentProduct.price) * pdCart.quantity * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100
            : parseInt(currentProduct.price) * pdCart.quantity;

            await axios.post('/api/order', {
                productId: pdCart.productId,
                quantity: pdCart.quantity,
                size: pdCart.size,
                addVoucher: selectedVoucherInfo ? selectedVoucherInfo.valueVoucher : 'none',
                totalPrice: calculatedTotalPrice,
                address,
                PhNb,
                nameOfCus,
                paymentMethod,
            })
            alert('Order successfully. Please confirm the order in your email');
            // window.location.reload();
        } catch (error) {
            alert('wrong')
          
        }
    }

    return (
        <>
            <div className="order-container">
                <div className="order-title">
                    Product Payment
                </div>
                <div className="order-body">
                    <div className="order-summary">
                        {products.length > 0 && products
                            .filter(product => product._id === pdCart.productId)
                            .map(product => (
                                <div key={product}>
                                    <b className="os-title">Order Summary</b>
                                    <div className="os-img">
                                        <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                    </div>
                                    <div className="os-pro-info">
                                        <div className="os-pro-name-and-price">
                                            <div>{product.name}</div>
                                            <div>{product.price}</div>
                                            <div style={{ display: 'none' }}>{pdCart.productId}</div>
                                        </div>
                                        <div className="os-pro-gender-and-quantity">
                                            <div>{pdCart.size}</div>
                                            <div>Qty: {pdCart.quantity}</div>
                                        </div>
                                        <div className="os-select-voucher" onClick={showListVoucher}>
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
                                        <div className="os-total-price">
                                            <b>Total Price:</b>  {selectedVoucherInfo ? (
                                                <div>
                                                    {parseInt(product.price) * pdCart.quantity * (100 - parseInt(selectedVoucherInfo.valueVoucher)) / 100} $
                                                </div>
                                            ) : (
                                                <div>
                                                    {parseInt(product.price) * pdCart.quantity}$
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="payment-details">
                        <b className="pd-title">Payment Details</b>
                        <form className="pd-content" onSubmit={handleOrder}>
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
        </>
    );
}
