/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPass() {

    const [email, setEmail] = useState('');
    const [err,setErr] = useState(false);

    async function handleForgotPass(ev){
        ev.preventDefault();
        try {
            await axios.post('/api/forgot-pass', {
                email,
            })
            alert('email xác nhận đã được gửi đến ' + email);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErr('Email does not exist.');
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    }

    return (
        <>
            <div className="login-container">
                <form action="" className="forgotPass-form" onSubmit={handleForgotPass} >
                    <b>Forgot Password</b>
                    <div className="forgotpass-introduction">
                        Please enter your email account here. <br /> 
                        We will then contact you via email to retrieve your password
                    </div>
                    <input type="text" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your email" required />
                    {err && <div style={{color:'red',marginRight:'370px'}}>{err}</div>}
                    <button>Send</button>
                    <Link to={'/login'} className="back-to-login">Back to Login</Link>
                </form>
            </div>
        </>
    )
}