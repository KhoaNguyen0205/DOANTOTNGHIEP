/* eslint-disable no-unused-vars */
import { useState } from "react";
import Admin from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTruckRampBox } from "@fortawesome/free-solid-svg-icons";

export default function AdminOrderManage() {
    const [selectedItem, setSelectedItem] = useState('Processing');
    const chooseItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <Admin />
            <div className="admin-content-container">
                <div className="order-manage-nav">
                    <div className={selectedItem === 'Processing' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Processing')}>
                         <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '10px', height: '20px', width: '20px', color: 'black' }} /> Processing
                    </div>
                    <div className={selectedItem === 'Delivering' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Delivering')}>
                         <FontAwesomeIcon icon={faTruckRampBox} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#ffd24d' }} /> Delivering
                    </div>
                    <div className={selectedItem === 'Success' ? 'order-manage-nav-item-click' : 'order-manage-nav-item'}
                        onClick={() => chooseItem('Success')}>
                         <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', height: '20px', width: '20px', color: '#39e600' }} />Success
                    </div>
                </div>
                <div className="">

                </div>
            </div>
        </>
    )
}