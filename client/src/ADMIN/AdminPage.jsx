/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

export default function AdminPage() {
    const { user } = useContext(UserContext);
    const [login, setLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.email !== 'admin@gmail.com') {
            navigate('/');
        }
    }, [navigate, user]);

    function showLoginForm() {
        setLogin(true)
    }
    function hideLoginForm() {
        setLogin(false)
    }

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            if ((data.email === 'admin@gmail.com')) {
                alert('Login successful');
                setRedirect(true);
            } else {
                alert('Login Failed');
            }
        } catch (e) {
            alert('login Failed');
        }
    }

    if (redirect) {
        window.location.reload();
    }
    

    return (
        <div className="admin-container">
            {user && user.email === 'admin@gmail.com' ? (
                <Admin />
            ) : (
                <div>
                    <div className="wcome" onClick={showLoginForm}>
                        <h2>Welcome Administration</h2>
                    </div>
    
                    {login && (
                        <div className="admin-login">
                            <div className="head-login">
                                <svg onClick={hideLoginForm} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                </svg>
                                <h2>HELLO ADMIN</h2>
                            </div>
                            <form onSubmit={handleLoginSubmit}>
                                <input type="text" placeholder="Your Email"
                                    value={email}
                                    required
                                    onChange={ev => setEmail(ev.target.value)} />
    
                                <input type="password"
                                    placeholder="Your Password"
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
    );
}