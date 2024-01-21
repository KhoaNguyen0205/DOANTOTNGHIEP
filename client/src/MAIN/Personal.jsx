/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { UserContext } from "../userContext"
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function PersonalPage(){

   
    const[redirect, setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext)
     async function logout() {
        await axios.post('logout');
        setRedirect('/')
        setUser(null);
     }
     if(!ready) {
        return 'Loading...'
    } 

    if(ready &&!user && !redirect) {
        return <Navigate to={'/login'} />
    }
    return(
        <>
        
            <div className="container">
                
                <div className="per-container">
                   <div className="deli">
                   <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                   </div>

                   <div className="or">
                     
                   </div>

                </div>
            </div>
        </>
    )
}