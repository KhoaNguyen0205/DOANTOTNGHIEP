/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { UserContext } from "../../userContext"
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBox, faBoxOpen, faSignOut, faTicket, faUser, faUserAlt, faUserCheck, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "../../Login";
import Navbar from "../../navbar";
import MyAccount from "./myAccount";

export default function PersonalPage() {

    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }
    async function logout() {
        await axios.post('logout');
        setRedirect('/')
        setUser(null);
    }
    if (!ready) {
        return 'Loading...'
    }

    if (!user && !redirect) {
        return <Navigate to={'/login'} />
    }
    const getItemClassName = (path) => {
        return location.pathname === path ? "myaccount-active-item" : "";
    };
    return (
        <>
            {!user ? (
                <div>
                    <LoginPage />
                </div>
            ) : (
                <>
                    <div className="per-container">
                        <div className="per-menu">
                            <div className="per-menu-top">
                                <div className="per-menu-top-icon"><FontAwesomeIcon style={{ color: 'white', height: '30px', width: '30px' }} icon={faUser} /></div>
                                <div>
                                    <div>
                                        <b>{user.name}</b>
                                    </div>
                                    <Link to={'/login'}>
                                        <FontAwesomeIcon style={{ cursor: 'pointer', color: 'orange' }} icon={faSignOut} onClick={logout} title="LogOut" />
                                    </Link>
                                </div>
                            </div>
                            <div className="per-menu-bot">
                                <Link to={'/personal/account'} className="per-menu-bot-item">
                                    <FontAwesomeIcon style={{ color: '#66c2ff', marginRight: '20px', height: '30px', width: '30px' }} icon={faUserEdit} /><b className={getItemClassName('/personal/account')}>My Account</b>
                                </Link>
                                <Link to={'/personal/pucharse-order'} className="per-menu-bot-item">
                                    <FontAwesomeIcon style={{ color: '#ffc266', marginRight: '20px', height: '30px', width: '30px' }} icon={faBoxOpen} /><b className={getItemClassName('/personal/pucharse-order')}>Purchase Order</b>
                                </Link>
                                <Link to={'/personal/notification'} className="per-menu-bot-item">
                                    <FontAwesomeIcon style={{ color: '#ff6666', marginRight: '20px', height: '30px', width: '30px' }} icon={faBell} /><b className={getItemClassName('/personal/notification')}>Notification</b>
                                </Link>
                                <Link to={'/personal/voucher'} className="per-menu-bot-item">
                                    <FontAwesomeIcon style={{ color: '#ffb366', marginRight: '20px', height: '30px', width: '30px' }} icon={faTicket} /><b className={getItemClassName('/personal/voucher')}>Voucher</b>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>

            )}

        </>
    )
}