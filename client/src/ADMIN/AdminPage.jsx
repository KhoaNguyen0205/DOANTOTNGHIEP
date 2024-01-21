/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { UserContext } from "../userContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

export default function AdminPage() {
    const {user} = useContext(UserContext);
    const [login,setLogin] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    function showLoginForm() {
        setLogin(true)
    }
    function hideLoginForm(){
        setLogin(false)
    }

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try{
            const {data}  = await axios.post('/login', {email,password});
            if((data.email === 'admin@gmail.com')){
              alert('Login successful');
              setRedirect(true);
            }else{
              alert('Login Failed');    
            }
        }catch(e){
            alert('login Failed');
        }
    }

    if (redirect) {
        window.location.reload();
      }

    return(
        <div className="admin-container">
            {user ? (
                <div>
                    {(user.email !== 'admin@gmail.com') ? (
                        <div className="error">
                        <h1>THIS PAGE IS NOT FOR YOU</h1>
                        <Link to={'/'}>
                            <button>Return Home Page</button>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" >
                             <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 
                                      24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 
                                      24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                        </svg>
                    </div>
                    ) : (
                    <Admin/>
                    )}
                </div>
            ): (
                <div>
                    <div className="wcome" onClick={showLoginForm}>
                <h2>Wellcome Admintration</h2>
            </div>

            {login && (
                <div className="admin-login">
                    <div className="head-login">
                       <svg onClick={hideLoginForm} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                       </svg>
                       <h2>HELLO ADMIN</h2>
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                        <input type="text" placeholder="your Email" 
                               value={email}
                               required 
                               onChange={ev => setEmail(ev.target.value)} />

                        <input type="password" 
                               placeholder="your Password"
                               value={password}
                               required
                               onChange={ev => setPassword(ev.target.value)} />
                    <button>Login</button>
                    </form>
                </div>
            )}
                </div>
            )}
        </div>
    )
}