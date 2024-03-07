import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ConfirmOrder() {

    const {id} = useParams();

    useEffect(() => {
        const confirmOrder = async () => {
            try {
                const productId = id ;
                const response = await axios.get(`/api/confirm-order/${productId}`);

                console.log('Order confirmed successfully:', response.data);
            } catch (error) {
                console.error('Error confirming order:', error);
            }
        };

        confirmOrder();
    }, []);
    return(

        <>
        <div className="confirm-container">
            <img src="/Images/thankConfirm.png" alt="" />
        </div>
        
        </>
    )
}