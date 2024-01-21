/* eslint-disable no-unused-vars */
import { faBoxOpen, faCartShopping, faDiamond, faMessage, faPhone, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NavigationBar() {

    return (
        <>
            <div className="nav-container">
                <nav>
                    <div className="nav-logo-and-name">
                        <img src="./Images/K-sneaker.png" alt="" />
                        K-Sneaker
                    </div>
                    <div className="">

                    </div>
                </nav>
                <aside className="sideBar">
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faDiamond} />
                            <p>Dashboard</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <p>Cart</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBoxOpen} />
                            <p>Product</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faTruck} />
                            <p>Delivery</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faMessage} />
                            <p>Messages</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <p>Contact</p>
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    )
}