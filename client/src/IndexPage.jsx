/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Nike from "./Nike";
import Adidas from "./adidas";
import Footer from "./footer";


export default function IndexPage() {


    return (
        <>
            <div className="container">
                <div className="index1">
                    <h1>SNEAKER</h1>
                    <h4>Bringing you hot products from famous brands.</h4>
                    <button>
                        <Link to={'/pd/sneaker'}>Shop Sneaker</Link>
                    </button>
                </div>

                <div className="shop-by-brand">
 
                </div>

                <div className="index1">

                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>

    )
}