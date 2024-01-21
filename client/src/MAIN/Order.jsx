/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Navbar from "../navbar";
import { UserContext } from "../userContext";
export default function OrderPage(){

     const {user} = useContext(UserContext);

    return(
        <>  
            {/* <Navbar /> */}
            <div className="order-container">
                {/* <div><Navbar/></div> */}
                <div>Hello {user.name}</div>
            </div>
        </>
    )
}