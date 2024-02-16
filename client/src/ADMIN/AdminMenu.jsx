/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import AddProduct from "./AddProduct";
import DetailsProduct from "./DetailsProduct";

export default function AdminMenu() {
   
    const [menu,setMenu] = useState(false);
    const [addProduct,setAddProduct] = useState(false);
    const [detailsProduct,setDetailsProduct] = useState(false);
    const [customer,setCustomer] = useState(false);
    const [messeges,setMesseges] = useState(false);
    const [chart,setChart] = useState(false);

    function showAddPro(){
        setAddProduct(true);
    }
    function hideAddPro(){
        setAddProduct(false);
    }

    function handleClick() {
        if (addProduct) {
          hideAddPro();
        } else {
          showAddPro();
          HideDetailsProduct();
        }
    }

    function showDetailsProduct() {
        setDetailsProduct(true);
    }

    function HideDetailsProduct() {
        setDetailsProduct(false);
    }

    function handleClickDP() {
        if(detailsProduct){
            HideDetailsProduct();
        }else {
            showDetailsProduct();
            hideAddPro();
        }
    }

    return(
        <div className="admin-container">
            <div className="menu-select">

                <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512" fill="green">
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 
                    0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 
                    0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 
                    24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                </svg>

                <svg onClick={handleClickDP} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 97" id="sneakers" fill="red" height='4em'>
                    <path fill="none" d="M.474.007h96v96h-96z"></path>
                    <path d="M2.563 58.91h21.61a1.5 1.5 0 0 0 0-3H2.563a1.5 1.5 0 0 0 0 3Z"></path>
                    <path d="M18.581 46.916a13.711 13.711 0 0 0 7.122 4.29 1.501 1.501 0 0 
                    0 .693-2.919 10.704 10.704 0 0 1-4.997-2.756c8.591-4.384 17.998-10.548 
                    23.748-14.673.03-.022.06-.044.088-.068a2.486 2.486 0 0 1 3.917 1.02 19.635 
                    19.635 0 0 0 2.417 4.586 1.5 1.5 0 0 0 2.447-1.736 16.688 16.688 0 0 
                    1-2.053-3.897l-.006-.015a5.487 5.487 0 0 0-8.609-2.29c-8.685 6.225-25.874 
                    17.315-35.357 19.138-2.021.389-3.602 1.605-4.749 3.289-1.539 2.26-2.268 
                    5.396-2.268 8.16v5.07a4.687 4.687 0 0 0 4.687 4.687h18.261a1.5 1.5 0 0 0 
                    0-3H5.661a1.687 1.687 0 0 1-1.687-1.687v-5.07c0-1.84.38-3.893 1.221-5.571.728-1.45 
                    1.8-2.631 3.362-2.932 2.813-.54 6.287-1.863 10.024-3.626Z"></path>
                    <path d="m44.59 35.788-2.468-3.659a1.5 1.5 0 0 0-2.487 1.677l2.468 3.66a1.5 
                    1.5 0 0 0 2.487-1.678zm-6.618 4.183-2.514-3.729a1.502 1.502 0 0 0-2.488 
                    1.678l2.515 3.728a1.5 1.5 0 0 0 2.487-1.677zm-6.652 3.428-2.312-3.428a1.5 1.5 
                    0 0 0-2.487 1.677l2.312 3.428a1.5 1.5 0 1 0 2.487-1.677zm38.836-14.95c-8.695 
                    6.234-25.884 17.324-35.367 19.147-2.021.389-3.603 1.605-4.749 3.289-1.539 
                    2.26-2.268 5.396-2.268 8.16v5.07a4.686 4.686 0 0 0 4.687 4.687h58.828a4.687 
                    4.687 0 0 0 4.687-4.687c0-4.703 0-13.431-.027-17.979a4.66 4.66 0 0 
                    0-3.992-4.603c-6.094-.917-11.122-5.13-13.194-10.77l-.006-.015a5.487 5.487 0 0 
                    0-8.609-2.29l.01-.009zm1.789 2.409c.03-.022.06-.044.088-.068a2.486 2.486 0 0 1 
                    3.916 1.02c2.447 6.646 8.375 11.609 15.568 12.691l.008.001a1.66 1.66 0 0 1 1.422 
                    1.643v.009c.027 4.543.027 13.263.027 17.961 0 .932-.756 1.687-1.687 1.687H32.459a1.687 
                    1.687 0 0 1-1.687-1.687v-5.07c0-1.84.38-3.893 1.221-5.571.728-1.45 1.8-2.631 
                    3.362-2.932 9.8-1.884 27.632-13.258 36.59-19.684z"></path>
                    <path d="M29.36 58.91h58.743a1.5 1.5 0 0 0 0-3H29.36a1.501 1.501 0 0 0 0 3Z"></path>
                    <path d="M76.88 56.595c-3.739-5.785-9.135-7.792-13.611-8.34a18.424 18.424 0 
                    0 0-5.668.167c-.619.094-1.265.154-1.926.154a10.65 10.65 0 0 1-5.223-1.359 1.5 
                    1.5 0 0 0-1.466 2.617 13.643 13.643 0 0 0 6.689 1.742 15.745 15.745 0 0 0 2.463-.203 
                    15.443 15.443 0 0 1 4.759-.141l.005.001c3.763.46 8.314 2.126 11.458 6.991a1.5 1.5 0 0 0 
                    2.52-1.629zm-5.492-20.807-2.468-3.659a1.5 1.5 0 0 0-2.488 1.677l2.469 3.66a1.5 1.5 0 0 0 
                    2.487-1.678zm-6.618 4.183-2.515-3.729a1.502 1.502 0 0 0-2.082-.405 1.502 1.502 0 0 
                    0-.405 2.083l2.515 3.728a1.5 1.5 0 0 0 2.487-1.677zm-6.652 3.428-2.312-3.428a1.5 
                    1.5 0 0 0-2.488 1.677l2.313 3.428a1.5 1.5 0 1 0 2.487-1.677z"></path>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 640 512" fill="">
                    <path d="M0 24C0 10.7 10.7 0 24 0H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 
                    48 0 37.3 0 24zM0 488c0-13.3 10.7-24 24-24H616c13.3 0 24 10.7 24 24s-10.7 24-24 
                    24H24c-13.3 0-24-10.7-24-24zM83.2 160a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM32 320c0-35.3 
                    28.7-64 64-64h96c12.2 0 23.7 3.4 33.4 9.4c-37.2 15.1-65.6 47.2-75.8 86.6H64c-17.7 0-32-14.3-32-32zm461.6
                    32c-10.3-40.1-39.6-72.6-77.7-87.4c9.4-5.5 20.4-8.6 32.1-8.6h96c35.3 0 64 28.7 64 64c0 
                    17.7-14.3 32-32 32H493.6zM391.2 290.4c32.1 7.4 58.1 30.9 68.9 61.6c3.5 10 5.5 20.8 5.5 32c0 
                    17.7-14.3 32-32 32h-224c-17.7 0-32-14.3-32-32c0-11.2 1.9-22 5.5-32c10.5-29.7 35.3-52.8 
                    66.1-60.9c7.8-2.1 16-3.1 24.5-3.1h96c7.4 0 14.7 .8 21.6 2.4zm44-130.4a64 64 0 1 1 128 0 64 
                    64 0 1 1 -128 0zM321.6 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" fill="rgb(63, 164, 222)">
                    <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 
                    177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 
                    53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55
                    8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 
                    0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 
                    53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512" fill="orange">
                    <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 
                    48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 
                    21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 
                    48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/>
                </svg>

            </div>

            <div className="admin-content">     
              {addProduct && (
                <AddProduct/>
              )}
              {
                detailsProduct && (
                    <DetailsProduct />
                )
              }
            </div>
        </div>
    )
}