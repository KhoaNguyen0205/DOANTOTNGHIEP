/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./userContext";
import axios from "axios";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);


    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            if ((data.email)) {
                alert('Login successful');
                setRedirect(true);
            } else {
                alert('Login Failed');
            }
        } catch (e) {
            alert('login Failed');
        }
    }

    const handleFacebookLogin = async () => {
        try {
            const { data } = await axios.get('/auth/facebook'); // Gọi API để bắt đầu quá trình OAuth với server
            window.location.href = data.redirectUrl; // Chuyển hướng người dùng đến trang đăng nhập của Facebook
        } catch (error) {
            console.error("Error initiating Facebook login:", error);
        }
    };

    if (redirect) {
        window.location.href = '/';
    }

    return (
        <div className="login-container">
            <div className="main-form">
                <img src="Images/Logo1.png" alt="" />
                <form className="form-login" onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <input type="email"
                        placeholder="your Email@gmail.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="your Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="login-button">LOGIN</button>
                    <div className="to-register">
                        <h3>If you don't have account ?</h3>
                        <Link to={'/register'}>
                            <div>Register</div>
                        </Link>
                    </div>
                    <div className="more-option-login">
                        <div className="option-gmail">
                            <div className="logo-gmail">
                                <img src="./img-moreOption-Login/gmail.png" alt="" />
                            </div>
                            Gmail
                        </div>
                        <div className="option-facebook" onClick={handleFacebookLogin}>
                            <div className="logo-facebook">
                                <img src="./img-moreOption-Login/facebook.png" alt="" />
                            </div>
                            FaceBook
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}